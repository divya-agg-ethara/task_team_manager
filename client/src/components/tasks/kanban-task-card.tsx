"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TaskDueChip } from "@/components/tasks/task-due-chip";
import { TaskPriorityIndicator } from "@/components/tasks/task-priority-indicator";
import { surfaces } from "@/lib/ui/surfaces";
import type { Task } from "@/types/task";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const PRIORITY_ACCENT: Record<Task["priority"], string> = {
  LOW: "from-muted-foreground/30",
  MEDIUM: "from-blue-500/50",
  HIGH: "from-amber-500/55",
  URGENT: "from-rose-500/60",
};

type KanbanTaskCardProps = {
  task: Task;
  onClick: () => void;
  isDragging?: boolean;
};

export function KanbanTaskCard({ task, onClick, isDragging }: KanbanTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging: isDraggingLocal } =
    useDraggable({
      id: task.id,
      data: { type: "task", task },
    });

  const dragging = isDragging || isDraggingLocal;

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: dragging ? 0.35 : 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative touch-none",
        dragging && "z-50",
      )}
    >
      <article
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-xl p-3.5 pl-4",
          surfaces.card,
          "shadow-[0_2px_12px_-6px_hsl(var(--foreground)/0.08)]",
          "transition-[box-shadow,transform,border-color] duration-300",
          "hover:shadow-[0_8px_28px_-10px_hsl(var(--foreground)/0.12)] hover:border-border/55",
          task.status === "CANCELLED" && "opacity-60",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b to-transparent",
            PRIORITY_ACCENT[task.priority],
          )}
          aria-hidden
        />

        <div className="flex items-start gap-2">
          <button
            type="button"
            className="mt-0.5 shrink-0 cursor-grab rounded p-0.5 text-muted-foreground/40 opacity-0 transition-opacity hover:text-muted-foreground active:cursor-grabbing group-hover:opacity-100"
            {...listeners}
            {...attributes}
            onClick={(e) => e.stopPropagation()}
            aria-label="Drag task"
          >
            <GripVertical className="size-3.5" />
          </button>

          <div className="min-w-0 flex-1 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <h4
                className={cn(
                  "text-sm font-medium leading-snug tracking-tight text-foreground",
                  task.status === "CANCELLED" && "line-through",
                )}
              >
                {task.title}
              </h4>
              <TaskPriorityIndicator priority={task.priority} />
            </div>

            {task.description ? (
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {task.description}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <TaskDueChip dueDate={task.dueDate} />
              {task.assignedTo ? (
                <Avatar size="sm" className="size-6 ring-2 ring-background">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-muted text-[9px] font-semibold">
                    {initials(task.assignedTo.name)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <span className="text-[10px] text-muted-foreground/70">Unassigned</span>
              )}
            </div>

            {task.status === "IN_REVIEW" ? (
              <span className="inline-block rounded-md bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-primary">
                In review
              </span>
            ) : null}
          </div>
        </div>
      </article>
    </motion.div>
  );
}
