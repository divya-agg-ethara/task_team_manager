"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTasksQuerySchema = exports.taskParamsSchema = exports.projectIdParamSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
exports.assertValidStatusTransition = assertValidStatusTransition;
const zod_1 = require("zod");
const config_1 = require("../../config");
const cuidSchema = zod_1.z
    .string({ error: "ID is required" })
    .min(1, "ID is required");
const taskTitleSchema = zod_1.z
    .string({ error: "Title is required" })
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be at most 200 characters");
const taskDescriptionSchema = zod_1.z
    .string()
    .trim()
    .max(2000, "Description must be at most 2000 characters")
    .optional();
const taskStatusSchema = zod_1.z.enum([
    config_1.TASK_STATUSES.TODO,
    config_1.TASK_STATUSES.IN_PROGRESS,
    config_1.TASK_STATUSES.IN_REVIEW,
    config_1.TASK_STATUSES.DONE,
    config_1.TASK_STATUSES.CANCELLED,
], { error: "Invalid task status" });
const taskPrioritySchema = zod_1.z.enum([
    config_1.TASK_PRIORITIES.LOW,
    config_1.TASK_PRIORITIES.MEDIUM,
    config_1.TASK_PRIORITIES.HIGH,
    config_1.TASK_PRIORITIES.URGENT,
], { error: "Invalid task priority" });
const dueDateSchema = zod_1.z
    .string()
    .datetime({ message: "Due date must be a valid ISO 8601 datetime" })
    .transform((value) => new Date(value))
    .refine((date) => !Number.isNaN(date.getTime()), {
    message: "Due date must be a valid date",
});
exports.createTaskSchema = zod_1.z.object({
    title: taskTitleSchema,
    description: taskDescriptionSchema,
    status: taskStatusSchema.default(config_1.TASK_STATUSES.TODO),
    priority: taskPrioritySchema.default(config_1.TASK_PRIORITIES.MEDIUM),
    dueDate: dueDateSchema.optional(),
    assignedToId: cuidSchema.optional(),
});
exports.updateTaskSchema = zod_1.z
    .object({
    title: taskTitleSchema.optional(),
    description: zod_1.z.union([taskDescriptionSchema, zod_1.z.literal(null)]).optional(),
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema.optional(),
    dueDate: zod_1.z.union([dueDateSchema, zod_1.z.literal(null)]).optional(),
    assignedToId: zod_1.z.union([cuidSchema, zod_1.z.literal(null)]).optional(),
})
    .refine((data) => Object.values(data).some((value) => value !== undefined), { message: "At least one field must be provided for update" });
exports.projectIdParamSchema = zod_1.z.object({
    projectId: cuidSchema,
});
exports.taskParamsSchema = zod_1.z.object({
    projectId: cuidSchema,
    taskId: cuidSchema,
});
exports.listTasksQuerySchema = zod_1.z.object({
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema.optional(),
    assigneeId: cuidSchema.optional(),
    search: zod_1.z.string().trim().min(1).max(200).optional(),
    sortBy: zod_1.z.enum(["createdAt", "dueDate"]).default("createdAt"),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("desc"),
});
function assertValidStatusTransition(currentStatus, nextStatus) {
    if (currentStatus === nextStatus) {
        return;
    }
    const allowed = config_1.TASK_STATUS_TRANSITIONS[currentStatus];
    if (!allowed.includes(nextStatus)) {
        throw new Error(`Invalid status transition from ${currentStatus} to ${nextStatus}`);
    }
}
//# sourceMappingURL=task.validation.js.map