"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.getCorsOrigins = getCorsOrigins;
const zod_1 = require("zod");
const envSchema = zod_1.z
    .object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    /** Railway sets PORT automatically; default 4000 for local dev */
    PORT: zod_1.z.coerce.number().int().positive().default(4000),
    DATABASE_URL: zod_1.z
        .string()
        .trim()
        .min(1, "DATABASE_URL is required"),
    JWT_SECRET: zod_1.z.string().min(1, "JWT_SECRET is required"),
    JWT_EXPIRES_IN: zod_1.z.string().default("7d"),
    /** Primary frontend origin (production: your deployed client URL) */
    CLIENT_URL: zod_1.z.string().url().default("http://localhost:3000"),
    /**
     * Extra allowed CORS origins, comma-separated.
     * Example: https://my-app.vercel.app,https://staging.example.com
     */
    ALLOWED_ORIGINS: zod_1.z.string().optional(),
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
function parseEnv() {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        const formatted = result.error.issues
            .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
            .join("\n");
        throw new Error(`Invalid environment variables:\n${formatted}`);
    }
    return result.data;
}
exports.env = parseEnv();
/** Resolved CORS allowlist for the current environment */
function getCorsOrigins() {
    const extra = exports.env.ALLOWED_ORIGINS?.split(",")
        .map((o) => o.trim())
        .filter(Boolean) ?? [];
    const origins = new Set([exports.env.CLIENT_URL, ...extra]);
    if (exports.env.NODE_ENV === "development") {
        origins.add("http://localhost:3000");
        origins.add("http://127.0.0.1:3000");
    }
    return Array.from(origins);
}
//# sourceMappingURL=env.js.map