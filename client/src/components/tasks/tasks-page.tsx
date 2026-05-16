"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckSquare } from "lucide-react";
import { WorkspaceProvider, useWorkspaceContext } from "@/components/workspace/workspace-provider";
import { QueryErrorState } from "@/components/shared/query-error-state";
import { DashboardTaskRow } from "@/components/dashboard/dashboard-task-row";
import { DashboardEmpty } from "@/components/dashboard/empty-state";
import { FadeIn } from "@/components/motion/premium";
import { surfaces, typography } from "@/lib/ui/surfaces";
import type { TaskListFilter } from "@/lib/workspace/types";
import { cn } from "@/lib/utils";

const filters: { id: TaskListFilter; label: string }[] = [
  { id: "assigned", label: "Assigned to me" },
  { id: "today", label: "Due today" },
  { id: "upcoming", label: "Upcoming" },
  { id: "priority", label: "Priority" },
  { id: "all", label: "All open" },
  { id: "done", label: "Completed" },
];

function TasksContent() {
  const { data, isLoading, isError, error, refetch, isFetching } = useWorkspaceContext();
  const [filter, setFilter] = useState<TaskListFilter>("assigned");

  const list = useMemo(() => {
    if (!data) return [];
    switch (filter) {
      case "assigned":
        return data.assignedToMe;
      case "today":
        return data.dueTodayTasks;
      case "upcoming":
        return data.upcomingTasks;
      case "priority":
        return data.priorityTasks;
      case "done":
        return data.completedTasks;
      case "all":
      default:
        return data.myTasks;
    }
  }, [data, filter]);

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-muted/30" />;
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Couldn't load tasks"
        error={error}
        onRetry={refetch}
        isRetrying={isFetching}
      />
    );
  }

  return (
    <div className="space-y-8 pb-14">
      <FadeIn>
        <header className={cn(surfaces.hero, "px-6 py-8 sm:px-9")}>
          <p className={typography.sectionLabel}>Execution</p>
          <h1 className={cn("mt-2", typography.pageTitle)}>Tasks</h1>
          <p className={cn("mt-3 max-w-2xl", typography.body)}>
            Your personal command center — filter by assignment, due dates, and priority
            across every project.
          </p>
        </header>
      </FadeIn>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
              filter === f.id
                ? "border-primary/40 bg-primary/10 text-primary ring-1 ring-primary/20"
                : "border-border/50 bg-card/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
            {data && f.id === "assigned" ? (
              <span className="ml-1.5 tabular-nums opacity-70">
                ({data.assignedToMe.length})
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <section className={cn(surfaces.card, "p-5 sm:p-6")}>
        {list.length === 0 ? (
          <DashboardEmpty
            icon={CheckSquare}
            title="Nothing here"
            description={
              filter === "done"
                ? "Completed tasks will appear as you finish work on boards."
                : "Create tasks in a project board or ask to be assigned work."
            }
            className="border-0 bg-transparent py-10"
          />
        ) : (
          <ul className="space-y-2">
            {list.map((task, i) => (
              <li key={task.id}>
                <DashboardTaskRow task={task} index={i} />
              </li>
            ))}
          </ul>
        )}
        {data?.focusProjectId ? (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link href={`/projects/${data.focusProjectId}`} className="font-medium text-primary hover:underline">
              Open project board
            </Link>
            {" "}to create or move tasks
          </p>
        ) : null}
      </section>
    </div>
  );
}

export function TasksPage() {
  return (
    <WorkspaceProvider>
      <TasksContent />
    </WorkspaceProvider>
  );
}
