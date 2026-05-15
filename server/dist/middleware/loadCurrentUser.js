"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCurrentUser = void 0;
const auth_1 = require("../modules/auth");
const utils_1 = require("../utils");
/**
 * Loads the authenticated user from the database and attaches to req.currentUser.
 * Must run after authenticate middleware.
 */
exports.loadCurrentUser = (0, utils_1.asyncHandler)(async (req, _res, next) => {
    if (!req.user?.sub) {
        next(utils_1.ApiError.unauthorized());
        return;
    }
    const user = await auth_1.authService.getUserById(req.user.sub);
    if (!user) {
        next(utils_1.ApiError.unauthorized("User no longer exists"));
        return;
    }
    req.currentUser = user;
    next();
});
//# sourceMappingURL=loadCurrentUser.js.map