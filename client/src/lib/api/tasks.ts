import { apiClient } from "@/lib/api/client";
import type { Task, TaskListMeta, TaskPriority, TaskStatus } from "@/types/task";

type ApiErrorBody = {
  success?: boolean;
  message?: string;
  details?: unknown;
};

export class TasksApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = "TasksApiError";
  }
}

function throwOnError(
  status: number,
  data: ApiErrorBody | undefined,
  fallback: string,
): void {
  if (status >= 200 && status < 300) return;
  throw new TasksApiError(data?.message ?? fallback, status, data?.details);
}

export type CreateTaskPayload = {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  assignedToId?: string;
};

export type UpdateTaskPayload = {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | null;
  assignedToId?: string | null;
};

export async function fetchProjectTasks(
  projectId: string,
): Promise<{ tasks: Task[]; meta: TaskListMeta }> {
  const res = await apiClient.get<{
    success: true;
    data: { tasks: Task[]; meta: TaskListMeta };
  }>(`/projects/${projectId}/tasks`, {
    params: { sortBy: "createdAt", sortOrder: "desc" },
  });

  throwOnError(res.status, res.data, "Could not load tasks.");
  if (res.data?.success && res.data.data) {
    return res.data.data;
  }
  return { tasks: [], meta: { total: 0, filters: {}, sort: { sortBy: "createdAt", sortOrder: "desc" } } };
}

export async function createTask(
  projectId: string,
  payload: CreateTaskPayload,
): Promise<Task> {
  const res = await apiClient.post<{
    success: true;
    data: { task: Task };
  }>(`/projects/${projectId}/tasks`, payload);

  throwOnError(res.status, res.data, "Could not create task.");
  if ((res.status === 201 || res.status === 200) && res.data?.success && res.data.data?.task) {
    return res.data.data.task;
  }
  throw new TasksApiError("Could not create task.", res.status);
}

export async function updateTask(
  projectId: string,
  taskId: string,
  payload: UpdateTaskPayload,
): Promise<Task> {
  const res = await apiClient.patch<{
    success: true;
    data: { task: Task };
  }>(`/projects/${projectId}/tasks/${taskId}`, payload);

  throwOnError(res.status, res.data, "Could not update task.");
  if (res.data?.success && res.data.data?.task) {
    return res.data.data.task;
  }
  throw new TasksApiError("Could not update task.", res.status);
}

export async function deleteTask(projectId: string, taskId: string): Promise<void> {
  const res = await apiClient.delete<{ success: true; message: string }>(
    `/projects/${projectId}/tasks/${taskId}`,
  );

  throwOnError(res.status, res.data, "Could not delete task.");
}
