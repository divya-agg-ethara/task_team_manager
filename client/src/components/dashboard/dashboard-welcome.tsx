"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  FolderKanban,
  ListTodo,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import { surfaces, typography } from "@/lib/ui/surfaces";
import { isWorkspaceAdmin } from "@/lib/auth/roles";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";

export function DashboardWelcome() {
  const user = useAuthStore((s) => s.user);
  const { data } = useDashboardContext();
  const firstName = user?.name?.split(/\s+/)[0] ?? "there";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const summary = data?.summary;
  const narrative = !data
    ? "Loading your workspace…"
    : summary && summary.activeProjects === 0
      ? "Create a project to start tracking tasks, deadlines, and team workload in one place."
      : summary && summary.dueToday > 0
        ? `You have ${summary.dueToday} task${summary.dueToday === 1 ? "" : "s"} due today${summary.overdue > 0 ? ` and ${summary.overdue} overdue` : ""}. Focus on what moves projects forward.`
        : summary && summary.myOpenTasks > 0
          ? `${summary.myOpenTasks} open task${summary.myOpenTasks === 1 ? "" : "s"} across your projects — ${summary.completedThisWeek} completed this week.`
          : "Your projects are caught up. Review boards or plan the next sprint.";

  const boardHref = data?.focusProjectId
    ? `/projects/${data.focusProjectId}`
    : "/projects";

  return (
    <motion.section
      className={cn(surfaces.hero)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -right-[20%] -top-[40%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.14),transparent_68%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,hsl(var(--foreground)/0.025)_48%,transparent_56%)]" />
      </div>

      <div className="relative flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-9">
        <div className="max-w-xl space-y-4">
          <Badge
            variant="secondary"
            className="w-fit gap-1.5 border border-border/60 bg-background/50 px-2.5 py-1 text-sm font-medium tracking-wide text-muted-foreground backdrop-blur-md"
          >
            <Sparkles className="size-3 text-primary" aria-hidden />
            {isWorkspaceAdmin(user?.role) ? "Admin workspace" : "Your workspace"}
          </Badge>
          <div className="space-y-2">
            <h1 className={cn("text-balance", typography.pageTitle)}>
              {greeting},{" "}
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {firstName}
              </span>
            </h1>
            <p className={cn("text-pretty", typography.body)}>{narrative}</p>
          </div>
          {summary ? (
            <section className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Active projects",
                  value: summary.activeProjects,
                  icon: FolderKanban,
                },
                {
                  label: "My open tasks",
                  value: summary.myOpenTasks,
                  icon: ListTodo,
                },
                {
                  label: "Due today",
                  value: summary.dueToday,
                  icon: CalendarCheck,
                },
                {
                  label: "Done this week",
                  value: summary.completedThisWeek,
                  icon: CheckCircle2,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    surfaces.stat,
                    "flex items-center gap-3 px-3 py-2.5",
                  )}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-primary">
                    <stat.icon className="size-3.5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-xl font-semibold tabular-nums tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button
            asChild
            size="sm"
            className="h-9 gap-1.5 shadow-md shadow-primary/10"
          >
            <Link href={boardHref}>
              <FolderKanban className="size-3.5" />
              Open board
              <ArrowUpRight className="size-3.5 opacity-70" aria-hidden />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="h-9 border-border/60 bg-background/50 backdrop-blur-sm"
          >
            <Link href="/projects?create=1">New project</Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
