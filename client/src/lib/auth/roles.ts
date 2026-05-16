import type { WorkspaceRole } from "@/types/auth";

export function isWorkspaceAdmin(role: WorkspaceRole | undefined): boolean {
  return role === "ADMIN";
}
