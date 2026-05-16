"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  fetchProjectTasks,
  updateTask,
  TasksApiError,
  type CreateTaskPayload,
  type UpdateTaskPayload,
} from "@/lib/api/tasks";
import { useAuthReady } from "@/hooks/use-auth-ready";
import { dashboardKeys } from "@/lib/dashboard/query-keys";
import { workspaceKeys } from "@/lib/workspace/query-keys";
import { taskKeys } from "@/lib/tasks/query-keys";
import type { Task } from "@/types/task";

export function useProjectTasks(projectId: string) {
  const authReady = useAuthReady();

  return useQuery({
    queryKey: taskKeys.list(projectId),
    queryFn: () => fetchProjectTasks(projectId),
    enabled: authReady && Boolean(projectId),
  });
}

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.list(projectId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export function useUpdateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: UpdateTaskPayload;
    }) => updateTask(projectId, taskId, payload),
    onMutate: async ({ taskId, payload }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.list(projectId) });
      const previous = queryClient.getQueryData<{
        tasks: Task[];
        meta: unknown;
      }>(taskKeys.list(projectId));

      if (previous) {
        queryClient.setQueryData(taskKeys.list(projectId), {
          ...previous,
          tasks: previous.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  ...payload,
                  status: payload.status ?? t.status,
                  priority: payload.priority ?? t.priority,
                  description:
                    payload.description !== undefined
                      ? payload.description
                      : t.description,
                  dueDate:
                    payload.dueDate !== undefined ? payload.dueDate : t.dueDate,
                  assignedTo:
                    payload.assignedToId === null
                      ? null
                      : payload.assignedToId
                        ? t.assignedTo
                        : payload.assignedToId
                          ? t.assignedTo
                          : t.assignedTo,
                  updatedAt: new Date().toISOString(),
                }
              : t,
          ),
        });
      }

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(taskKeys.list(projectId), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.list(projectId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export function useDeleteTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(projectId, taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.list(projectId) });
      const previous = queryClient.getQueryData<{
        tasks: Task[];
        meta: unknown;
      }>(taskKeys.list(projectId));

      if (previous) {
        queryClient.setQueryData(taskKeys.list(projectId), {
          ...previous,
          tasks: previous.tasks.filter((t) => t.id !== taskId),
        });
      }

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(taskKeys.list(projectId), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.list(projectId) });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.all });
    },
  });
}

export { TasksApiError };
