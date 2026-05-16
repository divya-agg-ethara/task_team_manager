/**
 * Public env for client-side API calls.
 * Set NEXT_PUBLIC_API_URL in .env.local (e.g. http://localhost:4000/api/v1)
 */
export const API_BASE_URL =
  (typeof process.env.NEXT_PUBLIC_API_URL === "string" &&
    process.env.NEXT_PUBLIC_API_URL.trim()) ||
  "http://localhost:4000/api/v1";

export const APP_NAME = "TeamTask";
