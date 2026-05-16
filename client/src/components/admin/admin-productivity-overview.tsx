"use client";

import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { useWorkspaceOverview } from "@/hooks/use-workspace-overview";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  IN_REVIEW: "In review",
  DONE: "Done",
  CANCELLED: "Cancelled",
};

export function AdminProductivityOverview() {
  const { data } = useWorkspaceOverview();
  const byStatus = data?.analytics?.tasksByStatus;
  if (!byStatus) return null;

  const entries = Object.entries(byStatus).filter(([, v]) => v > 0);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <DashboardSection
      label="Analytics"
      title="Task distribution"
      description="How work is spread across statuses team-wide."
    >
      <section className={cn(surfaces.card, "space-y-3 p-4")}>
        {entries.map(([status, count]) => (
          <article key={status}>
            <p className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-foreground">
                {STATUS_LABELS[status] ?? status}
              </span>
              <span className="tabular-nums text-muted-foreground">{count}</span>
            </p>
            <span className="block h-2 overflow-hidden rounded-full bg-muted/50">
              <span
                className="block h-full rounded-full bg-primary/75 transition-[width] duration-500"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </span>
          </article>
        ))}
      </section>
    </DashboardSection>
  );
}
