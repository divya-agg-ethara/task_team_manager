"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { useWorkspaceOverview } from "@/hooks/use-workspace-overview";
import { updateMemberPerformance } from "@/lib/api/workspace";
import { workspaceOverviewKeys } from "@/hooks/use-workspace-overview";
import { useQueryClient } from "@tanstack/react-query";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function AdminMemberWorkload() {
  const { data } = useWorkspaceOverview();
  const queryClient = useQueryClient();
  const members = data?.analytics?.memberWorkload ?? [];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [score, setScore] = useState(70);
  const [saving, setSaving] = useState(false);

  if (members.length === 0) return null;

  async function saveScore(userId: string) {
    setSaving(true);
    try {
      await updateMemberPerformance(userId, { score });
      toast.success("Performance score updated");
      setEditingId(null);
      await queryClient.invalidateQueries({ queryKey: workspaceOverviewKeys.all });
    } catch {
      toast.error("Could not update score");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardSection
      label="Team"
      title="Member workload & performance"
      description="Review open work and update performance scores."
    >
      <section className={cn(surfaces.card, "overflow-hidden")}>
        <ul className="divide-y divide-border/50">
          {members.map((m) => (
            <li
              key={m.userId}
              className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <article className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.email}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {m.openTasks} open · {m.completedTasks} done
                  {m.overdueTasks > 0 ? (
                    <span className="text-destructive"> · {m.overdueTasks} overdue</span>
                  ) : null}
                </p>
              </article>
              <article className="flex items-center gap-2">
                {editingId === m.userId ? (
                  <>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={score}
                      onChange={(e) => setScore(Number(e.target.value))}
                      className="h-8 w-16"
                    />
                    <Button
                      size="sm"
                      className="h-8"
                      disabled={saving}
                      onClick={() => saveScore(m.userId)}
                    >
                      {saving ? <Loader2 className="size-3.5 animate-spin" /> : "Save"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="rounded-lg bg-muted/40 px-2.5 py-1 text-sm font-semibold tabular-nums">
                      {m.performanceScore ?? "—"}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8"
                      onClick={() => {
                        setEditingId(m.userId);
                        setScore(m.performanceScore ?? 70);
                      }}
                    >
                      Edit score
                    </Button>
                  </>
                )}
              </article>
            </li>
          ))}
        </ul>
      </section>
    </DashboardSection>
  );
}
