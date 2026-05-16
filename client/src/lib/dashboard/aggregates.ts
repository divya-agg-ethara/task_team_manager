import { isTaskOverdue } from "@/components/tasks/task-due-chip";
import { formatRelative } from "@/lib/utils/format";
import type { ProjectSummary } from "@/types/project";
import type { TaskPriority } from "@/types/task";
import type {
  CompletionTrendPoint,
  DashboardActivityItem,
  DashboardDeadline,
  DashboardSummary,
  DashboardViewModel,
  EnrichedTask,
  WorkloadMember,
} from "@/lib/dashboard/types";
import { OPEN_STATUSES } from "@/lib/dashboard/types";

const PRIORITY_RANK: Record<TaskPriority, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isOpenTask(task: EnrichedTask): boolean {
  return OPEN_STATUSES.includes(task.status);
}

export function isMyTask(task: EnrichedTask, userId: string): boolean {
  return task.assignedTo?.id === userId || task.createdBy.id === userId;
}

export function isDueToday(task: EnrichedTask): boolean {
  if (!task.dueDate || !isOpenTask(task)) return false;
  return isSameCalendarDay(new Date(task.dueDate), new Date());
}

export function isDueWithinDays(task: EnrichedTask, days: number): boolean {
  if (!task.dueDate || !isOpenTask(task)) return false;
  const due = new Date(task.dueDate);
  const now = new Date();
  const limit = new Date();
  limit.setDate(limit.getDate() + days);
  return due >= startOfDay(now) && due <= endOfDay(limit);
}

function completedInLastDays(task: EnrichedTask, days: number): boolean {
  if (task.status !== "DONE") return false;
  const ref = task.completedAt ?? task.updatedAt;
  const d = new Date(ref);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return d >= cutoff;
}

function buildSummary(
  projects: ProjectSummary[],
  tasks: EnrichedTask[],
  userId: string,
): DashboardSummary {
  const myOpen = tasks.filter((t) => isOpenTask(t) && isMyTask(t, userId));
  return {
    activeProjects: projects.length,
    myOpenTasks: myOpen.length,
    dueToday: tasks.filter(isDueToday).length,
    completedThisWeek: tasks.filter((t) => completedInLastDays(t, 7)).length,
    overdue: tasks.filter((t) => isOpenTask(t) && isTaskOverdue(t)).length,
    inProgress: tasks.filter((t) => t.status === "IN_PROGRESS" || t.status === "IN_REVIEW")
      .length,
  };
}

function buildDeadlines(tasks: EnrichedTask[]): DashboardDeadline[] {
  return tasks
    .filter((t) => isOpenTask(t) && t.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 8)
    .map((t) => {
      const due = new Date(t.dueDate!);
      const urgent =
        isTaskOverdue(t) ||
        due.getTime() - Date.now() < 1000 * 60 * 60 * 24 * 2;
      return {
        id: `${t.projectId}-${t.id}`,
        taskId: t.id,
        projectId: t.projectId,
        title: t.title,
        projectName: t.projectName,
        dueDate: t.dueDate!,
        priority: t.priority,
        urgent,
      };
    });
}

function statusLabel(status: EnrichedTask["status"]): string {
  switch (status) {
    case "TODO":
      return "To do";
    case "IN_PROGRESS":
      return "In progress";
    case "IN_REVIEW":
      return "In review";
    case "DONE":
      return "Done";
    case "CANCELLED":
      return "Cancelled";
    default:
      return status;
  }
}

function buildActivity(
  projects: ProjectSummary[],
  tasks: EnrichedTask[],
): DashboardActivityItem[] {
  const taskItems: DashboardActivityItem[] = tasks.map((t) => ({
    id: `task-${t.id}`,
    type: "task",
    title: t.title,
    detail: `${statusLabel(t.status)} · ${t.projectName}`,
    projectId: t.projectId,
    time: t.updatedAt,
    timeLabel: formatRelative(t.updatedAt),
    tone:
      t.status === "DONE"
        ? "success"
        : isTaskOverdue(t)
          ? "warning"
          : t.priority === "URGENT" || t.priority === "HIGH"
            ? "accent"
            : "neutral",
  }));

  const projectItems: DashboardActivityItem[] = projects.map((p) => ({
    id: `project-${p.id}`,
    type: "project",
    title: p.name,
    detail: "Project workspace updated",
    projectId: p.id,
    time: p.updatedAt,
    timeLabel: formatRelative(p.updatedAt),
    tone: "neutral",
  }));

  return [...taskItems, ...projectItems]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 10);
}

function buildCompletionTrend(tasks: EnrichedTask[]): CompletionTrendPoint[] {
  const points: CompletionTrendPoint[] = [];
  const today = startOfDay(new Date());

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const dayEnd = endOfDay(day);
    const completed = tasks.filter((t) => {
      if (t.status !== "DONE") return false;
      const ref = new Date(t.completedAt ?? t.updatedAt);
      return ref >= day && ref <= dayEnd;
    }).length;

    points.push({
      label: day.toLocaleDateString(undefined, { weekday: "short" }),
      completed,
      dateKey: day.toISOString().slice(0, 10),
    });
  }

  return points;
}

function buildTeamWorkload(tasks: EnrichedTask[]): WorkloadMember[] {
  const open = tasks.filter(isOpenTask);
  const map = new Map<string, WorkloadMember>();

  for (const task of open) {
    const id = task.assignedTo?.id ?? "__unassigned__";
    const name = task.assignedTo?.name ?? "Unassigned";
    const existing = map.get(id) ?? {
      id,
      name,
      openCount: 0,
      highPriorityCount: 0,
    };
    existing.openCount += 1;
    if (task.priority === "HIGH" || task.priority === "URGENT") {
      existing.highPriorityCount += 1;
    }
    map.set(id, existing);
  }

  return Array.from(map.values())
    .sort((a, b) => b.openCount - a.openCount)
    .slice(0, 6);
}

export function buildDashboardViewModel(
  projects: ProjectSummary[],
  tasks: EnrichedTask[],
  userId: string,
): DashboardViewModel {
  const activeProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  const myOpen = tasks
    .filter((t) => isOpenTask(t) && isMyTask(t, userId))
    .sort((a, b) => {
      const pa = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      if (pa !== 0) return pa;
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const dueTodayTasks = tasks
    .filter(isDueToday)
    .sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);

  const priorityTasks = myOpen
    .filter((t) => t.priority === "HIGH" || t.priority === "URGENT")
    .slice(0, 6);

  const recentActivity = buildActivity(projects, tasks);
  const recentlyUpdated = recentActivity.slice(0, 6);

  const focusProjectId =
    activeProjects[0]?.id ??
    projects[0]?.id ??
    null;

  return {
    projects,
    tasks,
    summary: buildSummary(projects, tasks, userId),
    activeProjects,
    dueTodayTasks,
    priorityTasks,
    upcomingDeadlines: buildDeadlines(tasks.filter((t) => isDueWithinDays(t, 14) || isTaskOverdue(t))),
    recentActivity,
    recentlyUpdated,
    teamWorkload: buildTeamWorkload(tasks),
    completionTrend: buildCompletionTrend(tasks),
    focusProjectId,
  };
}
