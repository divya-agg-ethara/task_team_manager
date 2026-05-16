import { PRIORITY_CONFIG } from "@/lib/tasks/constants";
import type { TaskPriority } from "@/types/task";
import { cn } from "@/lib/utils";

export function TaskPriorityIndicator({
  priority,
  showLabel = false,
  className,
}: {
  priority: TaskPriority;
  showLabel?: boolean;
  className?: string;
}) {
  const config = PRIORITY_CONFIG[priority];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider",
        config.className,
        className,
      )}
    >
      <span className={cn("size-1.5 shrink-0 rounded-full", config.dot)} aria-hidden />
      {showLabel ? config.label : null}
    </span>
  );
}
