"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useWorkspaceContext } from "@/components/workspace/workspace-provider";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";
import type { ProjectHealthStatus } from "@/lib/workspace/types";

const statusConfig: Record<
  ProjectHealthStatus,
  { label: string; className: string }
> = {
  "on-track": {
    label: "On track",
    className: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/25 dark:text-emerald-400",
  },
  "at-risk": {
    label: "Needs attention",
    className: "bg-amber-500/10 text-amber-800 ring-amber-500/25 dark:text-amber-400",
  },
  quiet: {
    label: "Quiet",
    className: "bg-muted/60 text-muted-foreground ring-border/40",
  },
};

export function OverviewProjectHealth() {
  const { data } = useWorkspaceContext();
  const health = data?.projectHealth.filter((p) => p.openCount + p.doneCount > 0) ?? [];

  if (!data || health.length === 0) return null;

  return (
    <DashboardSection
      label="Projects"
      title="Active project status"
      description="Health across workspaces you're collaborating on."
    >
      <section className="grid gap-3 sm:grid-cols-1">
        {health.slice(0, 6).map((project) => {
          const cfg = statusConfig[project.status];
          return (
            <Link
              key={project.projectId}
              href={`/projects/${project.projectId}`}
              className={cn(
                "group rounded-xl border border-border/45 p-4 transition-all hover:border-[hsl(var(--brand)/0.25)] hover:shadow-md",
                surfaces.card,
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold group-hover:text-primary">
                    {project.projectName}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {project.openCount} open · {project.completionRate}% done
                  </p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-sm font-medium ring-1",
                    cfg.className,
                  )}
                >
                  {cfg.label}
                </span>
                {project.overdueCount > 0 ? (
                  <span className="text-sm text-destructive">
                    {project.overdueCount} overdue
                  </span>
                ) : null}
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/50">
                <div
                  className="h-full rounded-full bg-primary/80 transition-[width] duration-500"
                  style={{ width: `${project.completionRate}%` }}
                />
              </div>
            </Link>
          );
        })}
      </section>
    </DashboardSection>
  );
}
