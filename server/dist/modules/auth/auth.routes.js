"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const middleware_1 = require("../../middleware");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", authLimiter, (0, middleware_1.validate)(auth_validation_1.signupSchema), auth_controller_1.signup);
authRouter.post("/login", authLimiter, (0, middleware_1.validate)(auth_validation_1.loginSchema), auth_controller_1.login);
authRouter.get("/me", middleware_1.authenticate, middleware_1.loadCurrentUser, auth_controller_1.getMe);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map