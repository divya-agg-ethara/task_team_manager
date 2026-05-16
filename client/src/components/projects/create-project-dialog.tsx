"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateProject,
  ProjectsApiError,
} from "@/hooks/use-projects";
import {
  createProjectFormResolver,
  type CreateProjectFormInput,
  type CreateProjectFormValues,
} from "@/lib/validation/project-schemas";

type CreateProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const router = useRouter();
  const createProject = useCreateProject();

  const form = useForm<CreateProjectFormInput, unknown, CreateProjectFormValues>({
    resolver: createProjectFormResolver,
    defaultValues: { name: "", description: "" },
    mode: "onTouched",
  });

  const pending = createProject.isPending || form.formState.isSubmitting;

  async function onSubmit(values: CreateProjectFormValues) {
    try {
      const project = await createProject.mutateAsync({
        name: values.name,
        description: values.description?.trim() ? values.description.trim() : undefined,
      });
      toast.success("Project created");
      form.reset();
      onOpenChange(false);
      router.push(`/projects/${project.id}`);
    } catch (e) {
      toast.error(
        e instanceof ProjectsApiError ? e.message : "Could not create project.",
      );
    }
  }

  function handleOpenChange(next: boolean) {
    if (!pending) {
      if (!next) form.reset();
      onOpenChange(next);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-border/50 bg-popover/95 shadow-2xl backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg tracking-tight">New project</DialogTitle>
          <DialogDescription>
            Create a collaborative workspace for your team. You&apos;ll be the admin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" noValidate>
          <div className="space-y-2">
            <label htmlFor="project-name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="project-name"
              placeholder="Product launch Q2"
              disabled={pending}
              className="h-10 border-border/70 bg-background/80"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />
            {form.formState.errors.name ? (
              <p className="text-xs font-medium text-destructive">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="project-description" className="text-sm font-medium">
              Description <span className="text-muted-foreground">(optional)</span>
            </label>
            <Textarea
              id="project-description"
              placeholder="What is this project about?"
              rows={3}
              disabled={pending}
              className="resize-none border-border/70 bg-background/80"
              aria-invalid={!!form.formState.errors.description}
              {...form.register("description")}
            />
            {form.formState.errors.description ? (
              <p className="text-xs font-medium text-destructive">
                {form.formState.errors.description.message}
              </p>
            ) : null}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending} className="shadow-md shadow-primary/15">
              {pending ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating
                </>
              ) : (
                "Create project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
