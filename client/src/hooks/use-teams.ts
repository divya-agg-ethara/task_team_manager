"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTeamMember,
  createTeam,
  deleteTeam,
  fetchTeam,
  fetchTeams,
  removeTeamMember,
  updateTeam,
  TeamsApiError,
} from "@/lib/api/teams";
import { useAuthReady } from "@/hooks/use-auth-ready";
import { workspaceOverviewKeys } from "@/hooks/use-workspace-overview";

export const teamKeys = {
  all: ["teams"] as const,
  list: () => [...teamKeys.all, "list"] as const,
  detail: (id: string) => [...teamKeys.all, "detail", id] as const,
};

export function useTeamsList() {
  const authReady = useAuthReady();

  return useQuery({
    queryKey: teamKeys.list(),
    queryFn: fetchTeams,
    enabled: authReady,
  });
}

export function useTeam(teamId: string) {
  const authReady = useAuthReady();

  return useQuery({
    queryKey: teamKeys.detail(teamId),
    queryFn: () => fetchTeam(teamId),
    enabled: authReady && Boolean(teamId),
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
      queryClient.invalidateQueries({ queryKey: workspaceOverviewKeys.all });
    },
  });
}

export function useUpdateTeam(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name?: string; description?: string | null }) =>
      updateTeam(teamId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
      queryClient.invalidateQueries({ queryKey: workspaceOverviewKeys.all });
    },
  });
}

export function useAddTeamMember(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { email: string; role?: "ADMIN" | "MEMBER" }) =>
      addTeamMember(teamId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.list() });
    },
  });
}

export function useRemoveTeamMember(teamId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) => removeTeamMember(teamId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) });
      queryClient.invalidateQueries({ queryKey: teamKeys.list() });
    },
  });
}

export { TeamsApiError };
