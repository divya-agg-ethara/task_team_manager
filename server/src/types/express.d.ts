import type { Role } from "../config/constants";

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
