/** Generic API envelope from Express backend */

import type { WorkspaceRole } from "@/types/auth";

export type AuthUserDto = {
  id: string;
  email: string;
  name: string;
  role?: WorkspaceRole;
  createdAt: string;
  updatedAt: string;
};

export type AuthPayload = {
  user: AuthUserDto;
  tokens: { accessToken: string };
};

export type AuthSuccessBody = {
  success: true;
  data: AuthPayload;
};
