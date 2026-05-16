"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TaskDueChip } from "@/components/tasks/task-due-chip";
import { TaskPriorityIndicator } from "@/components/tasks/task-priority-indicator";
import { surfaces } from "@/lib/ui/surfaces";
import type { Task } from "@/types/task";
import { cn } from "@/lib/utils";

const PRIORITY_ACCENT: Record<Task["priority"], string> = {
  LOW: "from-muted-foreground/30",
  MEDIUM: "from-blue-500/50",
  HIGH: "from-amber-500/55",
  URGENT: "from-rose-500/60",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Static card for DragOverlay (no dnd hooks) */
export function KanbanTaskCardPreview({ task }: { task: Task }) {
  return (
    <article
      className={cn(
        "relative w-[280px] cursor-grabbing overflow-hidden rounded-xl p-3.5 pl-4",
        surfaces.card,
        "rotate-1 shadow-2xl ring-2 ring-primary/20",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b to-transparent",
          PRIORITY_ACCENT[task.priority],
        )}
        aria-hidden
      />
      <div className="space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium leading-snug text-foreground">{task.title}</h4>
          <TaskPriorityIndicator priority={task.priority} />
        </div>
        <div className="flex items-center justify-between gap-2">
          <TaskDueChip dueDate={task.dueDate} />
          {task.assignedTo ? (
            <Avatar size="sm" className="size-6">
              <AvatarFallback className="text-[9px] font-semibold">
                {initials(task.assignedTo.name)}
              </AvatarFallback>
            </Avatar>
          ) : null}
        </div>
      </div>
    </article>
  );
}
