"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.optionalAuthenticate = optionalAuthenticate;
const jwt_1 = require("../lib/jwt");
const utils_1 = require("../utils");
/**
 * Verifies JWT Bearer token and attaches decoded payload to req.user.
 */
function authenticate(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        next(utils_1.ApiError.unauthorized("Missing or invalid authorization header"));
        return;
    }
    const token = authHeader.slice(7);
    try {
        req.user = (0, jwt_1.verifyAccessToken)(token);
        next();
    }
    catch {
        next(utils_1.ApiError.unauthorized("Invalid or expired token"));
    }
}
/**
 * Optional authentication — attaches user when token is valid, continues otherwise.
 */
function optionalAuthenticate(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        next();
        return;
    }
    const token = authHeader.slice(7);
    try {
        req.user = (0, jwt_1.verifyAccessToken)(token);
    }
    catch {
        // Invalid token on optional routes — proceed without user
    }
    next();
}
//# sourceMappingURL=authenticate.js.map