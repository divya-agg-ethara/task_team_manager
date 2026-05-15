import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import type { ProjectRole } from "../../config";
import { asyncHandler, ApiError } from "../../utils";
import { taskService } from "./task.service";
import type {
  CreateTaskInput,
  ListTasksQuery,
  UpdateTaskInput,
} from "./task.validation";

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

function getTaskId(req: Request): string {
  const taskId = Array.isArray(req.params.taskId)
    ? req.params.taskId[0]
    : req.params.taskId;

  if (!taskId) {
    throw ApiError.badRequest("Task ID is required");
  }

  return taskId;
}

function getProjectRole(req: Request): ProjectRole {
  if (!req.projectMembership?.role) {
    throw ApiError.forbidden("Project membership required");
  }
  return req.projectMembership.role;
}

export const createTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const task = await taskService.createTask(
      getProjectId(req),
      getUserId(req),
      req.body as CreateTaskInput,
    );

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: { task },
    });
  },
);

export const listTasks = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await taskService.listTasks(
      getProjectId(req),
      (req.validatedQuery ?? req.query) as ListTasksQuery,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: result,
    });
  },
);

export const getTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const task = await taskService.getTaskById(
      getProjectId(req),
      getTaskId(req),
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: { task },
    });
  },
);

export const updateTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const task = await taskService.updateTask(
      getProjectId(req),
      getTaskId(req),
      getUserId(req),
      getProjectRole(req),
      req.body as UpdateTaskInput,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: { task },
    });
  },
);

export const deleteTask = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    await taskService.deleteTask(
      getProjectId(req),
      getTaskId(req),
      getUserId(req),
      getProjectRole(req),
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Task deleted successfully",
    });
  },
);
