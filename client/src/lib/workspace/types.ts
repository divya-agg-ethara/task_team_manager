import type { DashboardViewModel, EnrichedTask } from "@/lib/dashboard/types";
import type { ProjectSummary } from "@/types/project";

export type ProjectHealthStatus = "on-track" | "at-risk" | "quiet";

export type ProjectHealth = {
  projectId: string;
  projectName: string;
  memberCount: number;
  openCount: number;
  doneCount: number;
  overdueCount: number;
  completionRate: number;
  status: ProjectHealthStatus;
  updatedAt: string;
};

export type TeamCollaborator = {
  userId: string;
  name: string;
  email: string;
  projectIds: string[];
  projectNames: string[];
  openTaskCount: number;
  roleLabels: string[];
};

export type WorkspaceViewModel = DashboardViewModel & {
  projectHealth: ProjectHealth[];
  activeProjectsList: ProjectSummary[];
  completedProjectsList: ProjectSummary[];
  collaborators: TeamCollaborator[];
  myTasks: EnrichedTask[];
  assignedToMe: EnrichedTask[];
  upcomingTasks: EnrichedTask[];
  completedTasks: EnrichedTask[];
};

export type TaskListFilter = "all" | "assigned" | "today" | "upcoming" | "done" | "priority";
