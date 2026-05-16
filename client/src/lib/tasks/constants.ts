import type { KanbanColumnId, TaskStatus } from "@/types/task";

/** Board columns shown in the UI */
export const KANBAN_COLUMNS: {
  id: KanbanColumnId;
  title: string;
  description: string;
  accent: string;
}[] = [
  {
    id: "TODO",
    title: "Todo",
    description: "Queued and ready",
    accent: "from-muted-foreground/20 to-transparent",
  },
  {
    id: "IN_PROGRESS",
    title: "In progress",
    description: "Active work",
    accent: "from-primary/15 to-transparent",
  },
  {
    id: "DONE",
    title: "Done",
    description: "Completed",
    accent: "from-emerald-500/15 to-transparent",
  },
];

/** Map API status → kanban column */
export function statusToColumn(status: TaskStatus): KanbanColumnId {
  switch (status) {
    case "IN_PROGRESS":
    case "IN_REVIEW":
      return "IN_PROGRESS";
    case "DONE":
      return "DONE";
    case "TODO":
    case "CANCELLED":
    default:
      return "TODO";
  }
}

/** Target API status when dropping on a column */
export function columnToStatus(columnId: KanbanColumnId): TaskStatus {
  return columnId;
}

export const TASK_STATUS_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  TODO: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["TODO", "IN_REVIEW", "DONE", "CANCELLED"],
  IN_REVIEW: ["IN_PROGRESS", "DONE", "CANCELLED"],
  DONE: ["IN_PROGRESS", "TODO"],
  CANCELLED: ["TODO"],
};

export function canTransition(from: TaskStatus, to: TaskStatus): boolean {
  if (from === to) return true;
  return TASK_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

export const PRIORITY_CONFIG: Record<
  (typeof TASK_PRIORITIES)[number],
  { label: string; className: string; dot: string }
> = {
  LOW: {
    label: "Low",
    className: "text-muted-foreground",
    dot: "bg-muted-foreground/50",
  },
  MEDIUM: {
    label: "Medium",
    className: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500/80",
  },
  HIGH: {
    label: "High",
    className: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500/80",
  },
  URGENT: {
    label: "Urgent",
    className: "text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500/80",
  },
};

export function droppableColumnId(columnId: KanbanColumnId) {
  return `column-${columnId}` as const;
}

export function parseDroppableColumnId(id: string): KanbanColumnId | null {
  if (id.startsWith("column-")) {
    const col = id.replace("column-", "") as KanbanColumnId;
    if (col === "TODO" || col === "IN_PROGRESS" || col === "DONE") return col;
  }
  return null;
}
