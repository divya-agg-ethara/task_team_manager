"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/empty-state";
import { TaskPriorityIndicator } from "@/components/tasks/task-priority-indicator";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import type { DashboardDeadline } from "@/lib/dashboard/types";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function DashboardUpcomingDeadlines() {
  const { data } = useDashboardContext();
  const items = data?.upcomingDeadlines ?? [];

  return (
    <Card className={cn(surfaces.card)}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">
            Upcoming deadlines
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Due dates in the next two weeks across projects
          </p>
        </div>
        <span className="rounded-lg border border-border/60 bg-muted/30 p-2 text-muted-foreground">
          <CalendarClock className="size-4" aria-hidden />
        </span>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <DashboardEmpty
            icon={CalendarClock}
            title="No deadlines scheduled"
            description="Add due dates on task cards in your project boards to track what's coming up."
            className="border-border/40 bg-muted/10 py-8"
          />
        ) : (
          <ul className="space-y-2">
            {items.map((item, i) => (
              <DeadlineRow key={item.id} item={item} index={i} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function DeadlineRow({ item, index }: { item: DashboardDeadline; index: number }) {
  const due = new Date(item.dueDate);
  const dueDisplay = due.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
    >
      <Link
        href={`/projects/${item.projectId}`}
        className={cn(
          "flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-muted/15 px-3 py-2.5 transition-colors hover:border-border/70 hover:bg-muted/25",
          item.urgent && "border-destructive/25 bg-destructive/5",
        )}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
          <p className="text-[11px] text-muted-foreground">{item.projectName}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-lg bg-background/70 px-2 py-1 text-[11px] font-medium tabular-nums text-muted-foreground ring-1 ring-border/40">
            {dueDisplay}
          </span>
          <TaskPriorityIndicator priority={item.priority} showLabel />
        </div>
      </Link>
    </motion.li>
  );
}
