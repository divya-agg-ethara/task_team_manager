import { z } from "zod";
import { zodFormResolver } from "@/lib/validation/zod-form-resolver";
import { TASK_PRIORITIES } from "@/lib/tasks/constants";

const titleSchema = z
  .string({ error: "Title is required" })
  .trim()
  .min(1, "Title is required")
  .min(2, "Title must be at least 2 characters")
  .max(200, "Title must be at most 200 characters");

const descriptionSchema = z
  .string()
  .trim()
  .max(2000, "Description must be at most 2000 characters");

const prioritySchema = z.enum(TASK_PRIORITIES, { error: "Select a priority" });

const dueDateSchema = z.string().optional().or(z.literal(""));

export const taskFormSchema = z.object({
  title: titleSchema,
  description: descriptionSchema.optional().or(z.literal("")),
  priority: prioritySchema,
  dueDate: dueDateSchema,
  assignedToId: z.string().optional().or(z.literal("")),
});

export type TaskFormInput = z.infer<typeof taskFormSchema>;
export type TaskFormValues = TaskFormInput;

/** Date input (YYYY-MM-DD) → ISO end-of-day UTC for API */
export function dueDateInputToIso(dueDate?: string): string | undefined {
  if (!dueDate?.trim()) return undefined;
  const d = new Date(`${dueDate}T23:59:59.999Z`);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export const taskFormResolver = zodFormResolver(taskFormSchema);
