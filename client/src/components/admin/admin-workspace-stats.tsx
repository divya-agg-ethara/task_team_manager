"use client";

import { BarChart3, CheckCircle2, Clock, Users } from "lucide-react";
import { useWorkspaceOverview } from "@/hooks/use-workspace-overview";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function AdminWorkspaceStats() {
  const { data } = useWorkspaceOverview();
  const a = data?.analytics;
  if (!a) return null;

  const stats = [
    { label: "Open tasks", value: a.openTasks, icon: Clock },
    { label: "Completed", value: a.completedTasks, icon: CheckCircle2 },
    { label: "Team members", value: a.totalMembers, icon: Users },
    { label: "Projects", value: a.totalProjects, icon: BarChart3 },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className={cn(surfaces.stat, "px-4 py-3.5")}>
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-primary">
              <stat.icon className="size-4" aria-hidden />
            </span>
            <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
                {stat.value}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
