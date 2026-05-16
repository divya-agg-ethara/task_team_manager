"use client";

import { CalendarCheck, CheckCircle2, FolderKanban, ListTodo, Users } from "lucide-react";
import { useWorkspaceOverview } from "@/hooks/use-workspace-overview";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function MemberWorkspaceSummary() {
  const { data } = useWorkspaceOverview();
  const s = data?.memberStats;
  if (!s) return null;

  const stats = [
    { label: "Assigned open", value: s.assignedOpen, icon: ListTodo },
    { label: "Due today", value: s.dueToday, icon: CalendarCheck },
    { label: "Done this week", value: s.completedThisWeek, icon: CheckCircle2 },
    { label: "My teams", value: s.teamsCount, icon: Users },
    { label: "Projects", value: s.projectsCount, icon: FolderKanban },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <article key={stat.label} className={cn(surfaces.stat, "px-3 py-2.5")}>
          <p className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-primary">
              <stat.icon className="size-3.5" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
              <span className="block text-xl font-semibold tabular-nums">{stat.value}</span>
            </span>
          </p>
        </article>
      ))}
    </section>
  );
}
