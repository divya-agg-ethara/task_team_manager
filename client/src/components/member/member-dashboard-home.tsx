"use client";

import { DashboardActiveProjects } from "@/components/dashboard/dashboard-active-projects";
import { DashboardFocusPanel } from "@/components/dashboard/dashboard-focus-panel";
import { DashboardWelcome } from "@/components/dashboard/dashboard-welcome";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { OverviewProjectHealth } from "@/components/overview/overview-project-health";
import { MemberWorkspaceSummary } from "@/components/member/member-workspace-summary";
import { FadeIn } from "@/components/motion/premium";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";

export function MemberDashboardHome() {
  const { data } = useDashboardContext();
  const hasProjectHealth =
    (data?.projectHealth?.filter((p) => p.openCount + p.doneCount > 0).length ?? 0) > 0;

  return (
    <section className="space-y-9 pb-4">
      <FadeIn>
        <DashboardWelcome />
      </FadeIn>

      <FadeIn delay={0.04}>
        <MemberWorkspaceSummary />
      </FadeIn>

      <FadeIn delay={0.06}>
        <DashboardSection
          label="Focus"
          title="Your tasks today"
          description="Assigned work and priorities that need your attention."
        >
          <DashboardFocusPanel />
        </DashboardSection>
      </FadeIn>

      <FadeIn delay={0.08}>
        {hasProjectHealth ? (
          <section className="grid gap-8 xl:grid-cols-5 xl:items-start xl:gap-10">
            <section className="min-w-0 xl:col-span-3">
              <DashboardActiveProjects compact />
            </section>
            <section className="min-w-0 xl:col-span-2">
              <OverviewProjectHealth />
            </section>
          </section>
        ) : (
          <DashboardActiveProjects />
        )}
      </FadeIn>
    </section>
  );
}
