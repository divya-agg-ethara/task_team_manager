import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { asyncHandler, ApiError } from "../../utils";
import { projectService } from "./project.service";
import type {
  AddMemberInput,
  CreateProjectInput,
  UpdateProjectInput,
} from "./project.validation";

function getUserId(req: Request): string {
  if (!req.user?.sub) {
    throw ApiError.unauthorized();
  }
  return req.user.sub;
}

function getProjectId(req: Request): string {
  const projectId = Array.isArray(req.params.projectId)
    ? req.params.projectId[0]
    : req.params.projectId;

  if (!projectId) {
    throw ApiError.badRequest("Project ID is required");
  }

  return projectId;
}

function getMemberId(req: Request): string {
  const memberId = Array.isArray(req.params.memberId)
    ? req.params.memberId[0]
    : req.params.memberId;

  if (!memberId) {
    throw ApiError.badRequest("Member ID is required");
  }

  return memberId;
}

export const createProject = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const project = await projectService.createProject(
      getUserId(req),
      req.body as CreateProjectInput,
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: { project },
    });
  },
);

export const listProjects = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const projects = await projectService.listUserProjects(getUserId(req));

    res.status(StatusCodes.OK).json({
      success: true,
      data: { projects },
    });
  },
);

export const getProject = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const project = await projectService.getProjectById(
      getUserId(req),
      getProjectId(req),
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: { project },
    });
  },
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const project = await projectService.updateProject(
      getUserId(req),
      getProjectId(req),
      req.body as UpdateProjectInput,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: { project },
    });
  },
);

export const deleteProject = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    await projectService.deleteProject(getProjectId(req));

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Project deleted successfully",
    });
  },
);

export const addMember = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const member = await projectService.addMember(
      getProjectId(req),
      req.body as AddMemberInput,
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: { member },
    });
  },
);

export const listMembers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const members = await projectService.listMembers(getProjectId(req));

    res.status(StatusCodes.OK).json({
      success: true,
      data: { members },
    });
  },
);

export const removeMember = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    await projectService.removeMember(
      getProjectId(req),
      getMemberId(req),
      getUserId(req),
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Member removed successfully",
    });
  },
);
