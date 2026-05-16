"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gauge, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function DashboardPersonalSummary() {
  const { data } = useDashboardContext();
  const summary = data?.summary;
  const completionRate =
    summary && summary.myOpenTasks + summary.completedThisWeek > 0
      ? Math.round(
          (summary.completedThisWeek /
            (summary.myOpenTasks + summary.completedThisWeek)) *
            100,
        )
      : 0;

  const insights = [
    {
      label: "Open tasks you own",
      value: summary?.myOpenTasks ?? 0,
    },
    {
      label: "In progress (all)",
      value: summary?.inProgress ?? 0,
    },
    {
      label: "Completed this week",
      value: summary?.completedThisWeek ?? 0,
    },
  ];

  return (
    <Card className={cn(surfaces.card, "h-full")}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight">
              Personal summary
            </CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Your workload snapshot across every project
            </p>
          </div>
          <span className="rounded-lg border border-border/60 bg-muted/30 p-2 text-muted-foreground">
            <Gauge className="size-4" aria-hidden />
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="rounded-xl border border-border/40 bg-gradient-to-br from-primary/8 via-transparent to-muted/20 p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Weekly completion
              </p>
              <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">
                {completionRate}%
              </p>
            </div>
            <Target className="size-8 text-primary/40" aria-hidden />
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted/50">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        <ul className="space-y-2.5">
          {insights.map((row) => (
            <li
              key={row.label}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <span className="text-muted-foreground">{row.label}</span>
              <span className="font-semibold tabular-nums text-foreground">
                {row.value}
              </span>
            </li>
          ))}
        </ul>

        <Button asChild size="sm" className="w-full">
          <Link href={data?.focusProjectId ? `/projects/${data.focusProjectId}` : "/projects"}>
            Continue on board
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
