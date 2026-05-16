import { Calendar } from "lucide-react";
import type { Task } from "@/types/task";
import { cn } from "@/lib/utils";

export function TaskDueChip({
  dueDate,
  className,
}: {
  dueDate: string | null;
  className?: string;
}) {
  if (!dueDate) return null;

  const date = new Date(dueDate);
  const now = new Date();
  const isOverdue = date < now && date.toDateString() !== now.toDateString();
  const isSoon =
    !isOverdue &&
    date.getTime() - now.getTime() < 1000 * 60 * 60 * 24 * 3;

  const label = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium tabular-nums ring-1",
        isOverdue
          ? "bg-destructive/10 text-destructive ring-destructive/20"
          : isSoon
            ? "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-400"
            : "bg-muted/50 text-muted-foreground ring-border/40",
        className,
      )}
    >
      <Calendar className="size-2.5 opacity-80" aria-hidden />
      {label}
    </span>
  );
}

export function isTaskOverdue(task: Task): boolean {
  if (!task.dueDate || task.status === "DONE") return false;
  return new Date(task.dueDate) < new Date();
}
