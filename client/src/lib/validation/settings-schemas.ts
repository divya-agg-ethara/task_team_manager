import { z } from "zod";
import { zodFormResolver } from "@/lib/validation/zod-form-resolver";

const nameSchema = z
  .string({ error: "Name is required" })
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be at most 100 characters");

export const profileSettingsSchema = z.object({
  name: nameSchema,
});

export const passwordSettingsSchema = z
  .object({
    currentPassword: z
      .string({ error: "Current password is required" })
      .min(1, "Current password is required"),
    newPassword: z
      .string({ error: "New password is required" })
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .regex(/[a-zA-Z]/, "Password must include at least one letter")
      .regex(/[0-9]/, "Password must include at least one number"),
    confirmPassword: z.string({ error: "Please confirm your password" }),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ProfileSettingsValues = z.infer<typeof profileSettingsSchema>;
export type PasswordSettingsValues = z.infer<typeof passwordSettingsSchema>;

export const profileSettingsResolver = zodFormResolver(profileSettingsSchema);
export const passwordSettingsResolver = zodFormResolver(passwordSettingsSchema);
