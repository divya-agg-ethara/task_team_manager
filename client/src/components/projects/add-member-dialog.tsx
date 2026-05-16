"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddProjectMember,
  ProjectsApiError,
} from "@/hooks/use-projects";
import {
  addMemberFormResolver,
  type AddMemberFormInput,
  type AddMemberFormValues,
} from "@/lib/validation/project-schemas";

type AddMemberDialogProps = {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddMemberDialog({
  projectId,
  open,
  onOpenChange,
}: AddMemberDialogProps) {
  const addMember = useAddProjectMember(projectId);

  const form = useForm<AddMemberFormInput, unknown, AddMemberFormValues>({
    resolver: addMemberFormResolver,
    defaultValues: { email: "", role: "MEMBER" },
    mode: "onTouched",
  });

  const pending = addMember.isPending || form.formState.isSubmitting;

  async function onSubmit(values: AddMemberFormValues) {
    try {
      await addMember.mutateAsync({
        email: values.email,
        role: values.role,
      });
      toast.success("Member invited");
      form.reset({ email: "", role: "MEMBER" });
      onOpenChange(false);
    } catch (e) {
      toast.error(
        e instanceof ProjectsApiError ? e.message : "Could not add member.",
      );
    }
  }

  function handleOpenChange(next: boolean) {
    if (!pending) {
      if (!next) form.reset({ email: "", role: "MEMBER" });
      onOpenChange(next);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-border/50 bg-popover/95 shadow-2xl backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg tracking-tight">Invite member</DialogTitle>
          <DialogDescription>
            Add someone by email. They must already have a TeamTask account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" noValidate>
          <div className="space-y-2">
            <label htmlFor="member-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="member-email"
              type="email"
              autoComplete="email"
              placeholder="colleague@company.com"
              disabled={pending}
              className="h-10 border-border/70 bg-background/80"
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
            />
            {form.formState.errors.email ? (
              <p className="text-xs font-medium text-destructive">
                {form.formState.errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="member-role" className="text-sm font-medium">
              Role
            </label>
            <Select
              value={form.watch("role")}
              onValueChange={(v) =>
                form.setValue("role", v as AddMemberFormValues["role"], {
                  shouldValidate: true,
                })
              }
              disabled={pending}
            >
              <SelectTrigger id="member-role" className="h-10 border-border/70 bg-background/80">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEMBER">Member — can view and collaborate</SelectItem>
                <SelectItem value="ADMIN">Admin — full project control</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.role ? (
              <p className="text-xs font-medium text-destructive">
                {form.formState.errors.role.message}
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
                  Inviting
                </>
              ) : (
                "Send invite"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
