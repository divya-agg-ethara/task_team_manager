"use client";

import { useQuery } from "@tanstack/react-query";
import { buildDashboardViewModel } from "@/lib/dashboard/aggregates";
import { fetchDashboardRaw } from "@/lib/dashboard/fetch-dashboard";
import { dashboardKeys } from "@/lib/dashboard/query-keys";
import { useAuthStore } from "@/stores/auth-store";

export function useDashboard() {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: dashboardKeys.overview(),
    queryFn: async () => {
      const { projects, tasks } = await fetchDashboardRaw();
      if (!userId) {
        return buildDashboardViewModel(projects, tasks, "");
      }
      return buildDashboardViewModel(projects, tasks, userId);
    },
    enabled: Boolean(userId),
    staleTime: 30_000,
  });
}
