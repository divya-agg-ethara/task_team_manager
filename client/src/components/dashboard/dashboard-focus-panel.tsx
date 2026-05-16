"use client";

import Link from "next/link";
import { CalendarClock, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/empty-state";
import { DashboardTaskRow } from "@/components/dashboard/dashboard-task-row";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import type { EnrichedTask } from "@/lib/dashboard/types";
import { surfaces, typography } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function DashboardFocusPanel() {
  const { data } = useDashboardContext();
  const dueToday = data?.dueTodayTasks ?? [];
  const priority = data?.priorityTasks ?? [];
  const boardHref = data?.focusProjectId
    ? `/projects/${data.focusProjectId}`
    : "/projects";

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <FocusCard
        title="Due today"
        subtitle="Tasks that need attention before end of day"
        icon={CalendarClock}
        emptyTitle="Nothing due today"
        emptyDescription="You're clear for today. Pick up a priority task or plan ahead on a board."
        tasks={dueToday}
        actionHref={boardHref}
        actionLabel="Open board"
      />
      <FocusCard
        title="Priority tasks"
        subtitle="High and urgent items assigned to you"
        icon={Flag}
        emptyTitle="No urgent work"
        emptyDescription="When high-priority tasks are assigned to you, they'll surface here first."
        tasks={priority}
        actionHref={boardHref}
        actionLabel="View tasks"
      />
    </div>
  );
}

function FocusCard({
  title,
  subtitle,
  icon: Icon,
  emptyTitle,
  emptyDescription,
  tasks,
  actionHref,
  actionLabel,
}: {
  title: string;
  subtitle: string;
  icon: typeof CalendarClock;
  emptyTitle: string;
  emptyDescription: string;
  tasks: EnrichedTask[];
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <Card className={cn(surfaces.card)}>
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div>
          <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
          <p className={cn("mt-0.5", typography.caption)}>{subtitle}</p>
        </div>
        <span className="rounded-lg border border-border/60 bg-muted/30 p-2 text-muted-foreground">
          <Icon className="size-4" aria-hidden />
        </span>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.length === 0 ? (
          <DashboardEmpty
            icon={Icon}
            title={emptyTitle}
            description={emptyDescription}
            className="border-border/40 bg-muted/10 py-8"
          />
        ) : (
          <>
            {tasks.slice(0, 5).map((task, i) => (
              <DashboardTaskRow key={task.id} task={task} index={i} />
            ))}
            <Button variant="ghost" size="sm" asChild className="mt-1 w-full text-muted-foreground">
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
