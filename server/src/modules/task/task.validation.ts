import { z } from "zod";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  TASK_STATUS_TRANSITIONS,
  type TaskStatus,
} from "../../config";

const cuidSchema = z
  .string({ error: "ID is required" })
  .min(1, "ID is required");

const taskTitleSchema = z
  .string({ error: "Title is required" })
  .trim()
  .min(2, "Title must be at least 2 characters")
  .max(200, "Title must be at most 200 characters");

const taskDescriptionSchema = z
  .string()
  .trim()
  .max(2000, "Description must be at most 2000 characters")
  .optional();

const taskStatusSchema = z.enum(
  [
    TASK_STATUSES.TODO,
    TASK_STATUSES.IN_PROGRESS,
    TASK_STATUSES.IN_REVIEW,
    TASK_STATUSES.DONE,
    TASK_STATUSES.CANCELLED,
  ],
  { error: "Invalid task status" },
);

const taskPrioritySchema = z.enum(
  [
    TASK_PRIORITIES.LOW,
    TASK_PRIORITIES.MEDIUM,
    TASK_PRIORITIES.HIGH,
    TASK_PRIORITIES.URGENT,
  ],
  { error: "Invalid task priority" },
);

const dueDateSchema = z
  .string()
  .datetime({ message: "Due date must be a valid ISO 8601 datetime" })
  .transform((value) => new Date(value))
  .refine((date) => !Number.isNaN(date.getTime()), {
    message: "Due date must be a valid date",
  });

export const createTaskSchema = z.object({
  title: taskTitleSchema,
  description: taskDescriptionSchema,
  status: taskStatusSchema.default(TASK_STATUSES.TODO),
  priority: taskPrioritySchema.default(TASK_PRIORITIES.MEDIUM),
  dueDate: dueDateSchema.optional(),
  assignedToId: cuidSchema.optional(),
});

export const updateTaskSchema = z
  .object({
    title: taskTitleSchema.optional(),
    description: z.union([taskDescriptionSchema, z.literal(null)]).optional(),
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema.optional(),
    dueDate: z.union([dueDateSchema, z.literal(null)]).optional(),
    assignedToId: z.union([cuidSchema, z.literal(null)]).optional(),
  })
  .refine(
    (data) =>
      Object.values(data).some((value) => value !== undefined),
    { message: "At least one field must be provided for update" },
  );

export const projectIdParamSchema = z.object({
  projectId: cuidSchema,
});

export const taskParamsSchema = z.object({
  projectId: cuidSchema,
  taskId: cuidSchema,
});

export const listTasksQuerySchema = z.object({
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  assigneeId: cuidSchema.optional(),
  search: z.string().trim().min(1).max(200).optional(),
  sortBy: z.enum(["createdAt", "dueDate"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>;

export function assertValidStatusTransition(
  currentStatus: TaskStatus,
  nextStatus: TaskStatus,
): void {
  if (currentStatus === nextStatus) {
    return;
  }

  const allowed = TASK_STATUS_TRANSITIONS[currentStatus];

  if (!allowed.includes(nextStatus)) {
    throw new Error(
      `Invalid status transition from ${currentStatus} to ${nextStatus}`,
    );
  }
}
