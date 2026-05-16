import type { TeamMemberRole } from "../../generated/prisma/client";

export type TeamSummary = {
  id: string;
  name: string;
  description: string | null;
  memberCount: number;
  projectCount: number;
  role: TeamMemberRole;
  createdAt: Date;
  updatedAt: Date;
};

export type TeamDetail = TeamSummary & {
  members: TeamMemberView[];
};

export type TeamMemberView = {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  openTaskCount?: number;
  performanceScore?: number | null;
};
