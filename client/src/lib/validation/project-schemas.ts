import { z } from "zod";
import { zodFormResolver } from "@/lib/validation/zod-form-resolver";

const projectNameSchema = z
  .string({ error: "Project name is required" })
  .trim()
  .min(1, "Project name is required")
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be at most 100 characters");

const projectDescriptionSchema = z
  .string()
  .trim()
  .max(500, "Description must be at most 500 characters");

export const createProjectFormSchema = z.object({
  name: projectNameSchema,
  description: projectDescriptionSchema,
});

export const addMemberFormSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .trim()
    .min(1, "Email is required")
    .toLowerCase()
    .email("Enter a valid email address"),
  role: z.enum(["ADMIN", "MEMBER"], { error: "Select a role" }),
});

export type CreateProjectFormInput = z.input<typeof createProjectFormSchema>;
export type CreateProjectFormValues = z.output<typeof createProjectFormSchema>;
export type AddMemberFormInput = z.input<typeof addMemberFormSchema>;
export type AddMemberFormValues = z.output<typeof addMemberFormSchema>;

export const createProjectFormResolver = zodFormResolver(createProjectFormSchema);
export const addMemberFormResolver = zodFormResolver(addMemberFormSchema);
