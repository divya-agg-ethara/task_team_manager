"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  FolderKanban,
  ListTodo,
} from "lucide-react";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

function statHint(
  key: "activeProjects" | "myOpenTasks" | "dueToday" | "completedThisWeek",
  data: NonNullable<ReturnType<typeof useDashboardContext>["data"]>,
): string {
  switch (key) {
    case "activeProjects":
      return `${data.projects.length} workspace${data.projects.length === 1 ? "" : "s"}`;
    case "myOpenTasks":
      return data.summary.inProgress > 0
        ? `${data.summary.inProgress} in progress team-wide`
        : "Assigned or created by you";
    case "dueToday":
      return data.summary.overdue > 0
        ? `${data.summary.overdue} overdue company-wide`
        : "Across all projects";
    case "completedThisWeek":
      return "Completed in the last 7 days";
  }
}

const stats = [
  { key: "activeProjects" as const, label: "Active projects", icon: FolderKanban },
  { key: "myOpenTasks" as const, label: "My open tasks", icon: ListTodo },
  { key: "dueToday" as const, label: "Due today", icon: CalendarCheck },
  { key: "completedThisWeek" as const, label: "Done this week", icon: CheckCircle2 },
];

export function DashboardSummaryStrip() {
  const { data } = useDashboardContext();
  const summary = data?.summary;

  return (
    <motion.div
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {stats.map((stat) => {
        const value = summary ? String(summary[stat.key]) : "—";
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.key}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            whileHover={{ y: -2 }}
            className={cn("group relative overflow-hidden p-4", surfaces.card, surfaces.cardInteractive)}
          >
            <div
              className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-primary/[0.06] blur-2xl transition-opacity group-hover:opacity-100"
              aria-hidden
            />
            <div className="relative flex items-start justify-between gap-3">
              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                  {value}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {data ? statHint(stat.key, data) : "Loading…"}
                </p>
              </div>
              <span className="rounded-lg border border-border/50 bg-muted/30 p-2 text-muted-foreground transition-colors group-hover:text-primary">
                <Icon className="size-4" aria-hidden />
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
