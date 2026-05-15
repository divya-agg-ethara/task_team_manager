"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.listTasks = exports.createTask = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const task_service_1 = require("./task.service");
function getUserId(req) {
    if (!req.user?.sub) {
        throw utils_1.ApiError.unauthorized();
    }
    return req.user.sub;
}
function getProjectId(req) {
    const projectId = Array.isArray(req.params.projectId)
        ? req.params.projectId[0]
        : req.params.projectId;
    if (!projectId) {
        throw utils_1.ApiError.badRequest("Project ID is required");
    }
    return projectId;
}
function getTaskId(req) {
    const taskId = Array.isArray(req.params.taskId)
        ? req.params.taskId[0]
        : req.params.taskId;
    if (!taskId) {
        throw utils_1.ApiError.badRequest("Task ID is required");
    }
    return taskId;
}
function getProjectRole(req) {
    if (!req.projectMembership?.role) {
        throw utils_1.ApiError.forbidden("Project membership required");
    }
    return req.projectMembership.role;
}
exports.createTask = (0, utils_1.asyncHandler)(async (req, res) => {
    const task = await task_service_1.taskService.createTask(getProjectId(req), getUserId(req), req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        data: { task },
    });
});
exports.listTasks = (0, utils_1.asyncHandler)(async (req, res) => {
    const result = await task_service_1.taskService.listTasks(getProjectId(req), (req.validatedQuery ?? req.query));
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: result,
    });
});
exports.getTask = (0, utils_1.asyncHandler)(async (req, res) => {
    const task = await task_service_1.taskService.getTaskById(getProjectId(req), getTaskId(req));
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: { task },
    });
});
exports.updateTask = (0, utils_1.asyncHandler)(async (req, res) => {
    const task = await task_service_1.taskService.updateTask(getProjectId(req), getTaskId(req), getUserId(req), getProjectRole(req), req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: { task },
    });
});
exports.deleteTask = (0, utils_1.asyncHandler)(async (req, res) => {
    await task_service_1.taskService.deleteTask(getProjectId(req), getTaskId(req), getUserId(req), getProjectRole(req));
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Task deleted successfully",
    });
});
//# sourceMappingURL=task.controller.js.map