import type { ProjectRole } from "../config/constants";
import type { PublicUser } from "./user";

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface ProjectMembershipContext {
  id: string;
  userId: string;
  projectId: string;
  role: ProjectRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      currentUser?: PublicUser;
      projectMembership?: ProjectMembershipContext;
      validatedQuery?: unknown;
      validatedParams?: unknown;
    }
  }
}

export {};
