import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncHandler, ApiError } from "../../utils";
import { prisma } from "../../prisma/client";
import { teamService } from "./team.service";
import type {
  AddTeamMemberInput,
  CreateTeamInput,
  UpdateTeamInput,
} from "./team.validation";

async function isWorkspaceAdmin(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role === "ADMIN";
}

function getUserId(req: Request): string {
  if (!req.user?.sub) throw ApiError.unauthorized();
  return req.user.sub;
}

function getTeamId(req: Request): string {
  const teamId = Array.isArray(req.params.teamId)
    ? req.params.teamId[0]
    : req.params.teamId;
  if (!teamId) throw ApiError.badRequest("Team ID is required");
  return teamId;
}

function getMemberId(req: Request): string {
  const memberId = Array.isArray(req.params.memberId)
    ? req.params.memberId[0]
    : req.params.memberId;
  if (!memberId) throw ApiError.badRequest("Member ID is required");
  return memberId;
}

export const listTeams = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const admin = await isWorkspaceAdmin(userId);
  const teams = await teamService.listTeams(userId, admin);
  res.status(StatusCodes.OK).json({ success: true, data: { teams } });
});

export const createTeam = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const team = await teamService.createTeam(userId, req.body as CreateTeamInput);
  res.status(StatusCodes.CREATED).json({ success: true, data: { team } });
});

export const getTeam = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const admin = await isWorkspaceAdmin(userId);
  const team = await teamService.getTeam(getTeamId(req), userId, admin);
  res.status(StatusCodes.OK).json({ success: true, data: { team } });
});

export const updateTeam = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const admin = await isWorkspaceAdmin(userId);
  const team = await teamService.updateTeam(
    getTeamId(req),
    userId,
    admin,
    req.body as UpdateTeamInput,
  );
  res.status(StatusCodes.OK).json({ success: true, data: { team } });
});

export const deleteTeam = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const admin = await isWorkspaceAdmin(userId);
  await teamService.deleteTeam(getTeamId(req), userId, admin);
  res.status(StatusCodes.NO_CONTENT).send();
});

export const addTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const admin = await isWorkspaceAdmin(userId);
  const member = await teamService.addMember(
    getTeamId(req),
    userId,
    admin,
    req.body as AddTeamMemberInput,
  );
  res.status(StatusCodes.CREATED).json({ success: true, data: { member } });
});

export const removeTeamMember = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const admin = await isWorkspaceAdmin(userId);
  await teamService.removeMember(getTeamId(req), userId, getMemberId(req), admin);
  res.status(StatusCodes.NO_CONTENT).send();
});
