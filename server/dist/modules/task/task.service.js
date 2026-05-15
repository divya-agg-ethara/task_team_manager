"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = exports.TaskService = void 0;
const config_1 = require("../../config");
const client_1 = require("../../prisma/client");
const utils_1 = require("../../utils");
const task_validation_1 = require("./task.validation");
const userSelect = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
    updatedAt: true,
};
function toPublicUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
function toTaskView(task) {
    return {
        id: task.id,
        projectId: task.projectId,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        completedAt: task.completedAt,
        createdBy: toPublicUser(task.createdBy),
        assignedTo: task.assignedTo ? toPublicUser(task.assignedTo) : null,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
    };
}
function resolveCompletedAt(currentStatus, nextStatus, currentCompletedAt) {
    if (nextStatus === config_1.TASK_STATUSES.DONE) {
        return currentCompletedAt ?? new Date();
    }
    if (currentStatus === config_1.TASK_STATUSES.DONE) {
        return null;
    }
    return currentCompletedAt;
}
class TaskService {
    assertCanUpdateTask(userId, projectRole, task) {
        const canUpdate = projectRole === config_1.PROJECT_ROLES.ADMIN ||
            task.createdById === userId ||
            task.assignedToId === userId;
        if (!canUpdate) {
            throw utils_1.ApiError.forbidden("You do not have permission to update this task");
        }
    }
    assertCanDeleteTask(userId, projectRole, task) {
        const canDelete = projectRole === config_1.PROJECT_ROLES.ADMIN || task.createdById === userId;
        if (!canDelete) {
            throw utils_1.ApiError.forbidden("Only project admins or the task creator can delete this task");
        }
    }
    async assertAssigneeIsProjectMember(projectId, assignedToId) {
        const membership = await client_1.prisma.projectMember.findUnique({
            where: {
                userId_projectId: {
                    userId: assignedToId,
                    projectId,
                },
            },
        });
        if (!membership) {
            throw utils_1.ApiError.badRequest("Assigned user must be a member of this project");
        }
    }
    async getTaskOrThrow(projectId, taskId) {
        const task = await client_1.prisma.task.findFirst({
            where: { id: taskId, projectId },
            include: {
                createdBy: { select: userSelect },
                assignedTo: { select: userSelect },
            },
        });
        if (!task) {
            throw utils_1.ApiError.notFound("Task not found");
        }
        return task;
    }
    async createTask(projectId, userId, input) {
        const project = await client_1.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw utils_1.ApiError.notFound("Project not found");
        }
        const initialStatus = input.status;
        if (initialStatus !== config_1.TASK_STATUSES.TODO) {
            try {
                (0, task_validation_1.assertValidStatusTransition)(config_1.TASK_STATUSES.TODO, initialStatus);
            }
            catch {
                throw utils_1.ApiError.badRequest(`Cannot create task with initial status ${initialStatus}`);
            }
        }
        if (input.assignedToId) {
            await this.assertAssigneeIsProjectMember(projectId, input.assignedToId);
        }
        const task = await client_1.prisma.task.create({
            data: {
                projectId,
                title: input.title,
                description: input.description ?? null,
                status: initialStatus,
                priority: input.priority,
                dueDate: input.dueDate ?? null,
                createdById: userId,
                assignedToId: input.assignedToId ?? null,
                completedAt: initialStatus === config_1.TASK_STATUSES.DONE ? new Date() : null,
            },
            include: {
                createdBy: { select: userSelect },
                assignedTo: { select: userSelect },
            },
        });
        return toTaskView(task);
    }
    async listTasks(projectId, query) {
        const project = await client_1.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw utils_1.ApiError.notFound("Project not found");
        }
        const where = {
            projectId,
            ...(query.status && { status: query.status }),
            ...(query.priority && { priority: query.priority }),
            ...(query.assigneeId && { assignedToId: query.assigneeId }),
            ...(query.search && {
                title: { contains: query.search, mode: "insensitive" },
            }),
        };
        const orderBy = query.sortBy === "dueDate"
            ? [{ dueDate: query.sortOrder }, { createdAt: "desc" }]
            : [{ createdAt: query.sortOrder }];
        const [tasks, total] = await Promise.all([
            client_1.prisma.task.findMany({
                where,
                include: {
                    createdBy: { select: userSelect },
                    assignedTo: { select: userSelect },
                },
                orderBy,
            }),
            client_1.prisma.task.count({ where }),
        ]);
        return {
            tasks: tasks.map(toTaskView),
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
    async getTaskById(projectId, taskId) {
        const task = await this.getTaskOrThrow(projectId, taskId);
        return toTaskView(task);
    }
    async updateTask(projectId, taskId, userId, projectRole, input) {
        const existing = await this.getTaskOrThrow(projectId, taskId);
        this.assertCanUpdateTask(userId, projectRole, existing);
        const currentStatus = existing.status;
        const nextStatus = (input.status ?? currentStatus);
        if (input.status !== undefined && nextStatus !== currentStatus) {
            try {
                (0, task_validation_1.assertValidStatusTransition)(currentStatus, nextStatus);
            }
            catch {
                throw utils_1.ApiError.badRequest(`Invalid status transition from ${currentStatus} to ${nextStatus}`);
            }
        }
        if (input.assignedToId) {
            await this.assertAssigneeIsProjectMember(projectId, input.assignedToId);
        }
        const completedAt = resolveCompletedAt(currentStatus, nextStatus, existing.completedAt);
        const task = await client_1.prisma.task.update({
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
        return toTaskView(task);
    }
    async deleteTask(projectId, taskId, userId, projectRole) {
        const existing = await this.getTaskOrThrow(projectId, taskId);
        this.assertCanDeleteTask(userId, projectRole, existing);
        await client_1.prisma.task.delete({ where: { id: taskId } });
    }
}
exports.TaskService = TaskService;
exports.taskService = new TaskService();
//# sourceMappingURL=task.service.js.map