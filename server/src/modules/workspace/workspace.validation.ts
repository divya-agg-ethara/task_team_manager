import { z } from "zod";

export const updatePerformanceSchema = z.object({
  score: z.number().int().min(0).max(100),
  note: z.string().trim().max(500).optional(),
});

export const userIdParamSchema = z.object({
  userId: z.string().cuid(),
});

export type UpdatePerformanceInput = z.infer<typeof updatePerformanceSchema>;
