import { prisma } from "../../prisma/client";
import { ApiError } from "../../utils";
import type { AdminAnalytics, MemberWorkload, WorkspaceOverview } from "./workspace.types";
import type { UpdatePerformanceInput } from "./workspace.validation";

const OPEN_STATUSES = ["TODO", "IN_PROGRESS", "IN_REVIEW"] as const;

export class WorkspaceService {
  async getOverview(userId: string, role: "ADMIN" | "MEMBER"): Promise<WorkspaceOverview> {
    if (role === "ADMIN") {
      return {
        role,
        analytics: await this.getAdminAnalytics(),
      };
    }

    return {
      role,
      memberStats: await this.getMemberStats(userId),
    };
  }

  async getAdminAnalytics(): Promise<AdminAnalytics> {
    const [teams, projects, users, tasks] = await Promise.all([
      prisma.team.count(),
      prisma.project.count(),
      prisma.user.count({ where: { role: "MEMBER" } }),
      prisma.task.findMany({
        select: {
          status: true,
          priority: true,
          dueDate: true,
          assignedToId: true,
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
              performance: { select: { score: true } },
            },
          },
        },
      }),
    ]);

    const tasksByStatus: Record<string, number> = {};
    const tasksByPriority: Record<string, number> = {};
    let openTasks = 0;
    let completedTasks = 0;
    let overdueTasks = 0;
    let pendingReview = 0;
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const workloadMap = new Map<string, MemberWorkload>();

    for (const task of tasks) {
      tasksByStatus[task.status] = (tasksByStatus[task.status] ?? 0) + 1;
      tasksByPriority[task.priority] = (tasksByPriority[task.priority] ?? 0) + 1;

      if (task.status === "DONE") {
        completedTasks += 1;
      } else {
        openTasks += 1;
        if (task.status === "IN_REVIEW") pendingReview += 1;
        if (task.dueDate && task.dueDate < now) overdueTasks += 1;
      }

      if (task.assignedTo) {
        const u = task.assignedTo;
        const existing = workloadMap.get(u.id) ?? {
          userId: u.id,
          name: u.name,
          email: u.email,
          openTasks: 0,
          completedTasks: 0,
          overdueTasks: 0,
          performanceScore: u.performance?.score ?? null,
        };
        if (task.status === "DONE") {
          existing.completedTasks += 1;
        } else {
          existing.openTasks += 1;
          if (task.dueDate && task.dueDate < now) existing.overdueTasks += 1;
        }
        workloadMap.set(u.id, existing);
      }
    }

    const members = await prisma.user.findMany({
      where: { role: "MEMBER" },
      select: {
        id: true,
        name: true,
        email: true,
        performance: { select: { score: true } },
      },
    });

    for (const m of members) {
      if (!workloadMap.has(m.id)) {
        workloadMap.set(m.id, {
          userId: m.id,
          name: m.name,
          email: m.email,
          openTasks: 0,
          completedTasks: 0,
          overdueTasks: 0,
          performanceScore: m.performance?.score ?? null,
        });
      }
    }

    void weekAgo;

    return {
      totalTeams: teams,
      totalProjects: projects,
      totalMembers: users,
      openTasks,
      completedTasks,
      overdueTasks,
      pendingReview,
      memberWorkload: [...workloadMap.values()].sort(
        (a, b) => b.openTasks - a.openTasks,
      ),
      tasksByStatus,
      tasksByPriority,
    };
  }

  async getMemberStats(userId: string) {
    const [teamsCount, projectsCount, tasks] = await Promise.all([
      prisma.teamMember.count({ where: { userId } }),
      prisma.projectMember.count({ where: { userId } }),
      prisma.task.findMany({
        where: { assignedToId: userId },
        select: { status: true, dueDate: true, updatedAt: true },
      }),
    ]);

    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    let assignedOpen = 0;
    let dueToday = 0;
    let overdue = 0;
    let completedThisWeek = 0;

    for (const task of tasks) {
      if (OPEN_STATUSES.includes(task.status as (typeof OPEN_STATUSES)[number])) {
        assignedOpen += 1;
        if (task.dueDate) {
          const due = new Date(task.dueDate);
          if (due >= startOfDay && due <= endOfDay) dueToday += 1;
          if (due < startOfDay) overdue += 1;
        }
      }
      if (
        task.status === "DONE" &&
        new Date(task.updatedAt).getTime() >= weekAgo.getTime()
      ) {
        completedThisWeek += 1;
      }
    }

    return {
      assignedOpen,
      dueToday,
      overdue,
      completedThisWeek,
      teamsCount,
      projectsCount,
    };
  }

  async updatePerformance(
    adminId: string,
    targetUserId: string,
    input: UpdatePerformanceInput,
  ) {
    const target = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!target) {
      throw ApiError.notFound("User not found");
    }

    const record = await prisma.memberPerformance.upsert({
      where: { userId: targetUserId },
      create: {
        userId: targetUserId,
        score: input.score,
        note: input.note ?? null,
        updatedById: adminId,
      },
      update: {
        score: input.score,
        note: input.note ?? null,
        updatedById: adminId,
      },
    });

    return record;
  }
}

export const workspaceService = new WorkspaceService();
