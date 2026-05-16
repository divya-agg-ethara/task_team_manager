"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddTeamMember, useRemoveTeamMember, useTeam } from "@/hooks/use-teams";
import { isWorkspaceAdmin } from "@/lib/auth/roles";
import { useAuthStore } from "@/stores/auth-store";
import { surfaces, typography } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

type TeamDetailPageProps = {
  teamId: string;
};

export function TeamDetailPage({ teamId }: TeamDetailPageProps) {
  const role = useAuthStore((s) => s.user?.role);
  const canManage =
    isWorkspaceAdmin(role) || false;
  const { data: team, isLoading, isError } = useTeam(teamId);
  const addMember = useAddTeamMember(teamId);
  const removeMember = useRemoveTeamMember(teamId);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");

  const isTeamAdmin = team?.role === "ADMIN" || isWorkspaceAdmin(role);
  const showManage = canManage || isTeamAdmin;

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addMember.mutateAsync({ email: email.trim(), role: "MEMBER" });
      toast.success("Member added");
      setInviteOpen(false);
      setEmail("");
    } catch {
      toast.error("Could not add member");
    }
  }

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-2xl bg-muted/30" />;
  }

  if (isError || !team) {
    return (
      <p className="text-sm text-muted-foreground">
        Could not load team.{" "}
        <Link href="/teams" className="text-primary underline-offset-4 hover:underline">
          Back to teams
        </Link>
      </p>
    );
  }

  return (
    <section className="space-y-8 pb-14">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1.5">
          <Link href="/teams">
            <ArrowLeft className="size-4" />
            Teams
          </Link>
        </Button>
        <article className={cn(surfaces.hero, "px-6 py-8")}>
          <p className={typography.sectionLabel}>Team</p>
          <h1 className={cn("mt-2", typography.pageTitle)}>{team.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {team.description || "No description"}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            {team.memberCount} members · {team.projectCount} projects
          </p>
        </article>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Members</h2>
          {showManage ? (
            <Button size="sm" className="gap-2" onClick={() => setInviteOpen(true)}>
              <UserPlus className="size-4" />
              Add member
            </Button>
          ) : null}
        </div>

        <ul className={cn(surfaces.card, "divide-y divide-border/50")}>
          {team.members.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between gap-3 px-4 py-3.5"
            >
              <article>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.email}</p>
                <p className="mt-0.5 text-[10px] uppercase text-muted-foreground">
                  {m.role}
                  {m.performanceScore != null ? ` · Score ${m.performanceScore}` : ""}
                </p>
              </article>
              {showManage ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  aria-label={`Remove ${m.name}`}
                  onClick={() =>
                    removeMember.mutate(m.id, {
                      onSuccess: () => toast.success("Member removed"),
                      onError: () => toast.error("Could not remove member"),
                    })
                  }
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite to {team.name}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="member-email">Email</Label>
              <Input
                id="member-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={addMember.isPending} className="w-full gap-2">
              {addMember.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
              Add member
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
