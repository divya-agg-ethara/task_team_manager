"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = exports.taskRouter = void 0;
var task_routes_1 = require("./task.routes");
Object.defineProperty(exports, "taskRouter", { enumerable: true, get: function () { return __importDefault(task_routes_1).default; } });
var task_service_1 = require("./task.service");
Object.defineProperty(exports, "taskService", { enumerable: true, get: function () { return task_service_1.taskService; } });
//# sourceMappingURL=index.js.map