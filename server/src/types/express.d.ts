import type { PublicUser } from "./user";

export interface JwtPayload {
  sub: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      currentUser?: PublicUser;
    }
  }
}

export {};
