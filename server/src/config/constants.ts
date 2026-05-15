export const API_PREFIX = "/api/v1";

export const PROJECT_ROLES = {
  ADMIN: "ADMIN",
  MEMBER: "MEMBER",
} as const;

export type ProjectRole = (typeof PROJECT_ROLES)[keyof typeof PROJECT_ROLES];

export const BCRYPT_SALT_ROUNDS = 12;
