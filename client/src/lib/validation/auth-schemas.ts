import { z } from "zod";
import { zodFormResolver } from "@/lib/validation/zod-form-resolver";

/**
 * Auth form schemas — aligned with `server/src/modules/auth/auth.validation.ts`.
 * Payload keys: `{ email, password }` for login; signup adds `{ name }`.
 */

// ─── Login (minimal checks; server verifies credentials) ───────────────────

const loginEmailSchema = z
  .string({ error: "Email is required" })
  .trim()
  .min(1, "Email is required")
  .toLowerCase()
  .email("Enter a valid email address");

const loginPasswordSchema = z
  .string({ error: "Password is required" })
  .min(1, "Password is required");

export const loginFormSchema = z.object({
  email: loginEmailSchema,
  password: loginPasswordSchema,
});

// ─── Signup (matches server password + name rules) ─────────────────────────

const signupEmailSchema = z
  .string({ error: "Email is required" })
  .trim()
  .min(1, "Email is required")
  .toLowerCase()
  .email("Enter a valid email address");

const signupPasswordSchema = z
  .string({ error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters")
  .regex(/[a-zA-Z]/, "Password must include at least one letter")
  .regex(/[0-9]/, "Password must include at least one number");

const signupNameSchema = z
  .string({ error: "Name is required" })
  .trim()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be at most 100 characters");

export const signupFormSchema = z.object({
  name: signupNameSchema,
  email: signupEmailSchema,
  password: signupPasswordSchema,
});

export type LoginFormInput = z.input<typeof loginFormSchema>;
export type SignupFormInput = z.input<typeof signupFormSchema>;
export type LoginFormValues = z.output<typeof loginFormSchema>;
export type SignupFormValues = z.output<typeof signupFormSchema>;

export const loginFormResolver = zodFormResolver(loginFormSchema);
export const signupFormResolver = zodFormResolver(signupFormSchema);
