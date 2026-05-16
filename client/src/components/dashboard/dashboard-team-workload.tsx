"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/empty-state";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function DashboardTeamWorkload() {
  const { data } = useDashboardContext();
  const workload = data?.teamWorkload ?? [];
  const maxCount = Math.max(...workload.map((w) => w.openCount), 1);

  return (
    <Card className={cn(surfaces.card, "h-full")}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">
            Team workload
          </CardTitle>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Open tasks by assignee across your projects
          </p>
        </div>
        <span className="rounded-lg border border-border/60 bg-muted/30 p-2 text-muted-foreground">
          <Users className="size-4" aria-hidden />
        </span>
      </CardHeader>
      <CardContent>
        {workload.length === 0 ? (
          <DashboardEmpty
            icon={Users}
            title="No open tasks"
            description="When tasks are assigned across your team, workload distribution appears here."
            className="border-border/40 bg-muted/10 py-8"
          />
        ) : (
          <ul className="space-y-3">
            {workload.map((member, i) => (
              <motion.li
                key={member.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate font-medium text-foreground">
                    {member.name}
                  </span>
                  <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                    {member.openCount} open
                    {member.highPriorityCount > 0
                      ? ` · ${member.highPriorityCount} urgent`
                      : ""}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted/50">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${(member.openCount / maxCount) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
