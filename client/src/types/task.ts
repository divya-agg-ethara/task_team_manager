/** Task domain types — aligned with server task.types.ts */

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "CANCELLED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  completedAt: string | null;
  createdBy: TaskUser;
  assignedTo: TaskUser | null;
  createdAt: string;
  updatedAt: string;
};

export type TaskListMeta = {
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
};

/** Kanban column ids (3-column board) */
export type KanbanColumnId = "TODO" | "IN_PROGRESS" | "DONE";
