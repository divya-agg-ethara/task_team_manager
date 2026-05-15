"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = require("../config");
const client_1 = require("../prisma/client");
const utils_1 = require("../utils");
exports.getHealth = (0, utils_1.asyncHandler)(async (_req, res) => {
    let database = "disconnected";
    try {
        await client_1.prisma.$queryRaw `SELECT 1`;
        database = "connected";
    }
    catch {
        database = "disconnected";
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: {
            status: "ok",
            timestamp: new Date().toISOString(),
            environment: config_1.env.NODE_ENV,
            database,
        },
    });
});
//# sourceMappingURL=health.controller.js.map