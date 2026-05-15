"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const client_1 = require("../generated/prisma/client");
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const config_1 = require("../config");
const utils_1 = require("../utils");
function errorHandler(err, _req, res, _next) {
    let statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    let details;
    let isOperational = false;
    if (err instanceof utils_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        details = err.details;
        isOperational = err.isOperational;
    }
    else if (err instanceof zod_1.ZodError) {
        statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
        message = "Validation failed";
        details = err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        }));
        isOperational = true;
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = http_status_codes_1.StatusCodes.CONFLICT;
            message = "A record with this value already exists";
            isOperational = true;
        }
    }
    if (!isOperational && config_1.env.NODE_ENV === "production") {
        message = "Internal server error";
        details = undefined;
    }
    const response = {
        success: false,
        message,
    };
    if (details !== undefined) {
        response.details = details;
    }
    if (config_1.env.NODE_ENV === "development" && err.stack) {
        response.stack = err.stack;
    }
    if (config_1.env.NODE_ENV === "development") {
        console.error(err);
    }
    res.status(statusCode).json(response);
}
//# sourceMappingURL=errorHandler.js.map