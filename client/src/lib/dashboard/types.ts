import type { ProjectSummary } from "@/types/project";
import type { Task, TaskPriority, TaskStatus } from "@/types/task";

export type EnrichedTask = Task & {
  projectName: string;
};

export type DashboardSummary = {
  activeProjects: number;
  myOpenTasks: number;
  dueToday: number;
  completedThisWeek: number;
  overdue: number;
  inProgress: number;
};

export type DashboardDeadline = {
  id: string;
  taskId: string;
  projectId: string;
  title: string;
  projectName: string;
  dueDate: string;
  priority: TaskPriority;
  urgent: boolean;
};

export type DashboardActivityItem = {
  id: string;
  type: "task" | "project";
  title: string;
  detail: string;
  projectId?: string;
  time: string;
  timeLabel: string;
  tone: "neutral" | "accent" | "success" | "warning";
};

export type WorkloadMember = {
  id: string;
  name: string;
  openCount: number;
  highPriorityCount: number;
};

export type CompletionTrendPoint = {
  label: string;
  completed: number;
  dateKey: string;
};

export type DashboardViewModel = {
  projects: ProjectSummary[];
  tasks: EnrichedTask[];
  summary: DashboardSummary;
  activeProjects: ProjectSummary[];
  dueTodayTasks: EnrichedTask[];
  priorityTasks: EnrichedTask[];
  upcomingDeadlines: DashboardDeadline[];
  recentActivity: DashboardActivityItem[];
  recentlyUpdated: DashboardActivityItem[];
  teamWorkload: WorkloadMember[];
  completionTrend: CompletionTrendPoint[];
  focusProjectId: string | null;
};

export const OPEN_STATUSES: TaskStatus[] = ["TODO", "IN_PROGRESS", "IN_REVIEW"];
