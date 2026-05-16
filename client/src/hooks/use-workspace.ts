"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardRaw } from "@/lib/dashboard/fetch-dashboard";
import { buildWorkspaceViewModel } from "@/lib/workspace/aggregates";
import { workspaceKeys } from "@/lib/workspace/query-keys";
import { useAuthReady } from "@/hooks/use-auth-ready";
import { useAuthStore } from "@/stores/auth-store";

export function useWorkspace() {
  const authReady = useAuthReady();
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: workspaceKeys.data(),
    queryFn: async () => {
      const { projects, tasks } = await fetchDashboardRaw();
      return buildWorkspaceViewModel(projects, tasks, userId ?? "");
    },
    enabled: authReady,
    staleTime: 30_000,
  });
}
