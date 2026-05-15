"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.signup = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const auth_service_1 = require("./auth.service");
exports.signup = (0, utils_1.asyncHandler)(async (req, res) => {
    const result = await auth_service_1.authService.signup(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        data: result,
    });
});
exports.login = (0, utils_1.asyncHandler)(async (req, res) => {
    const result = await auth_service_1.authService.login(req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: result,
    });
});
exports.getMe = (0, utils_1.asyncHandler)(async (req, res) => {
    if (!req.currentUser) {
        throw utils_1.ApiError.unauthorized();
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: { user: req.currentUser },
    });
});
//# sourceMappingURL=auth.controller.js.map