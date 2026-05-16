"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWorkspaceOverview } from "@/lib/api/workspace";
import { useAuthReady } from "@/hooks/use-auth-ready";

export const workspaceOverviewKeys = {
  all: ["workspace-overview"] as const,
  detail: () => [...workspaceOverviewKeys.all, "detail"] as const,
};

export function useWorkspaceOverview() {
  const authReady = useAuthReady();

  return useQuery({
    queryKey: workspaceOverviewKeys.detail(),
    queryFn: fetchWorkspaceOverview,
    enabled: authReady,
    staleTime: 30_000,
  });
}
