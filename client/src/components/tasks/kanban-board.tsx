"use client";

import { useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { LayoutGrid, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { KanbanColumn } from "@/components/tasks/kanban-column";
import { KanbanTaskCardPreview } from "@/components/tasks/kanban-task-card-preview";
import { KanbanBoardSkeleton } from "@/components/tasks/kanban-board-skeleton";
import { TaskFormDialog } from "@/components/tasks/task-form-dialog";
import {
  useProjectTasks,
  useUpdateTask,
  TasksApiError,
} from "@/hooks/use-tasks";
import {
  canTransition,
  columnToStatus,
  KANBAN_COLUMNS,
  parseDroppableColumnId,
  statusToColumn,
} from "@/lib/tasks/constants";
import { surfaces, typography } from "@/lib/ui/surfaces";
import { useProjectMembers } from "@/hooks/use-projects";
import type { KanbanColumnId, Task } from "@/types/task";
import type { ProjectDetail } from "@/types/project";
import { cn } from "@/lib/utils";

type KanbanBoardProps = {
  project: ProjectDetail;
};

export function KanbanBoard({ project }: KanbanBoardProps) {
  const projectId = project.id;
  const { data, isLoading, isError, error } = useProjectTasks(projectId);
  const { data: members = [] } = useProjectMembers(projectId);
  const updateTask = useUpdateTask(projectId);

  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formColumn, setFormColumn] = useState<KanbanColumnId>("TODO");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  const tasksByColumn = useMemo(() => {
    const tasks = data?.tasks ?? [];
    const grouped: Record<KanbanColumnId, Task[]> = {
      TODO: [],
      IN_PROGRESS: [],
      DONE: [],
    };
    for (const task of tasks) {
      const col = statusToColumn(task.status);
      grouped[col].push(task);
    }
    return grouped;
  }, [data?.tasks]);

  const tasks = data?.tasks ?? [];

  function openCreate(columnId: KanbanColumnId) {
    setEditingTask(null);
    setFormColumn(columnId);
    setFormOpen(true);
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  function resolveTargetColumn(overId: string): KanbanColumnId | null {
    const col = parseDroppableColumnId(overId);
    if (col) return col;
    const overTask = tasks.find((t) => t.id === overId);
    if (overTask) return statusToColumn(overTask.status);
    return null;
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const task = tasks.find((t) => t.id === active.id);
    if (!task) return;

    const targetColumn = resolveTargetColumn(String(over.id));
    if (!targetColumn) return;

    const newStatus = columnToStatus(targetColumn);
    if (task.status === newStatus) return;

    if (!canTransition(task.status, newStatus)) {
      toast.error("This status change isn't allowed for this task.");
      return;
    }

    try {
      await updateTask.mutateAsync({
        taskId: task.id,
        payload: { status: newStatus },
      });
    } catch (e) {
      toast.error(
        e instanceof TasksApiError ? e.message : "Could not move task.",
      );
    }
  }

  if (isLoading) {
    return <KanbanBoardSkeleton />;
  }

  if (isError) {
    return (
      <div
        className={cn(
          surfaces.empty,
          "flex flex-col items-center justify-center gap-2 px-6 py-12 text-center",
        )}
      >
        <p className="text-sm font-medium text-foreground">Couldn&apos;t load tasks</p>
        <p className="text-xs text-muted-foreground">
          {error instanceof Error ? error.message : "Try again shortly."}
        </p>
      </div>
    );
  }

  return (
    <section className={cn(surfaces.card, "overflow-hidden p-0")}>
      <div className="flex flex-col gap-4 border-b border-border/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg border border-border/45 bg-muted/40 text-primary shadow-sm">
            <LayoutGrid className="size-4" />
          </span>
          <div>
            <h2 className={typography.cardTitle}>Task board</h2>
            <p className="text-xs text-muted-foreground">
              {tasks.length} task{tasks.length === 1 ? "" : "s"} · drag to update status
            </p>
          </div>
        </div>
        <Button
          size="sm"
          className="h-9 gap-1.5 shadow-md shadow-primary/15"
          onClick={() => openCreate("TODO")}
        >
          <Plus className="size-4" />
          Add task
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="flex min-w-min gap-4 px-4 sm:px-5">
            {KANBAN_COLUMNS.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={tasksByColumn[column.id]}
                activeTaskId={activeTask?.id ?? null}
                onAddTask={openCreate}
                onTaskClick={openEdit}
              />
            ))}
          </div>
        </div>

        <DragOverlay dropAnimation={{ duration: 220, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
          {activeTask ? (
            <motion.div
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: 1.02, rotate: 1.5 }}
              className="w-[280px] cursor-grabbing shadow-2xl"
            >
              <KanbanTaskCardPreview task={activeTask} />
            </motion.div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskFormDialog
        projectId={projectId}
        open={formOpen}
        onOpenChange={setFormOpen}
        members={members}
        defaultColumn={formColumn}
        task={editingTask}
      />
    </section>
  );
}
