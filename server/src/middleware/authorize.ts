import type { NextFunction, Request, Response } from "express";
import type { ProjectRole } from "../config";
import { prisma } from "../prisma/client";
import { asyncHandler, ApiError } from "../utils";

/**
 * Project-level role authorization.
 * Use after authenticate on routes with :projectId param.
 * Implemented for future project/task modules.
 */
export const authorizeProject =
  (...allowedRoles: ProjectRole[]) =>
  asyncHandler(
    async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
      if (!req.user?.sub) {
        next(ApiError.unauthorized());
        return;
      }

      const projectId = Array.isArray(req.params.projectId)
        ? req.params.projectId[0]
        : req.params.projectId;

      if (!projectId) {
        next(ApiError.badRequest("Project ID is required"));
        return;
      }

      const membership = await prisma.projectMember.findUnique({
        where: {
          userId_projectId: {
            userId: req.user.sub,
            projectId,
          },
        },
      });

      if (!membership) {
        next(ApiError.forbidden("You are not a member of this project"));
        return;
      }

      if (!allowedRoles.includes(membership.role as ProjectRole)) {
        next(ApiError.forbidden("Insufficient project permissions"));
        return;
      }

      next();
    },
  );
