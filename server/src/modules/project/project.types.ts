import type { ProjectRole } from "../../config";
import type { PublicUser } from "../../types/user";

export interface ProjectSummary {
  id: string;
  name: string;
  description: string | null;
  role: ProjectRole;
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDetail extends ProjectSummary {
  createdBy: PublicUser;
}

export interface ProjectMemberView {
  id: string;
  userId: string;
  role: ProjectRole;
  user: PublicUser;
  createdAt: Date;
  updatedAt: Date;
}
