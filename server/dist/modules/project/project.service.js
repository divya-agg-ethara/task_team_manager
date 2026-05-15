"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = exports.ProjectService = void 0;
const config_1 = require("../../config");
const client_1 = require("../../prisma/client");
const utils_1 = require("../../utils");
function toPublicUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
function toProjectSummary(project, role) {
    return {
        id: project.id,
        name: project.name,
        description: project.description,
        role,
        memberCount: project._count.members,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
    };
}
class ProjectService {
    async createProject(userId, input) {
        const project = await client_1.prisma.$transaction(async (tx) => {
            const created = await tx.project.create({
                data: {
                    name: input.name,
                    description: input.description ?? null,
                    createdById: userId,
                    members: {
                        create: {
                            userId,
                            role: config_1.PROJECT_ROLES.ADMIN,
                        },
                    },
                },
                include: {
                    createdBy: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                    _count: { select: { members: true } },
                },
            });
            return created;
        });
        return {
            ...toProjectSummary(project, config_1.PROJECT_ROLES.ADMIN),
            createdBy: toPublicUser(project.createdBy),
        };
    }
    async listUserProjects(userId) {
        const memberships = await client_1.prisma.projectMember.findMany({
            where: { userId },
            include: {
                project: {
                    include: {
                        _count: { select: { members: true } },
                    },
                },
            },
            orderBy: { project: { updatedAt: "desc" } },
        });
        return memberships.map((membership) => toProjectSummary(membership.project, membership.role));
    }
    async getProjectById(userId, projectId) {
        const membership = await client_1.prisma.projectMember.findUnique({
            where: {
                userId_projectId: { userId, projectId },
            },
            include: {
                project: {
                    include: {
                        createdBy: {
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                        _count: { select: { members: true } },
                    },
                },
            },
        });
        if (!membership) {
            throw utils_1.ApiError.forbidden("You are not a member of this project");
        }
        return {
            ...toProjectSummary(membership.project, membership.role),
            createdBy: toPublicUser(membership.project.createdBy),
        };
    }
    async updateProject(userId, projectId, input) {
        const membership = await client_1.prisma.projectMember.findUnique({
            where: {
                userId_projectId: { userId, projectId },
            },
        });
        if (!membership) {
            throw utils_1.ApiError.forbidden("You are not a member of this project");
        }
        const project = await client_1.prisma.project.update({
            where: { id: projectId },
            data: {
                ...(input.name !== undefined && { name: input.name }),
                ...(input.description !== undefined && {
                    description: input.description,
                }),
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
                _count: { select: { members: true } },
            },
        });
        return {
            ...toProjectSummary(project, membership.role),
            createdBy: toPublicUser(project.createdBy),
        };
    }
    async deleteProject(projectId) {
        const existing = await client_1.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!existing) {
            throw utils_1.ApiError.notFound("Project not found");
        }
        await client_1.prisma.project.delete({ where: { id: projectId } });
    }
    async addMember(projectId, input) {
        const targetUser = await client_1.prisma.user.findUnique({
            where: { email: input.email },
        });
        if (!targetUser) {
            throw utils_1.ApiError.notFound("User with this email was not found");
        }
        const existingMembership = await client_1.prisma.projectMember.findUnique({
            where: {
                userId_projectId: {
                    userId: targetUser.id,
                    projectId,
                },
            },
        });
        if (existingMembership) {
            throw utils_1.ApiError.conflict("User is already a member of this project");
        }
        const member = await client_1.prisma.projectMember.create({
            data: {
                userId: targetUser.id,
                projectId,
                role: input.role,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return {
            id: member.id,
            userId: member.userId,
            role: member.role,
            user: toPublicUser(member.user),
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
        };
    }
    async listMembers(projectId) {
        const project = await client_1.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw utils_1.ApiError.notFound("Project not found");
        }
        const members = await client_1.prisma.projectMember.findMany({
            where: { projectId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
            orderBy: [{ role: "asc" }, { createdAt: "asc" }],
        });
        return members.map((member) => ({
            id: member.id,
            userId: member.userId,
            role: member.role,
            user: toPublicUser(member.user),
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
        }));
    }
    async removeMember(projectId, memberId, requesterId) {
        const member = await client_1.prisma.projectMember.findFirst({
            where: { id: memberId, projectId },
        });
        if (!member) {
            throw utils_1.ApiError.notFound("Project member not found");
        }
        if (member.userId === requesterId) {
            throw utils_1.ApiError.badRequest("You cannot remove yourself from the project");
        }
        if (member.role === config_1.PROJECT_ROLES.ADMIN) {
            const adminCount = await client_1.prisma.projectMember.count({
                where: { projectId, role: config_1.PROJECT_ROLES.ADMIN },
            });
            if (adminCount <= 1) {
                throw utils_1.ApiError.badRequest("Cannot remove the only admin from the project");
            }
        }
        await client_1.prisma.projectMember.delete({ where: { id: memberId } });
    }
}
exports.ProjectService = ProjectService;
exports.projectService = new ProjectService();
//# sourceMappingURL=project.service.js.map