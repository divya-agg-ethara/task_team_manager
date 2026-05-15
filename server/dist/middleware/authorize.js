"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeProject = void 0;
const client_1 = require("../prisma/client");
const utils_1 = require("../utils");
function parseParam(value) {
    return Array.isArray(value) ? value[0] : value;
}
/**
 * Project-level role authorization.
 * Attaches membership to req.projectMembership when authorized.
 */
const authorizeProject = (...allowedRoles) => (0, utils_1.asyncHandler)(async (req, _res, next) => {
    if (!req.user?.sub) {
        next(utils_1.ApiError.unauthorized());
        return;
    }
    const projectId = parseParam(req.params.projectId);
    if (!projectId) {
        next(utils_1.ApiError.badRequest("Project ID is required"));
        return;
    }
    const membership = await client_1.prisma.projectMember.findUnique({
        where: {
            userId_projectId: {
                userId: req.user.sub,
                projectId,
            },
        },
    });
    if (!membership) {
        next(utils_1.ApiError.forbidden("You are not a member of this project"));
        return;
    }
    if (!allowedRoles.includes(membership.role)) {
        next(utils_1.ApiError.forbidden("Insufficient project permissions"));
        return;
    }
    req.projectMembership = {
        id: membership.id,
        userId: membership.userId,
        projectId: membership.projectId,
        role: membership.role,
    };
    next();
});
exports.authorizeProject = authorizeProject;
//# sourceMappingURL=authorize.js.map