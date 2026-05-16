import {
  buildDashboardViewModel,
  isDueWithinDays,
  isMyTask,
  isOpenTask,
} from "@/lib/dashboard/aggregates";
import { isTaskOverdue } from "@/components/tasks/task-due-chip";
import type { EnrichedTask } from "@/lib/dashboard/types";
import type {
  ProjectHealth,
  ProjectHealthStatus,
  TeamCollaborator,
  WorkspaceViewModel,
} from "@/lib/workspace/types";
import type { ProjectSummary } from "@/types/project";

function healthForProject(
  projectId: string,
  tasks: EnrichedTask[],
): Omit<ProjectHealth, "projectName" | "memberCount" | "updatedAt"> & {
  status: ProjectHealthStatus;
} {
  const projectTasks = tasks.filter((t) => t.projectId === projectId);
  const open = projectTasks.filter(isOpenTask);
  const done = projectTasks.filter((t) => t.status === "DONE");
  const overdue = open.filter(isTaskOverdue);
  const total = projectTasks.length;
  const completionRate =
    total > 0 ? Math.round((done.length / total) * 100) : 0;

  let status: ProjectHealthStatus = "quiet";
  if (open.length === 0 && total === 0) status = "quiet";
  else if (overdue.length > 0 || (open.length > 5 && completionRate < 40))
    status = "at-risk";
  else status = "on-track";

  return {
    projectId,
    openCount: open.length,
    doneCount: done.length,
    overdueCount: overdue.length,
    completionRate,
    status,
  };
}

function buildCollaborators(
  projects: ProjectSummary[],
  tasks: EnrichedTask[],
  currentUserId: string,
): TeamCollaborator[] {
  const map = new Map<string, TeamCollaborator>();

  for (const project of projects) {
    const projectTasks = tasks.filter((t) => t.projectId === project.id);

    for (const task of projectTasks) {
      const user = task.assignedTo ?? task.createdBy;
      if (user.id === currentUserId) continue;

      const existing = map.get(user.id) ?? {
        userId: user.id,
        name: user.name,
        email: user.email,
        projectIds: [],
        projectNames: [],
        openTaskCount: 0,
        roleLabels: [],
      };

      if (!existing.projectIds.includes(project.id)) {
        existing.projectIds.push(project.id);
        existing.projectNames.push(project.name);
      }
      if (isOpenTask(task) && task.assignedTo?.id === user.id) {
        existing.openTaskCount += 1;
      }
      map.set(user.id, existing);
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => b.openTaskCount - a.openTaskCount,
  );
}

function splitProjects(
  projects: ProjectSummary[],
  tasks: EnrichedTask[],
): { active: ProjectSummary[]; completed: ProjectSummary[] } {
  const active: ProjectSummary[] = [];
  const completed: ProjectSummary[] = [];

  for (const project of projects) {
    const projectTasks = tasks.filter((t) => t.projectId === project.id);
    const hasOpen = projectTasks.some(isOpenTask);
    const hasAny = projectTasks.length > 0;

    if (!hasAny || hasOpen) {
      active.push(project);
    } else {
      completed.push(project);
    }
  }

  active.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  completed.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return { active, completed };
}

export function buildWorkspaceViewModel(
  projects: ProjectSummary[],
  tasks: EnrichedTask[],
  userId: string,
): WorkspaceViewModel {
  const dashboard = buildDashboardViewModel(projects, tasks, userId);

  const projectHealth: ProjectHealth[] = projects.map((p) => {
    const h = healthForProject(p.id, tasks);
    return {
      ...h,
      projectName: p.name,
      memberCount: p.memberCount,
      updatedAt: p.updatedAt,
    };
  });

  const { active, completed } = splitProjects(projects, tasks);
  const myTasks = tasks
    .filter((t) => isMyTask(t, userId) && isOpenTask(t))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const assignedToMe = tasks
    .filter((t) => t.assignedTo?.id === userId && isOpenTask(t))
    .sort((a, b) => {
      const pa = a.priority === "URGENT" ? 0 : a.priority === "HIGH" ? 1 : 2;
      const pb = b.priority === "URGENT" ? 0 : b.priority === "HIGH" ? 1 : 2;
      return pa - pb;
    });

  const upcomingTasks = tasks
    .filter((t) => isOpenTask(t) && (isDueWithinDays(t, 14) || isTaskOverdue(t)))
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

  const completedTasks = tasks
    .filter((t) => t.status === "DONE")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 50);

  return {
    ...dashboard,
    projectHealth,
    activeProjectsList: active,
    completedProjectsList: completed,
    collaborators: buildCollaborators(projects, tasks, userId),
    myTasks,
    assignedToMe,
    upcomingTasks,
    completedTasks,
  };
}
