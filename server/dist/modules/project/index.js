"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = exports.projectRouter = void 0;
var project_routes_1 = require("./project.routes");
Object.defineProperty(exports, "projectRouter", { enumerable: true, get: function () { return __importDefault(project_routes_1).default; } });
var project_service_1 = require("./project.service");
Object.defineProperty(exports, "projectService", { enumerable: true, get: function () { return project_service_1.projectService; } });
//# sourceMappingURL=index.js.map