import { apiClient } from "@/lib/api/client";
import type {
  ProjectDetail,
  ProjectMember,
  ProjectRole,
  ProjectSummary,
} from "@/types/project";

type ApiErrorBody = {
  success?: boolean;
  message?: string;
  details?: unknown;
};

export class ProjectsApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ProjectsApiError";
  }
}

function getErrorMessage(
  data: ApiErrorBody | undefined,
  fallback: string,
): string {
  return data?.message ?? fallback;
}

function throwOnError(
  status: number,
  data: ApiErrorBody | undefined,
  fallback: string,
): void {
  if (status >= 200 && status < 300) return;
  throw new ProjectsApiError(getErrorMessage(data, fallback), status, data?.details);
}

export async function fetchProjects(): Promise<ProjectSummary[]> {
  const res = await apiClient.get<{
    success: true;
    data: { projects: ProjectSummary[] };
  }>("/projects");

  throwOnError(res.status, res.data, "Could not load projects.");
  if (res.data?.success && res.data.data?.projects) {
    return res.data.data.projects;
  }
  return [];
}

export async function fetchProject(projectId: string): Promise<ProjectDetail> {
  const res = await apiClient.get<{
    success: true;
    data: { project: ProjectDetail };
  }>(`/projects/${projectId}`);

  throwOnError(res.status, res.data, "Could not load project.");
  if (res.data?.success && res.data.data?.project) {
    return res.data.data.project;
  }
  throw new ProjectsApiError("Project not found.", res.status);
}

export async function createProject(input: {
  name: string;
  description?: string;
}): Promise<ProjectDetail> {
  const res = await apiClient.post<{
    success: true;
    data: { project: ProjectDetail };
  }>("/projects", input);

  throwOnError(res.status, res.data, "Could not create project.");
  if ((res.status === 201 || res.status === 200) && res.data?.success && res.data.data?.project) {
    return res.data.data.project;
  }
  throw new ProjectsApiError("Could not create project.", res.status);
}

export async function fetchProjectMembers(projectId: string): Promise<ProjectMember[]> {
  const res = await apiClient.get<{
    success: true;
    data: { members: ProjectMember[] };
  }>(`/projects/${projectId}/members`);

  throwOnError(res.status, res.data, "Could not load members.");
  if (res.data?.success && res.data.data?.members) {
    return res.data.data.members;
  }
  return [];
}

export async function addProjectMember(
  projectId: string,
  input: { email: string; role?: ProjectRole },
): Promise<ProjectMember> {
  const res = await apiClient.post<{
    success: true;
    data: { member: ProjectMember };
  }>(`/projects/${projectId}/members`, input);

  throwOnError(res.status, res.data, "Could not add member.");
  if ((res.status === 201 || res.status === 200) && res.data?.success && res.data.data?.member) {
    return res.data.data.member;
  }
  throw new ProjectsApiError("Could not add member.", res.status);
}

export async function removeProjectMember(
  projectId: string,
  memberId: string,
): Promise<void> {
  const res = await apiClient.delete<{ success: true; message: string }>(
    `/projects/${projectId}/members/${memberId}`,
  );

  throwOnError(res.status, res.data, "Could not remove member.");
}
