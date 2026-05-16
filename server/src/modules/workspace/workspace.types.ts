import type { WorkspaceRole } from "../../types/user";

export type MemberWorkload = {
  userId: string;
  name: string;
  email: string;
  openTasks: number;
  completedTasks: number;
  overdueTasks: number;
  performanceScore: number | null;
};

export type AdminAnalytics = {
  totalTeams: number;
  totalProjects: number;
  totalMembers: number;
  openTasks: number;
  completedTasks: number;
  overdueTasks: number;
  pendingReview: number;
  memberWorkload: MemberWorkload[];
  tasksByStatus: Record<string, number>;
  tasksByPriority: Record<string, number>;
};

export type WorkspaceOverview = {
  role: WorkspaceRole;
  analytics?: AdminAnalytics;
  memberStats?: {
    assignedOpen: number;
    dueToday: number;
    overdue: number;
    completedThisWeek: number;
    teamsCount: number;
    projectsCount: number;
  };
};
