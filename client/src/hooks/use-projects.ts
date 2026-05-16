"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addProjectMember,
  createProject,
  fetchProject,
  fetchProjectMembers,
  fetchProjects,
  removeProjectMember,
  ProjectsApiError,
} from "@/lib/api/projects";
import { useAuthReady } from "@/hooks/use-auth-ready";
import { dashboardKeys } from "@/lib/dashboard/query-keys";
import { workspaceKeys } from "@/lib/workspace/query-keys";
import { projectKeys } from "@/lib/projects/query-keys";
import type { ProjectRole } from "@/types/project";

export function useProjectsList() {
  const authReady = useAuthReady();

  return useQuery({
    queryKey: projectKeys.list(),
    queryFn: fetchProjects,
    enabled: authReady,
  });
}

export function useProject(projectId: string) {
  const authReady = useAuthReady();

  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => fetchProject(projectId),
    enabled: authReady && Boolean(projectId),
  });
}

export function useProjectMembers(projectId: string) {
  const authReady = useAuthReady();

  return useQuery({
    queryKey: projectKeys.members(projectId),
    queryFn: () => fetchProjectMembers(projectId),
    enabled: authReady && Boolean(projectId),
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.list() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
      queryClient.setQueryData(projectKeys.detail(project.id), project);
    },
  });
}

export function useAddProjectMember(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { email: string; role?: ProjectRole }) =>
      addProjectMember(projectId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.members(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.list() });
    },
  });
}

export function useRemoveProjectMember(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => removeProjectMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.members(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });
      queryClient.invalidateQueries({ queryKey: projectKeys.list() });
    },
  });
}

export { ProjectsApiError };
