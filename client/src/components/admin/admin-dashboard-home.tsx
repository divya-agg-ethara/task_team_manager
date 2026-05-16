"use client";

import { DashboardActiveProjects } from "@/components/dashboard/dashboard-active-projects";
import { DashboardFocusPanel } from "@/components/dashboard/dashboard-focus-panel";
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { OverviewProjectHealth } from "@/components/overview/overview-project-health";
import { AdminWorkspaceStats } from "@/components/admin/admin-workspace-stats";
import { AdminMemberWorkload } from "@/components/admin/admin-member-workload";
import { AdminProductivityOverview } from "@/components/admin/admin-productivity-overview";
import { FadeIn } from "@/components/motion/premium";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
export function AdminDashboardHome() {
  const { data } = useDashboardContext();
  const hasProjectHealth =
    (data?.projectHealth?.filter((p) => p.openCount + p.doneCount > 0).length ?? 0) > 0;

  return (
    <section className="space-y-9 pb-4">
      <FadeIn>
        <DashboardWelcome />
      </FadeIn>

      <FadeIn delay={0.04}>
        <AdminWorkspaceStats />
      </FadeIn>

      <FadeIn delay={0.06}>
        <DashboardSection
          label="Focus"
          title="Today & priorities"
          description="What needs attention across the workspace."
        >
          <DashboardFocusPanel />
        </DashboardSection>
      </FadeIn>

      <FadeIn delay={0.08}>
        <section className="grid gap-8 xl:grid-cols-5 xl:items-start xl:gap-10">
          <section className="min-w-0 space-y-8 xl:col-span-3">
            {hasProjectHealth ? (
              <DashboardActiveProjects compact />
            ) : (
              <DashboardActiveProjects />
            )}
            <AdminMemberWorkload />
          </section>
          <section className="min-w-0 space-y-8 xl:col-span-2">
            {hasProjectHealth ? <OverviewProjectHealth /> : null}
            <AdminProductivityOverview />
          </section>
        </section>
      </FadeIn>
    </section>
  );
}
