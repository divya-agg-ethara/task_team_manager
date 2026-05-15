"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_1 = require("../../config");
const authorize_1 = require("../../middleware/authorize");
const validate_1 = require("../../middleware/validate");
const task_controller_1 = require("./task.controller");
const task_validation_1 = require("./task.validation");
const taskRouter = (0, express_1.Router)({ mergeParams: true });
taskRouter.use((0, validate_1.validate)(task_validation_1.projectIdParamSchema, "params"), (0, authorize_1.authorizeProject)(config_1.PROJECT_ROLES.ADMIN, config_1.PROJECT_ROLES.MEMBER));
taskRouter.post("/", (0, validate_1.validate)(task_validation_1.createTaskSchema), task_controller_1.createTask);
taskRouter.get("/", (0, validate_1.validate)(task_validation_1.listTasksQuerySchema, "query"), task_controller_1.listTasks);
taskRouter.get("/:taskId", (0, validate_1.validate)(task_validation_1.taskParamsSchema, "params"), task_controller_1.getTask);
taskRouter.patch("/:taskId", (0, validate_1.validate)(task_validation_1.taskParamsSchema, "params"), (0, validate_1.validate)(task_validation_1.updateTaskSchema), task_controller_1.updateTask);
taskRouter.delete("/:taskId", (0, validate_1.validate)(task_validation_1.taskParamsSchema, "params"), task_controller_1.deleteTask);
exports.default = taskRouter;
//# sourceMappingURL=task.routes.js.map