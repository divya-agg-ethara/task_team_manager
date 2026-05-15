"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMember = exports.listMembers = exports.addMember = exports.deleteProject = exports.updateProject = exports.getProject = exports.listProjects = exports.createProject = void 0;
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../../utils");
const project_service_1 = require("./project.service");
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
function getMemberId(req) {
    const memberId = Array.isArray(req.params.memberId)
        ? req.params.memberId[0]
        : req.params.memberId;
    if (!memberId) {
        throw utils_1.ApiError.badRequest("Member ID is required");
    }
    return memberId;
}
exports.createProject = (0, utils_1.asyncHandler)(async (req, res) => {
    const project = await project_service_1.projectService.createProject(getUserId(req), req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        data: { project },
    });
});
exports.listProjects = (0, utils_1.asyncHandler)(async (req, res) => {
    const projects = await project_service_1.projectService.listUserProjects(getUserId(req));
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: { projects },
    });
});
exports.getProject = (0, utils_1.asyncHandler)(async (req, res) => {
    const project = await project_service_1.projectService.getProjectById(getUserId(req), getProjectId(req));
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: { project },
    });
});
exports.updateProject = (0, utils_1.asyncHandler)(async (req, res) => {
    const project = await project_service_1.projectService.updateProject(getUserId(req), getProjectId(req), req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: { project },
    });
});
exports.deleteProject = (0, utils_1.asyncHandler)(async (req, res) => {
    await project_service_1.projectService.deleteProject(getProjectId(req));
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Project deleted successfully",
    });
});
exports.addMember = (0, utils_1.asyncHandler)(async (req, res) => {
    const member = await project_service_1.projectService.addMember(getProjectId(req), req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        data: { member },
    });
});
exports.listMembers = (0, utils_1.asyncHandler)(async (req, res) => {
    const members = await project_service_1.projectService.listMembers(getProjectId(req));
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        data: { members },
    });
});
exports.removeMember = (0, utils_1.asyncHandler)(async (req, res) => {
    await project_service_1.projectService.removeMember(getProjectId(req), getMemberId(req), getUserId(req));
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "Member removed successfully",
    });
});
//# sourceMappingURL=project.controller.js.map