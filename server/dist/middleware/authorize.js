"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const utils_1 = require("../utils");
/**
 * Role-based authorization scaffold.
 * Use after authenticate middleware on protected routes.
 */
const authorize = (...allowedRoles) => (req, _res, next) => {
    if (!req.user) {
        next(utils_1.ApiError.unauthorized());
        return;
    }
    if (!allowedRoles.includes(req.user.role)) {
        next(utils_1.ApiError.forbidden("Insufficient permissions"));
        return;
    }
    next();
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.js.map