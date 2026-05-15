"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.optionalAuthenticate = optionalAuthenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const utils_1 = require("../utils");
/**
 * JWT authentication scaffold.
 * Verifies Bearer token and attaches decoded payload to req.user.
 * Implement login/token issuance in auth module later.
 */
function authenticate(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        next(utils_1.ApiError.unauthorized("Missing or invalid authorization header"));
        return;
    }
    const token = authHeader.slice(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.env.JWT_SECRET);
        req.user = payload;
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
        const payload = jsonwebtoken_1.default.verify(token, config_1.env.JWT_SECRET);
        req.user = payload;
    }
    catch {
        // Invalid token on optional routes — proceed without user
    }
    next();
}
//# sourceMappingURL=authenticate.js.map