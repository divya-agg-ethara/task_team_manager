import { PROJECT_ROLES, type ProjectRole } from "../../config";
import type { User } from "../../generated/prisma/client";
import { prisma } from "../../prisma/client";
import type { PublicUser } from "../../types/user";
import { ApiError } from "../../utils";
import type {
  ProjectDetail,
  ProjectMemberView,
  ProjectSummary,
} from "./project.types";
import type {
  AddMemberInput,
  CreateProjectInput,
  UpdateProjectInput,
} from "./project.validation";

function toPublicUser(
  user: Pick<User, "id" | "email" | "name" | "role" | "createdAt" | "updatedAt">,
): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as PublicUser["role"],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function toProjectSummary(
  project: {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: { members: number };
  },
  role: ProjectRole,
): ProjectSummary {
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

export class ProjectService {
  async createProject(
    userId: string,
    input: CreateProjectInput,
  ): Promise<ProjectDetail> {
    const project = await prisma.$transaction(async (tx) => {
      const created = await tx.project.create({
        data: {
          name: input.name,
          description: input.description ?? null,
          createdById: userId,
          members: {
            create: {
              userId,
              role: PROJECT_ROLES.ADMIN,
            },
          },
        },
        include: {
          createdBy: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
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
      ...toProjectSummary(project, PROJECT_ROLES.ADMIN),
      createdBy: toPublicUser(project.createdBy),
    };
  }

  async listUserProjects(userId: string): Promise<ProjectSummary[]> {
    const memberships = await prisma.projectMember.findMany({
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

    return memberships.map((membership) =>
      toProjectSummary(membership.project, membership.role as ProjectRole),
    );
  }

  async getProjectById(
    userId: string,
    projectId: string,
  ): Promise<ProjectDetail> {
    const membership = await prisma.projectMember.findUnique({
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
                role: true,
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
      throw ApiError.forbidden("You are not a member of this project");
    }

    return {
      ...toProjectSummary(
        membership.project,
        membership.role as ProjectRole,
      ),
      createdBy: toPublicUser(membership.project.createdBy),
    };
  }

  async updateProject(
    userId: string,
    projectId: string,
    input: UpdateProjectInput,
  ): Promise<ProjectDetail> {
    const membership = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: { userId, projectId },
      },
    });

    if (!membership) {
      throw ApiError.forbidden("You are not a member of this project");
    }

    const project = await prisma.project.update({
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
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        _count: { select: { members: true } },
      },
    });

    return {
      ...toProjectSummary(project, membership.role as ProjectRole),
      createdBy: toPublicUser(project.createdBy),
    };
  }

  async deleteProject(projectId: string): Promise<void> {
    const existing = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existing) {
      throw ApiError.notFound("Project not found");
    }

    await prisma.project.delete({ where: { id: projectId } });
  }

  async addMember(
    projectId: string,
    input: AddMemberInput,
  ): Promise<ProjectMemberView> {
    const targetUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!targetUser) {
      throw ApiError.notFound("User with this email was not found");
    }

    const existingMembership = await prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId: targetUser.id,
          projectId,
        },
      },
    });

    if (existingMembership) {
      throw ApiError.conflict("User is already a member of this project");
    }

    const member = await prisma.projectMember.create({
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
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return {
      id: member.id,
      userId: member.userId,
      role: member.role as ProjectRole,
      user: toPublicUser(member.user),
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    };
  }

  async listMembers(projectId: string): Promise<ProjectMemberView[]> {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw ApiError.notFound("Project not found");
    }

    const members = await prisma.projectMember.findMany({
      where: { projectId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
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
      role: member.role as ProjectRole,
      user: toPublicUser(member.user),
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
    }));
  }

  async removeMember(
    projectId: string,
    memberId: string,
    requesterId: string,
  ): Promise<void> {
    const member = await prisma.projectMember.findFirst({
      where: { id: memberId, projectId },
    });

    if (!member) {
      throw ApiError.notFound("Project member not found");
    }

    if (member.userId === requesterId) {
      throw ApiError.badRequest("You cannot remove yourself from the project");
    }

    if (member.role === PROJECT_ROLES.ADMIN) {
      const adminCount = await prisma.projectMember.count({
        where: { projectId, role: PROJECT_ROLES.ADMIN },
      });

      if (adminCount <= 1) {
        throw ApiError.badRequest(
          "Cannot remove the only admin from the project",
        );
      }
    }

    await prisma.projectMember.delete({ where: { id: memberId } });
  }
}

export const projectService = new ProjectService();
