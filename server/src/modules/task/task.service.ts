import {
  PROJECT_ROLES,
  TASK_STATUSES,
  type ProjectRole,
  type TaskPriority,
  type TaskStatus,
} from "../../config";
import type { User } from "../../generated/prisma/client";
import { prisma } from "../../prisma/client";
import type { PublicUser } from "../../types/user";
import { ApiError } from "../../utils";
import type { TaskListMeta, TaskView } from "./task.types";
import {
  assertValidStatusTransition,
  type CreateTaskInput,
  type ListTasksQuery,
  type UpdateTaskInput,
} from "./task.validation";

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

type TaskWithRelations = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | null;
  completedAt: Date | null;
  createdById: string;
  assignedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Pick<User, keyof typeof userSelect>;
  assignedTo: Pick<User, keyof typeof userSelect> | null;
};

function toPublicUser(
  user: Pick<User, "id" | "email" | "name" | "role" | "createdAt" | "updatedAt">,
): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as PublicUser["role"],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function toTaskView(task: TaskWithRelations): TaskView {
  return {
    id: task.id,
    projectId: task.projectId,
    title: task.title,
    description: task.description,
    status: task.status as TaskStatus,
    priority: task.priority as TaskPriority,
    dueDate: task.dueDate,
    completedAt: task.completedAt,
    createdBy: toPublicUser(task.createdBy),
    assignedTo: task.assignedTo ? toPublicUser(task.assignedTo) : null,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

function resolveCompletedAt(
  currentStatus: TaskStatus,
  nextStatus: TaskStatus,
  currentCompletedAt: Date | null,
): Date | null {
  if (nextStatus === TASK_STATUSES.DONE) {
    return currentCompletedAt ?? new Date();
  }

  if (currentStatus === TASK_STATUSES.DONE) {
    return null;
  }

  return currentCompletedAt;
}

export class TaskService {
  private assertCanUpdateTask(
    userId: string,
    projectRole: ProjectRole,
    task: { createdById: string; assignedToId: string | null },
  ): void {
    const canUpdate =
      projectRole === PROJECT_ROLES.ADMIN ||
      task.createdById === userId ||
      task.assignedToId === userId;

    if (!canUpdate) {
      throw ApiError.forbidden("You do not have permission to update this task");
    }
  }

  private assertCanDeleteTask(
    userId: string,
    projectRole: ProjectRole,
    task: { createdById: string },
  ): void {
    const canDelete =
      projectRole === PROJECT_ROLES.ADMIN || task.createdById === userId;

    if (!canDelete) {
      throw ApiError.forbidden(
        "Only project admins or the task creator can delete this task",
      );
    }
  }

  private async assertAssigneeIsProjectMember(
    projectId: string,
    assignedToId: string,
  ): Promise<void> {
    const membership = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId: assignedToId,
          projectId,
        },
      },
    });

    if (!membership) {
      throw ApiError.badRequest(
        "Assigned user must be a member of this project",
      );
    }
  }

  private async getTaskOrThrow(
    projectId: string,
    taskId: string,
  ): Promise<TaskWithRelations> {
    const task = await prisma.task.findFirst({
      where: { id: taskId, projectId },
      include: {
        createdBy: { select: userSelect },
        assignedTo: { select: userSelect },
      },
    });

    if (!task) {
      throw ApiError.notFound("Task not found");
    }

    return task as TaskWithRelations;
  }

  async createTask(
    projectId: string,
    userId: string,
    input: CreateTaskInput,
  ): Promise<TaskView> {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw ApiError.notFound("Project not found");
    }

    const initialStatus = input.status as TaskStatus;

    if (initialStatus !== TASK_STATUSES.TODO) {
      try {
        assertValidStatusTransition(TASK_STATUSES.TODO, initialStatus);
      } catch {
        throw ApiError.badRequest(
          `Cannot create task with initial status ${initialStatus}`,
        );
      }
    }

    if (input.assignedToId) {
      await this.assertAssigneeIsProjectMember(projectId, input.assignedToId);
    }

    const task = await prisma.task.create({
      data: {
        projectId,
        title: input.title,
        description: input.description ?? null,
        status: initialStatus,
        priority: input.priority,
        dueDate: input.dueDate ?? null,
        createdById: userId,
        assignedToId: input.assignedToId ?? null,
        completedAt:
          initialStatus === TASK_STATUSES.DONE ? new Date() : null,
      },
      include: {
        createdBy: { select: userSelect },
        assignedTo: { select: userSelect },
      },
    });

    return toTaskView(task as TaskWithRelations);
  }

  async listTasks(
    projectId: string,
    query: ListTasksQuery,
  ): Promise<{ tasks: TaskView[]; meta: TaskListMeta }> {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw ApiError.notFound("Project not found");
    }

    const where = {
      projectId,
      ...(query.status && { status: query.status }),
      ...(query.priority && { priority: query.priority }),
      ...(query.assigneeId && { assignedToId: query.assigneeId }),
      ...(query.search && {
        title: { contains: query.search, mode: "insensitive" as const },
      }),
    };

    const orderBy =
      query.sortBy === "dueDate"
        ? [{ dueDate: query.sortOrder }, { createdAt: "desc" as const }]
        : [{ createdAt: query.sortOrder }];

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: {
          createdBy: { select: userSelect },
          assignedTo: { select: userSelect },
        },
        orderBy,
      }),
      prisma.task.count({ where }),
    ]);

    return {
      tasks: (tasks as TaskWithRelations[]).map(toTaskView),
      meta: {
        total,
        filters: {
          ...(query.status && { status: query.status }),
          ...(query.priority && { priority: query.priority }),
          ...(query.assigneeId && { assigneeId: query.assigneeId }),
          ...(query.search && { search: query.search }),
        },
        sort: {
          sortBy: query.sortBy,
          sortOrder: query.sortOrder,
        },
      },
    };
  }

  async getTaskById(projectId: string, taskId: string): Promise<TaskView> {
    const task = await this.getTaskOrThrow(projectId, taskId);
    return toTaskView(task);
  }

  async updateTask(
    projectId: string,
    taskId: string,
    userId: string,
    projectRole: ProjectRole,
    input: UpdateTaskInput,
  ): Promise<TaskView> {
    const existing = await this.getTaskOrThrow(projectId, taskId);

    this.assertCanUpdateTask(userId, projectRole, existing);

    const currentStatus = existing.status as TaskStatus;
    const nextStatus = (input.status ?? currentStatus) as TaskStatus;

    if (input.status !== undefined && nextStatus !== currentStatus) {
      try {
        assertValidStatusTransition(currentStatus, nextStatus);
      } catch {
        throw ApiError.badRequest(
          `Invalid status transition from ${currentStatus} to ${nextStatus}`,
        );
      }
    }

    if (input.assignedToId) {
      await this.assertAssigneeIsProjectMember(projectId, input.assignedToId);
    }

    const completedAt = resolveCompletedAt(
      currentStatus,
      nextStatus,
      existing.completedAt,
    );

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.description !== undefined && {
          description: input.description,
        }),
        ...(input.status !== undefined && { status: input.status }),
        ...(input.priority !== undefined && { priority: input.priority }),
        ...(input.dueDate !== undefined && { dueDate: input.dueDate }),
        ...(input.assignedToId !== undefined && {
          assignedToId: input.assignedToId,
        }),
        completedAt,
      },
      include: {
        createdBy: { select: userSelect },
        assignedTo: { select: userSelect },
      },
    });

    return toTaskView(task as TaskWithRelations);
  }

  async deleteTask(
    projectId: string,
    taskId: string,
    userId: string,
    projectRole: ProjectRole,
  ): Promise<void> {
    const existing = await this.getTaskOrThrow(projectId, taskId);

    this.assertCanDeleteTask(userId, projectRole, existing);

    await prisma.task.delete({ where: { id: taskId } });
  }
}

export const taskService = new TaskService();
