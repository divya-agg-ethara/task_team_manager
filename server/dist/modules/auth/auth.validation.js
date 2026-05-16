"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateProfileSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
const emailSchema = zod_1.z
    .string({ error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Invalid email address");
const passwordSchema = zod_1.z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number");
const nameSchema = zod_1.z
    .string({ error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters");
exports.signupSchema = zod_1.z.object({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
});
exports.loginSchema = zod_1.z.object({
    email: emailSchema,
    password: zod_1.z.string({ error: "Password is required" }).min(1, "Password is required"),
});
exports.updateProfileSchema = zod_1.z.object({
    name: nameSchema,
});
exports.changePasswordSchema = zod_1.z
    .object({
    currentPassword: zod_1.z
        .string({ error: "Current password is required" })
        .min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmPassword: zod_1.z.string({ error: "Please confirm your new password" }),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
//# sourceMappingURL=auth.validation.js.map