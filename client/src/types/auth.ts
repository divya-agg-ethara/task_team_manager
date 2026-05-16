export type WorkspaceRole = "ADMIN" | "MEMBER";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: WorkspaceRole;
  createdAt?: string;
  updatedAt?: string;
}
