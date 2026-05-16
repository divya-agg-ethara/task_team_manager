"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Trash2, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { AddMemberDialog } from "@/components/projects/add-member-dialog";
import { ProjectEmpty } from "@/components/projects/project-empty";
import { ProjectRoleBadge } from "@/components/projects/project-role-badge";
import {
  useProjectMembers,
  useRemoveProjectMember,
  ProjectsApiError,
} from "@/hooks/use-projects";
import type { ProjectDetail, ProjectMember } from "@/types/project";
import { useAuthStore } from "@/stores/auth-store";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type ProjectMembersPanelProps = {
  project: ProjectDetail;
};

export function ProjectMembersPanel({ project }: ProjectMembersPanelProps) {
  const currentUser = useAuthStore((s) => s.user);
  const isAdmin = project.role === "ADMIN";
  const [inviteOpen, setInviteOpen] = useState(false);

  const { data: members = [], isLoading, isError } = useProjectMembers(project.id);
  const removeMember = useRemoveProjectMember(project.id);

  async function handleRemove(member: ProjectMember) {
    if (!confirm(`Remove ${member.user.name} from this project?`)) return;
    try {
      await removeMember.mutateAsync(member.id);
      toast.success("Member removed");
    } catch (e) {
      toast.error(
        e instanceof ProjectsApiError ? e.message : "Could not remove member.",
      );
    }
  }

  return (
    <Card className={cn(surfaces.card)}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
            <Users className="size-4 text-muted-foreground" />
            Team members
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {project.memberCount} collaborator{project.memberCount === 1 ? "" : "s"} in this
            workspace
          </p>
        </div>
        {isAdmin ? (
          <Button
            size="sm"
            className="h-8 gap-1.5 shadow-sm"
            onClick={() => setInviteOpen(true)}
          >
            <UserPlus className="size-3.5" />
            Invite
          </Button>
        ) : null}
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <ul className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </li>
            ))}
          </ul>
        ) : isError ? (
          <ProjectEmpty
            icon={Users}
            title="Couldn’t load members"
            description="Refresh the page or try again in a moment."
            className="py-10"
          />
        ) : members.length === 0 ? (
          <ProjectEmpty
            icon={Users}
            title="No members yet"
            description="Invite teammates to collaborate on this project."
            className="py-10"
            action={
              isAdmin ? (
                <Button size="sm" onClick={() => setInviteOpen(true)} className="gap-1.5">
                  <UserPlus className="size-3.5" />
                  Invite member
                </Button>
              ) : undefined
            }
          />
        ) : (
          <ul className="divide-y divide-border/50">
            {members.map((member, i) => {
              const isSelf = member.userId === currentUser?.id;
              const canRemove = isAdmin && !isSelf;

              return (
                <motion.li
                  key={member.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0"
                >
                  <Avatar size="sm">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-muted text-xs font-semibold">
                      {initials(member.user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-medium text-foreground">
                        {member.user.name}
                        {isSelf ? (
                          <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                            (you)
                          </span>
                        ) : null}
                      </p>
                      <ProjectRoleBadge role={member.role} />
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{member.user.email}</p>
                  </div>

                  {canRemove ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 shrink-0 text-muted-foreground hover:text-destructive"
                          disabled={removeMember.isPending}
                          aria-label={`Actions for ${member.user.name}`}
                        >
                          {removeMember.isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleRemove(member)}
                        >
                          Remove from project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
                </motion.li>
              );
            })}
          </ul>
        )}
      </CardContent>

      {isAdmin ? (
        <AddMemberDialog
          projectId={project.id}
          open={inviteOpen}
          onOpenChange={setInviteOpen}
        />
      ) : null}
    </Card>
  );
}
