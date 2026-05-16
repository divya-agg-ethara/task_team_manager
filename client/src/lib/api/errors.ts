import { isAxiosError } from "axios";

type ApiErrorBody = {
  success?: boolean;
  message?: string;
  details?: unknown;
};

/** HTTP status from API layer errors, Axios, or network (0). */
export function getErrorStatus(error: unknown): number | undefined {
  if (error && typeof error === "object") {
    if ("statusCode" in error && typeof error.statusCode === "number") {
      return error.statusCode;
    }
    if ("status" in error && typeof error.status === "number") {
      return error.status;
    }
  }

  if (isAxiosError(error)) {
    if (error.response?.status) return error.response.status;
    if (!error.response) return 0;
  }

  return undefined;
}

export function isNetworkError(error: unknown): boolean {
  const status = getErrorStatus(error);
  return status === 0;
}

export function isUnauthorizedError(error: unknown): boolean {
  return getErrorStatus(error) === 401;
}

function messageFromAxiosBody(error: unknown): string | undefined {
  if (!isAxiosError(error) || !error.response?.data) return undefined;
  const data = error.response.data as ApiErrorBody;
  if (typeof data.message === "string" && data.message.trim()) {
    return data.message;
  }
  return undefined;
}

/**
 * Human-readable message for toasts and error UI.
 */
export function parseApiError(
  error: unknown,
  fallback = "Something went wrong. Try again.",
): string {
  if (
    error instanceof Error &&
    "statusCode" in error &&
    typeof error.statusCode === "number" &&
    error.message
  ) {
    return error.message;
  }

  const status = getErrorStatus(error);

  if (status === 0) {
    if (isAxiosError(error) && error.code === "ECONNABORTED") {
      return "Request timed out. Check that the API server is running.";
    }
    return `Cannot reach the API at ${getApiOriginHint()}. Start the backend and verify NEXT_PUBLIC_API_URL in .env.local.`;
  }

  const fromBody = messageFromAxiosBody(error);
  if (fromBody) return fromBody;

  if (status === 401) return "Your session expired or credentials are invalid. Sign in again.";
  if (status === 403) return "You don't have permission to perform this action.";
  if (status === 404) return "The requested resource was not found.";
  if (status && status >= 500) return "Server error. Try again in a moment.";

  if (error instanceof Error && error.message) return error.message;

  return fallback;
}

export function getQueryErrorMessage(error: unknown): string {
  return parseApiError(error, "Failed to load data. Check your connection and try again.");
}

function getApiOriginHint(): string {
  const url =
    (typeof process.env.NEXT_PUBLIC_API_URL === "string" &&
      process.env.NEXT_PUBLIC_API_URL.trim()) ||
    "http://localhost:4000/api/v1";
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
}

export function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  const status = getErrorStatus(error);
  if (status === 401 || status === 403 || status === 404) return false;
  if (status === 0) return failureCount < 1;
  if (status && status >= 500) return failureCount < 1;
  return failureCount < 1;
}
