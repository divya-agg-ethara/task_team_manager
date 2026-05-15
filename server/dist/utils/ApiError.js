"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const http_status_codes_1 = require("http-status-codes");
class ApiError extends Error {
    statusCode;
    isOperational;
    details;
    constructor(statusCode, message, options) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = options?.isOperational ?? true;
        this.details = options?.details;
        Object.setPrototypeOf(this, ApiError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message, details) {
        return new ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, message, { details });
    }
    static unauthorized(message = "Unauthorized") {
        return new ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, message);
    }
    static forbidden(message = "Forbidden") {
        return new ApiError(http_status_codes_1.StatusCodes.FORBIDDEN, message);
    }
    static notFound(message = "Resource not found") {
        return new ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, message);
    }
    static conflict(message, details) {
        return new ApiError(http_status_codes_1.StatusCodes.CONFLICT, message, { details });
    }
    static internal(message = "Internal server error") {
        return new ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message, {
            isOperational: false,
        });
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map