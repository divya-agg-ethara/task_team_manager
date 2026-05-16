import { z } from "zod";

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    /** Railway sets PORT automatically; default 4000 for local dev */
    PORT: z.coerce.number().int().positive().default(4000),
    DATABASE_URL: z
      .string()
      .trim()
      .min(1, "DATABASE_URL is required"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    JWT_EXPIRES_IN: z.string().default("7d"),
    /** Primary frontend origin (production: your deployed client URL) */
    CLIENT_URL: z.string().url().default("http://localhost:3000"),
    /**
     * Extra allowed CORS origins, comma-separated.
     * Example: https://my-app.vercel.app,https://staging.example.com
     */
    ALLOWED_ORIGINS: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.NODE_ENV === "production" && data.JWT_SECRET.length < 32) {
      ctx.addIssue({
        code: "custom",
        path: ["JWT_SECRET"],
        message: "JWT_SECRET must be at least 32 characters in production",
      });
    }
  });

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${formatted}`);
  }

  return result.data;
}

export const env = parseEnv();

/** Resolved CORS allowlist for the current environment */
export function getCorsOrigins(): string[] {
  const extra =
    env.ALLOWED_ORIGINS?.split(",")
      .map((o) => o.trim())
      .filter(Boolean) ?? [];

  const origins = new Set<string>([env.CLIENT_URL, ...extra]);

  if (env.NODE_ENV === "development") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }

  return Array.from(origins);
}
