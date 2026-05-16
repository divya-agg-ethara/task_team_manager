"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_PREFIX = exports.apiRouter = void 0;
const express_1 = require("express");
const config_1 = require("../config");
Object.defineProperty(exports, "API_PREFIX", { enumerable: true, get: function () { return config_1.API_PREFIX; } });
const auth_1 = require("../modules/auth");
const project_1 = require("../modules/project");
const team_1 = require("../modules/team");
const workspace_1 = require("../modules/workspace");
const health_routes_1 = __importDefault(require("./health.routes"));
const apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
apiRouter.use("/health", health_routes_1.default);
apiRouter.use("/auth", auth_1.authRouter);
apiRouter.use("/teams", team_1.teamRouter);
apiRouter.use("/workspace", workspace_1.workspaceRouter);
apiRouter.use("/projects", project_1.projectRouter);
//# sourceMappingURL=index.js.map