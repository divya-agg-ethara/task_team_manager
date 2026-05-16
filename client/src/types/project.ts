/** Project domain types (aligned with server project.types.ts) */

export type ProjectRole = "ADMIN" | "MEMBER";

export type ProjectUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectSummary = {
  id: string;
  name: string;
  description: string | null;
  role: ProjectRole;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ProjectDetail = ProjectSummary & {
  createdBy: ProjectUser;
};

export type ProjectMember = {
  id: string;
  userId: string;
  role: ProjectRole;
  user: ProjectUser;
  createdAt: string;
  updatedAt: string;
};
