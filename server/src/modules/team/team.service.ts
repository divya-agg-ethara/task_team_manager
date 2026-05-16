import { prisma } from "../../prisma/client";
import { ApiError } from "../../utils";
import type { TeamDetail, TeamMemberView, TeamSummary } from "./team.types";
import type {
  AddTeamMemberInput,
  CreateTeamInput,
  UpdateTeamInput,
} from "./team.validation";

export class TeamService {
  async listTeams(userId: string, isWorkspaceAdmin: boolean): Promise<TeamSummary[]> {
    const memberships = await prisma.teamMember.findMany({
      where: isWorkspaceAdmin ? undefined : { userId },
      include: {
        team: {
          include: {
            _count: { select: { members: true, projects: true } },
          },
        },
      },
      orderBy: { team: { updatedAt: "desc" } },
    });

    const seen = new Set<string>();
    const teams: TeamSummary[] = [];

    for (const m of memberships) {
      if (seen.has(m.teamId)) continue;
      seen.add(m.teamId);
      teams.push({
        id: m.team.id,
        name: m.team.name,
        description: m.team.description,
        memberCount: m.team._count.members,
        projectCount: m.team._count.projects,
        role: m.role,
        createdAt: m.team.createdAt,
        updatedAt: m.team.updatedAt,
      });
    }

    if (isWorkspaceAdmin) {
      const allTeams = await prisma.team.findMany({
        include: { _count: { select: { members: true, projects: true } } },
        orderBy: { updatedAt: "desc" },
      });
      for (const team of allTeams) {
        if (seen.has(team.id)) continue;
        teams.push({
          id: team.id,
          name: team.name,
          description: team.description,
          memberCount: team._count.members,
          projectCount: team._count.projects,
          role: "ADMIN",
          createdAt: team.createdAt,
          updatedAt: team.updatedAt,
        });
      }
    }

    return teams.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }

  async createTeam(userId: string, input: CreateTeamInput): Promise<TeamDetail> {
    const team = await prisma.team.create({
      data: {
        name: input.name,
        description: input.description ?? null,
        createdById: userId,
        members: {
          create: { userId, role: "ADMIN" },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                performance: { select: { score: true } },
              },
            },
          },
        },
        _count: { select: { members: true, projects: true } },
      },
    });

    return this.toTeamDetail(team, "ADMIN");
  }

  async getTeam(teamId: string, userId: string, isWorkspaceAdmin: boolean): Promise<TeamDetail> {
    await this.assertTeamAccess(teamId, userId, isWorkspaceAdmin);

    const team = await prisma.team.findUniqueOrThrow({
      where: { id: teamId },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                performance: { select: { score: true } },
              },
            },
          },
        },
        _count: { select: { members: true, projects: true } },
      },
    });

    const membership = team.members.find((m) => m.userId === userId);
    const role = isWorkspaceAdmin ? "ADMIN" : membership?.role ?? "MEMBER";

    return this.toTeamDetail(team, role);
  }

  async updateTeam(
    teamId: string,
    userId: string,
    isWorkspaceAdmin: boolean,
    input: UpdateTeamInput,
  ): Promise<TeamDetail> {
    await this.assertTeamAdmin(teamId, userId, isWorkspaceAdmin);

    const team = await prisma.team.update({
      where: { id: teamId },
      data: {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.description !== undefined ? { description: input.description } : {}),
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                performance: { select: { score: true } },
              },
            },
          },
        },
        _count: { select: { members: true, projects: true } },
      },
    });

    return this.toTeamDetail(team, "ADMIN");
  }

  async deleteTeam(
    teamId: string,
    userId: string,
    isWorkspaceAdmin: boolean,
  ): Promise<void> {
    await this.assertTeamAdmin(teamId, userId, isWorkspaceAdmin);
    await prisma.team.delete({ where: { id: teamId } });
  }

  async addMember(
    teamId: string,
    userId: string,
    isWorkspaceAdmin: boolean,
    input: AddTeamMemberInput,
  ): Promise<TeamMemberView> {
    await this.assertTeamAdmin(teamId, userId, isWorkspaceAdmin);

    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) {
      throw ApiError.notFound("No user found with that email");
    }

    const existing = await prisma.teamMember.findUnique({
      where: { teamId_userId: { teamId, userId: user.id } },
    });
    if (existing) {
      throw ApiError.conflict("User is already on this team");
    }

    const member = await prisma.teamMember.create({
      data: {
        teamId,
        userId: user.id,
        role: input.role,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            performance: { select: { score: true } },
          },
        },
      },
    });

    return this.toMemberView(member);
  }

  async removeMember(
    teamId: string,
    actorId: string,
    memberId: string,
    isWorkspaceAdmin: boolean,
  ): Promise<void> {
    await this.assertTeamAdmin(teamId, actorId, isWorkspaceAdmin);

    const member = await prisma.teamMember.findFirst({
      where: { id: memberId, teamId },
    });
    if (!member) {
      throw ApiError.notFound("Team member not found");
    }

    if (member.userId === actorId) {
      throw ApiError.badRequest("You cannot remove yourself from the team");
    }

    const adminCount = await prisma.teamMember.count({
      where: { teamId, role: "ADMIN" },
    });
    if (member.role === "ADMIN" && adminCount <= 1) {
      throw ApiError.badRequest("Cannot remove the last team admin");
    }

    await prisma.teamMember.delete({ where: { id: memberId } });
  }

  private async assertTeamAccess(
    teamId: string,
    userId: string,
    isWorkspaceAdmin: boolean,
  ): Promise<void> {
    if (isWorkspaceAdmin) return;

    const membership = await prisma.teamMember.findUnique({
      where: { teamId_userId: { teamId, userId } },
    });
    if (!membership) {
      throw ApiError.forbidden("You are not a member of this team");
    }
  }

  private async assertTeamAdmin(
    teamId: string,
    userId: string,
    isWorkspaceAdmin: boolean,
  ): Promise<void> {
    if (isWorkspaceAdmin) return;

    const membership = await prisma.teamMember.findUnique({
      where: { teamId_userId: { teamId, userId } },
    });
    if (!membership || membership.role !== "ADMIN") {
      throw ApiError.forbidden("Team admin access required");
    }
  }

  private toMemberView(member: {
    id: string;
    userId: string;
    role: string;
    user: {
      id: string;
      name: string;
      email: string;
      performance: { score: number } | null;
    };
  }): TeamMemberView {
    return {
      id: member.id,
      userId: member.userId,
      name: member.user.name,
      email: member.user.email,
      role: member.role as TeamMemberView["role"],
      performanceScore: member.user.performance?.score ?? null,
    };
  }

  private toTeamDetail(
    team: {
      id: string;
      name: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
      _count: { members: number; projects: number };
      members: Array<{
        id: string;
        userId: string;
        role: string;
        user: {
          id: string;
          name: string;
          email: string;
          performance: { score: number } | null;
        };
      }>;
    },
    role: TeamMemberView["role"],
  ): TeamDetail {
    return {
      id: team.id,
      name: team.name,
      description: team.description,
      memberCount: team._count.members,
      projectCount: team._count.projects,
      role,
      createdAt: team.createdAt,
      updatedAt: team.updatedAt,
      members: team.members.map((m) => this.toMemberView(m)),
    };
  }
}

export const teamService = new TeamService();
