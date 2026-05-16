"use client";

import { RoleGuard } from "@/components/auth/role-guard";
import { AdminMemberWorkload } from "@/components/admin/admin-member-workload";
import { AdminProductivityOverview } from "@/components/admin/admin-productivity-overview";
import { AdminWorkspaceStats } from "@/components/admin/admin-workspace-stats";
import { FadeIn } from "@/components/motion/premium";
import { typography } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

function AnalyticsContent() {
  return (
    <section className="space-y-9 pb-4">
      <FadeIn>
        <header className="space-y-2">
          <p className={typography.sectionLabel}>Admin</p>
          <h1 className={typography.pageTitle}>Team analytics</h1>
          <p className={cn("max-w-xl", typography.body)}>
            Productivity, workload, and task distribution across your organization.
          </p>
        </header>
      </FadeIn>
      <FadeIn delay={0.05}>
        <AdminWorkspaceStats />
      </FadeIn>
      <FadeIn delay={0.08}>
        <section className="grid gap-8 lg:grid-cols-2">
          <AdminProductivityOverview />
          <AdminMemberWorkload />
        </section>
      </FadeIn>
    </section>
  );
}

export function AdminAnalyticsPage() {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <AnalyticsContent />
    </RoleGuard>
  );
}
