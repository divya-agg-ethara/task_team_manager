import { apiClient } from "@/lib/api/client";
import type { WorkspaceRole } from "@/types/auth";

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

export class WorkspaceApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "WorkspaceApiError";
  }
}

function throwOnError(res: { status: number; data: unknown }, fallback: string): void {
  const body = res.data as { success?: boolean; message?: string };
  if (res.status >= 400 || !body?.success) {
    throw new WorkspaceApiError(body?.message ?? fallback, res.status);
  }
}

export async function fetchWorkspaceOverview(): Promise<WorkspaceOverview> {
  const res = await apiClient.get<{ success: true; data: WorkspaceOverview }>(
    "/workspace/overview",
  );
  throwOnError(res, "Failed to load workspace");
  return res.data.data;
}

export async function updateMemberPerformance(
  userId: string,
  payload: { score: number; note?: string },
): Promise<void> {
  const res = await apiClient.patch(`/workspace/performance/${userId}`, payload);
  throwOnError(res, "Failed to update performance");
}
