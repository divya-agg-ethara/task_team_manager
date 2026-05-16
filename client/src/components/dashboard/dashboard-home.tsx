"use client";

import { AdminDashboardHome } from "@/components/admin/admin-dashboard-home";
import { MemberDashboardHome } from "@/components/member/member-dashboard-home";
import { DashboardHomeSkeleton } from "@/components/dashboard/dashboard-home-skeleton";
import { DashboardProvider, useDashboardContext } from "@/components/dashboard/dashboard-context";
import { QueryErrorState } from "@/components/shared/query-error-state";
import { isWorkspaceAdmin } from "@/lib/auth/roles";
import { useAuthStore } from "@/stores/auth-store";

function OverviewContent() {
  const { isLoading, isError, error, refetch, isFetching } = useDashboardContext();
  const role = useAuthStore((s) => s.user?.role);

  if (isLoading) {
    return <DashboardHomeSkeleton />;
  }

  if (isError) {
    return (
      <QueryErrorState
        title="Couldn't load overview"
        error={error}
        onRetry={refetch}
        isRetrying={isFetching}
      />
    );
  }

  return isWorkspaceAdmin(role) ? <AdminDashboardHome /> : <MemberDashboardHome />;
}

export function DashboardHome() {
  return (
    <DashboardProvider>
      <OverviewContent />
    </DashboardProvider>
  );
}
