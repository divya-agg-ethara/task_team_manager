"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
  TasksApiError,
} from "@/hooks/use-tasks";
import { columnToStatus, PRIORITY_CONFIG, TASK_PRIORITIES } from "@/lib/tasks/constants";
import {
  dueDateInputToIso,
  taskFormResolver,
  type TaskFormValues,
} from "@/lib/validation/task-schemas";
import type { KanbanColumnId, Task } from "@/types/task";
import type { ProjectMember } from "@/types/project";

type TaskFormDialogProps = {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: ProjectMember[];
  /** Create mode: preselect column */
  defaultColumn?: KanbanColumnId;
  /** Edit mode */
  task?: Task | null;
};

function toDateInputValue(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function TaskFormDialog({
  projectId,
  open,
  onOpenChange,
  members,
  defaultColumn = "TODO",
  task = null,
}: TaskFormDialogProps) {
  const isEdit = Boolean(task);
  const createTask = useCreateTask(projectId);
  const updateTask = useUpdateTask(projectId);
  const deleteTask = useDeleteTask(projectId);

  const form = useForm<TaskFormValues>({
    resolver: taskFormResolver,
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
      assignedToId: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!open) return;
    if (task) {
      form.reset({
        title: task.title,
        description: task.description ?? "",
        priority: task.priority,
        dueDate: toDateInputValue(task.dueDate),
        assignedToId: task.assignedTo?.id ?? "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
        assignedToId: "",
      });
    }
  }, [open, task, form]);

  const pending =
    createTask.isPending ||
    updateTask.isPending ||
    deleteTask.isPending ||
    form.formState.isSubmitting;

  async function onSubmit(values: TaskFormValues) {
    try {
      const dueDateIso = dueDateInputToIso(values.dueDate);
      const payload = {
        title: values.title,
        description: values.description?.trim() ? values.description.trim() : undefined,
        priority: values.priority,
        dueDate: dueDateIso,
        assignedToId: values.assignedToId?.trim() ? values.assignedToId : undefined,
      };

      if (isEdit && task) {
        await updateTask.mutateAsync({
          taskId: task.id,
          payload: {
            title: payload.title,
            description: payload.description ?? null,
            priority: payload.priority,
            dueDate: dueDateIso ?? null,
            assignedToId: values.assignedToId?.trim()
              ? values.assignedToId
              : null,
          },
        });
        toast.success("Task updated");
      } else {
        await createTask.mutateAsync({
          ...payload,
          status: columnToStatus(defaultColumn),
        });
        toast.success("Task created");
      }
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof TasksApiError ? e.message : "Something went wrong.");
    }
  }

  async function handleDelete() {
    if (!task || !confirm("Delete this task permanently?")) return;
    try {
      await deleteTask.mutateAsync(task.id);
      toast.success("Task deleted");
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof TasksApiError ? e.message : "Could not delete task.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !pending && onOpenChange(v)}>
      <DialogContent className="border-border/50 bg-popover/95 shadow-2xl backdrop-blur-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg tracking-tight">
            {isEdit ? "Edit task" : "New task"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update details, priority, and assignment."
              : `Adds to ${defaultColumn === "TODO" ? "Todo" : defaultColumn === "IN_PROGRESS" ? "In progress" : "Done"}.`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" noValidate>
          <div className="space-y-2">
            <label htmlFor="task-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="task-title"
              placeholder="What needs to be done?"
              disabled={pending}
              className="h-10 border-border/70 bg-background/80"
              {...form.register("title")}
            />
            {form.formState.errors.title ? (
              <p className="text-xs font-medium text-destructive">
                {form.formState.errors.title.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="task-desc" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="task-desc"
              rows={3}
              placeholder="Add context for your team…"
              disabled={pending}
              className="resize-none border-border/70 bg-background/80"
              {...form.register("description")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select
                value={form.watch("priority")}
                onValueChange={(v) =>
                  form.setValue("priority", v as TaskFormValues["priority"], {
                    shouldValidate: true,
                  })
                }
                disabled={pending}
              >
                <SelectTrigger className="h-10 border-border/70 bg-background/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {PRIORITY_CONFIG[p].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="task-due" className="text-sm font-medium">
                Due date
              </label>
              <Input
                id="task-due"
                type="date"
                disabled={pending}
                className="h-10 border-border/70 bg-background/80"
                {...form.register("dueDate")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Assignee</label>
            <Select
              value={form.watch("assignedToId") || "unassigned"}
              onValueChange={(v) =>
                form.setValue("assignedToId", v === "unassigned" ? "" : v, {
                  shouldValidate: true,
                })
              }
              disabled={pending}
            >
              <SelectTrigger className="h-10 border-border/70 bg-background/80">
                <SelectValue placeholder="Unassigned" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {members.map((m) => (
                  <SelectItem key={m.userId} value={m.userId}>
                    {m.user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            {isEdit ? (
              <Button
                type="button"
                variant="outline"
                className="gap-1.5 text-destructive hover:text-destructive"
                disabled={pending}
                onClick={handleDelete}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={pending} className="shadow-md shadow-primary/15">
                {pending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving
                  </>
                ) : isEdit ? (
                  "Save changes"
                ) : (
                  "Create task"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
