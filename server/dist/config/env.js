"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: zod_1.z.coerce.number().int().positive().default(4000),
    DATABASE_URL: zod_1.z
        .string()
        .trim()
        .min(1, "DATABASE_URL is required"),
    JWT_SECRET: zod_1.z.string().min(1, "JWT_SECRET is required"),
    JWT_EXPIRES_IN: zod_1.z.string().default("7d"),
    CLIENT_URL: zod_1.z.string().url().default("http://localhost:3000"),
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
//# sourceMappingURL=env.js.map