import type { TaskPriority, TaskStatus } from "../../config";
import type { PublicUser } from "../../types/user";

export interface TaskUserSummary extends PublicUser {}

export interface TaskView {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  completedAt: Date | null;
  createdBy: TaskUserSummary;
  assignedTo: TaskUserSummary | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskListMeta {
  total: number;
  filters: {
    status?: TaskStatus;
    priority?: TaskPriority;
    assigneeId?: string;
    search?: string;
  };
  sort: {
    sortBy: "createdAt" | "dueDate";
    sortOrder: "asc" | "desc";
  };
}
