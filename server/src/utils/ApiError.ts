import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    statusCode: number,
    message: string,
    options?: { isOperational?: boolean; details?: unknown },
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = options?.isOperational ?? true;
    this.details = options?.details;
    Object.setPrototypeOf(this, ApiError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, details?: unknown): ApiError {
    return new ApiError(StatusCodes.BAD_REQUEST, message, { details });
  }

  static unauthorized(message = "Unauthorized"): ApiError {
    return new ApiError(StatusCodes.UNAUTHORIZED, message);
  }

  static forbidden(message = "Forbidden"): ApiError {
    return new ApiError(StatusCodes.FORBIDDEN, message);
  }

  static notFound(message = "Resource not found"): ApiError {
    return new ApiError(StatusCodes.NOT_FOUND, message);
  }

  static conflict(message: string, details?: unknown): ApiError {
    return new ApiError(StatusCodes.CONFLICT, message, { details });
  }

  static internal(message = "Internal server error"): ApiError {
    return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, message, {
      isOperational: false,
    });
  }
}
