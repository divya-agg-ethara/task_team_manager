import type { NextFunction, Request, Response } from "express";
import type { ProjectRole } from "../config";
import { prisma } from "../prisma/client";
import { asyncHandler, ApiError } from "../utils";

function parseParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * Project-level role authorization.
 * Attaches membership to req.projectMembership when authorized.
 */
export const authorizeProject =
  (...allowedRoles: ProjectRole[]) =>
  asyncHandler(
    async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
      if (!req.user?.sub) {
        next(ApiError.unauthorized());
        return;
      }

      const projectId = parseParam(req.params.projectId);

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

      req.projectMembership = {
        id: membership.id,
        userId: membership.userId,
        projectId: membership.projectId,
        role: membership.role as ProjectRole,
      };

      next();
    },
  );
