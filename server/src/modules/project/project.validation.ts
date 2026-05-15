import { z } from "zod";
import { PROJECT_ROLES } from "../../config";

const cuidSchema = z
  .string({ error: "ID is required" })
  .min(1, "ID is required");

const projectNameSchema = z
  .string({ error: "Project name is required" })
  .trim()
  .min(2, "Project name must be at least 2 characters")
  .max(100, "Project name must be at most 100 characters");

const projectDescriptionSchema = z
  .string()
  .trim()
  .max(500, "Description must be at most 500 characters")
  .optional();

export const createProjectSchema = z.object({
  name: projectNameSchema,
  description: projectDescriptionSchema,
});

export const updateProjectSchema = z
  .object({
    name: projectNameSchema.optional(),
    description: z.union([projectDescriptionSchema, z.literal(null)]).optional(),
  })
  .refine((data) => data.name !== undefined || data.description !== undefined, {
    message: "At least one field must be provided for update",
  });

export const projectIdParamSchema = z.object({
  projectId: cuidSchema,
});

export const memberIdParamSchema = z.object({
  projectId: cuidSchema,
  memberId: cuidSchema,
});

export const addMemberSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Invalid email address"),
  role: z
    .enum([PROJECT_ROLES.MEMBER, PROJECT_ROLES.ADMIN], {
      error: "Role must be ADMIN or MEMBER",
    })
    .default(PROJECT_ROLES.MEMBER),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;
