export type WorkspaceRole = "ADMIN" | "MEMBER";

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: WorkspaceRole;
  createdAt: Date;
  updatedAt: Date;
}
