"use client";

import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { AnalyticsStatStrip } from "@/components/dashboard/analytics-stat-strip";
import { ProductivityOverview } from "@/components/dashboard/productivity-overview";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";
import { QuickActionsPanel } from "@/components/dashboard/quick-actions";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/premium";

export function DashboardHome() {
  return (
    <div className="space-y-8 pb-14">
      <FadeIn>
        <WelcomeBanner />
      </FadeIn>

      <FadeIn delay={0.06}>
        <AnalyticsStatStrip />
      </FadeIn>

      <FadeIn delay={0.1}>
        <ProductivityOverview />
      </FadeIn>

      <Stagger className="grid gap-4 lg:grid-cols-12 lg:items-start">
        <StaggerItem className="lg:col-span-5">
          <ActivityFeed />
        </StaggerItem>
        <StaggerItem className="lg:col-span-4">
          <UpcomingDeadlines />
        </StaggerItem>
        <StaggerItem className="lg:col-span-3">
          <QuickActionsPanel />
        </StaggerItem>
      </Stagger>
    </div>
  );
}
