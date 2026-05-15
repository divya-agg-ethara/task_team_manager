import type { NextFunction, Request, Response } from "express";
import { authService } from "../modules/auth/auth.service";
import { asyncHandler, ApiError } from "../utils";

/**
 * Loads the authenticated user from the database and attaches to req.currentUser.
 * Must run after authenticate middleware.
 */
export const loadCurrentUser = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (!req.user?.sub) {
      next(ApiError.unauthorized());
      return;
    }

    const user = await authService.getUserById(req.user.sub);

    if (!user) {
      next(ApiError.unauthorized("User no longer exists"));
      return;
    }

    req.currentUser = user;
    next();
  },
);
