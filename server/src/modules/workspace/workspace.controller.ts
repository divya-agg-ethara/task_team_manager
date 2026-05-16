import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../prisma/client";
import { asyncHandler, ApiError } from "../../utils";
import { workspaceService } from "./workspace.service";
import type { UpdatePerformanceInput } from "./workspace.validation";

function getUserId(req: Request): string {
  if (!req.user?.sub) throw ApiError.unauthorized();
  return req.user.sub;
}

function getTargetUserId(req: Request): string {
  const userId = Array.isArray(req.params.userId)
    ? req.params.userId[0]
    : req.params.userId;
  if (!userId) throw ApiError.badRequest("User ID is required");
  return userId;
}

export const getWorkspaceOverview = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!user) throw ApiError.unauthorized();

    const overview = await workspaceService.getOverview(
      userId,
      user.role as "ADMIN" | "MEMBER",
    );
    res.status(StatusCodes.OK).json({ success: true, data: overview });
  },
);

export const getAdminAnalytics = asyncHandler(
  async (_req: Request, res: Response) => {
    const analytics = await workspaceService.getAdminAnalytics();
    res.status(StatusCodes.OK).json({ success: true, data: { analytics } });
  },
);

export const updateMemberPerformance = asyncHandler(
  async (req: Request, res: Response) => {
    const adminId = getUserId(req);
    const record = await workspaceService.updatePerformance(
      adminId,
      getTargetUserId(req),
      req.body as UpdatePerformanceInput,
    );
    res.status(StatusCodes.OK).json({ success: true, data: { performance: record } });
  },
);
