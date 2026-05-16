import { apiClient } from "@/lib/api/client";

export type TeamMemberRole = "ADMIN" | "MEMBER";

export type TeamSummary = {
  id: string;
  name: string;
  description: string | null;
  memberCount: number;
  projectCount: number;
  role: TeamMemberRole;
  createdAt: string;
  updatedAt: string;
};

export type TeamMember = {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  openTaskCount?: number;
  performanceScore?: number | null;
};

export type TeamDetail = TeamSummary & {
  members: TeamMember[];
};

export class TeamsApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "TeamsApiError";
  }
}

function throwOnError(res: { status: number; data: unknown }, fallback: string): void {
  const body = res.data as { success?: boolean; message?: string };
  if (res.status >= 400 || !body?.success) {
    throw new TeamsApiError(body?.message ?? fallback, res.status);
  }
}

export async function fetchTeams(): Promise<TeamSummary[]> {
  const res = await apiClient.get<{ success: true; data: { teams: TeamSummary[] } }>(
    "/teams",
  );
  throwOnError(res, "Failed to load teams");
  return res.data.data.teams;
}

export async function fetchTeam(teamId: string): Promise<TeamDetail> {
  const res = await apiClient.get<{ success: true; data: { team: TeamDetail } }>(
    `/teams/${teamId}`,
  );
  throwOnError(res, "Failed to load team");
  return res.data.data.team;
}

export async function createTeam(payload: {
  name: string;
  description?: string;
}): Promise<TeamDetail> {
  const res = await apiClient.post<{ success: true; data: { team: TeamDetail } }>(
    "/teams",
    payload,
  );
  throwOnError(res, "Failed to create team");
  return res.data.data.team;
}

export async function updateTeam(
  teamId: string,
  payload: { name?: string; description?: string | null },
): Promise<TeamDetail> {
  const res = await apiClient.patch<{ success: true; data: { team: TeamDetail } }>(
    `/teams/${teamId}`,
    payload,
  );
  throwOnError(res, "Failed to update team");
  return res.data.data.team;
}

export async function deleteTeam(teamId: string): Promise<void> {
  const res = await apiClient.delete(`/teams/${teamId}`);
  if (res.status >= 400) {
    const body = res.data as { message?: string };
    throw new TeamsApiError(body?.message ?? "Failed to delete team", res.status);
  }
}

export async function addTeamMember(
  teamId: string,
  payload: { email: string; role?: TeamMemberRole },
): Promise<TeamMember> {
  const res = await apiClient.post<{ success: true; data: { member: TeamMember } }>(
    `/teams/${teamId}/members`,
    payload,
  );
  throwOnError(res, "Failed to add member");
  return res.data.data.member;
}

export async function removeTeamMember(teamId: string, memberId: string): Promise<void> {
  const res = await apiClient.delete(`/teams/${teamId}/members/${memberId}`);
  if (res.status >= 400) {
    const body = res.data as { message?: string };
    throw new TeamsApiError(body?.message ?? "Failed to remove member", res.status);
  }
}
