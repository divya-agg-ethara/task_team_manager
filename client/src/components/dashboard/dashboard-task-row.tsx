"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TaskDueChip } from "@/components/tasks/task-due-chip";
import { TaskPriorityIndicator } from "@/components/tasks/task-priority-indicator";
import type { EnrichedTask } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

type DashboardTaskRowProps = {
  task: EnrichedTask;
  index?: number;
  showProject?: boolean;
};

export function DashboardTaskRow({
  task,
  index = 0,
  showProject = true,
}: DashboardTaskRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/projects/${task.projectId}`}
        className={cn(
          "group flex items-start gap-3 rounded-xl border border-border/40 bg-muted/15 px-3.5 py-3",
          "transition-[border-color,background,box-shadow] duration-200",
          "hover:border-border/70 hover:bg-muted/25 hover:shadow-[0_8px_24px_-14px_hsl(var(--foreground)/0.12)]",
        )}
      >
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
              {task.title}
            </p>
            <TaskPriorityIndicator priority={task.priority} />
          </div>
          {showProject ? (
            <p className="text-sm text-muted-foreground">{task.projectName}</p>
          ) : null}
          <div className="flex flex-wrap items-center gap-2">
            <TaskDueChip dueDate={task.dueDate} />
            {task.assignedTo ? (
              <span className="text-[10px] text-muted-foreground">
                {task.assignedTo.name}
              </span>
            ) : null}
          </div>
        </div>
        <ArrowUpRight
          className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
          aria-hidden
        />
      </Link>
    </motion.div>
  );
}
