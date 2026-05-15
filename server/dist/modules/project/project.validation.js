"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMemberSchema = exports.memberIdParamSchema = exports.projectIdParamSchema = exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
const config_1 = require("../../config");
const cuidSchema = zod_1.z
    .string({ error: "ID is required" })
    .min(1, "ID is required");
const projectNameSchema = zod_1.z
    .string({ error: "Project name is required" })
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be at most 100 characters");
const projectDescriptionSchema = zod_1.z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .optional();
exports.createProjectSchema = zod_1.z.object({
    name: projectNameSchema,
    description: projectDescriptionSchema,
});
exports.updateProjectSchema = zod_1.z
    .object({
    name: projectNameSchema.optional(),
    description: zod_1.z.union([projectDescriptionSchema, zod_1.z.literal(null)]).optional(),
})
    .refine((data) => data.name !== undefined || data.description !== undefined, {
    message: "At least one field must be provided for update",
});
exports.projectIdParamSchema = zod_1.z.object({
    projectId: cuidSchema,
});
exports.memberIdParamSchema = zod_1.z.object({
    projectId: cuidSchema,
    memberId: cuidSchema,
});
exports.addMemberSchema = zod_1.z.object({
    email: zod_1.z
        .string({ error: "Email is required" })
        .trim()
        .toLowerCase()
        .email("Invalid email address"),
    role: zod_1.z
        .enum([config_1.PROJECT_ROLES.MEMBER, config_1.PROJECT_ROLES.ADMIN], {
        error: "Role must be ADMIN or MEMBER",
    })
        .default(config_1.PROJECT_ROLES.MEMBER),
});
//# sourceMappingURL=project.validation.js.map