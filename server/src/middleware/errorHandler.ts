import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { env } from "../config";
import { ApiError } from "../utils";

interface ErrorResponse {
  success: false;
  message: string;
  details?: unknown;
  stack?: string;
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Internal server error";
  let details: unknown;
  let isOperational = false;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
    isOperational = err.isOperational;
  } else if (err instanceof ZodError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = "Validation failed";
    details = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    isOperational = true;
  }

  if (!isOperational && env.NODE_ENV === "production") {
    message = "Internal server error";
    details = undefined;
  }

  const response: ErrorResponse = {
    success: false,
    message,
  };

  if (details !== undefined) {
    response.details = details;
  }

  if (env.NODE_ENV === "development" && err.stack) {
    response.stack = err.stack;
  }

  if (env.NODE_ENV === "development") {
    console.error(err);
  }

  res.status(statusCode).json(response);
}
