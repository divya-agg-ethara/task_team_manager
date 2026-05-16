import type { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";
import { asyncHandler, ApiError } from "../utils";

/**
 * Requires workspace-level ADMIN role (loads from DB for authoritative check).
 */
export const requireWorkspaceAdmin = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    if (!req.user?.sub) {
      next(ApiError.unauthorized());
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
      select: { role: true },
    });

    if (!user) {
      next(ApiError.unauthorized("User no longer exists"));
      return;
    }

    if (user.role !== "ADMIN") {
      next(ApiError.forbidden("Workspace admin access required"));
      return;
    }

    next();
  },
);
