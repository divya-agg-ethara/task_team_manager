"use client";

import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KanbanColumnEmpty } from "@/components/tasks/kanban-column-empty";
import { KanbanTaskCard } from "@/components/tasks/kanban-task-card";
import { droppableColumnId } from "@/lib/tasks/constants";
import type { KanbanColumnId, Task } from "@/types/task";
import { cn } from "@/lib/utils";

type ColumnConfig = {
  id: KanbanColumnId;
  title: string;
  description: string;
  accent: string;
};

type KanbanColumnProps = {
  column: ColumnConfig;
  tasks: Task[];
  activeTaskId: string | null;
  onAddTask: (columnId: KanbanColumnId) => void;
  onTaskClick: (task: Task) => void;
};

export function KanbanColumn({
  column,
  tasks,
  activeTaskId,
  onAddTask,
  onTaskClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: droppableColumnId(column.id),
    data: { type: "column", columnId: column.id },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[min(100%,320px)] shrink-0 flex-col sm:w-[300px]"
    >
      <motion.div className="mb-3 flex items-center justify-between gap-2 px-0.5">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              {column.title}
            </h3>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-muted/60 px-1.5 text-[10px] font-semibold tabular-nums text-muted-foreground ring-1 ring-border/30">
              {tasks.length}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{column.description}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={() => onAddTask(column.id)}
          aria-label={`Add task to ${column.title}`}
        >
          <Plus className="size-4" />
        </Button>
      </motion.div>

      <div
        ref={setNodeRef}
        className={cn(
          "relative flex min-h-[220px] flex-1 flex-col gap-2.5 rounded-2xl border p-2.5 transition-[border,background,box-shadow] duration-300",
          "border-border/40 bg-gradient-to-b from-muted/25 via-muted/10 to-transparent",
          "ring-1 ring-border/20 backdrop-blur-sm",
          isOver &&
            "border-primary/30 bg-primary/[0.04] shadow-[0_0_0_1px_hsl(var(--primary)/0.15),0_8px_32px_-12px_hsl(var(--primary)/0.2)]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-2 top-0 h-14 rounded-t-xl bg-gradient-to-b to-transparent opacity-50",
            column.accent,
          )}
          aria-hidden
        />

        {tasks.length === 0 ? (
          <KanbanColumnEmpty onAdd={() => onAddTask(column.id)} />
        ) : (
          tasks.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
              isDragging={activeTaskId === task.id}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}
