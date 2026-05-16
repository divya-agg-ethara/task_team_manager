"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Plus, Users } from "lucide-react";
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
import { DashboardEmpty } from "@/components/dashboard/empty-state";
import { useCreateTeam, useTeamsList } from "@/hooks/use-teams";
import { isWorkspaceAdmin } from "@/lib/auth/roles";
import { useAuthStore } from "@/stores/auth-store";
import { surfaces, typography } from "@/lib/ui/surfaces";
import { FadeIn } from "@/components/motion/premium";
import { cn } from "@/lib/utils";

export function TeamsPage() {
  const role = useAuthStore((s) => s.user?.role);
  const isAdmin = isWorkspaceAdmin(role);
  const { data: teams = [], isLoading, isError } = useTeamsList();
  const createTeam = useCreateTeam();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createTeam.mutateAsync({
        name: name.trim(),
        description: description.trim() || undefined,
      });
      toast.success("Team created");
      setOpen(false);
      setName("");
      setDescription("");
    } catch {
      toast.error("Could not create team");
    }
  }

  if (isLoading) {
    return <div className="h-64 animate-pulse rounded-2xl bg-muted/30" />;
  }

  if (isError) {
    return (
      <DashboardEmpty
        icon={Users}
        title="Couldn't load teams"
        description="Check your connection and try again."
      />
    );
  }

  return (
    <section className="space-y-8 pb-14">
      <FadeIn>
        <header className={cn(surfaces.hero, "px-6 py-8 sm:px-9")}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={typography.sectionLabel}>
                {isAdmin ? "Admin" : "Collaboration"}
              </p>
              <h1 className={cn("mt-2", typography.pageTitle)}>Teams</h1>
              <p className={cn("mt-3 max-w-2xl", typography.body)}>
                {isAdmin
                  ? "Create teams, manage members, and organize projects under a shared workspace."
                  : "Teams you belong to and the projects you collaborate on."}
              </p>
            </div>
            {isAdmin ? (
              <Button className="gap-2" onClick={() => setOpen(true)}>
                <Plus className="size-4" />
                New team
              </Button>
            ) : null}
          </div>
        </header>
      </FadeIn>

      {teams.length === 0 ? (
        <section className="space-y-4">
          <DashboardEmpty
            icon={Users}
            title={isAdmin ? "No teams yet" : "No teams assigned"}
            description={
              isAdmin
                ? "Create your first team to organize members and projects."
                : "When an admin adds you to a team, it will appear here."
            }
            className="py-14"
          />
          {isAdmin ? (
            <div className="flex justify-center">
              <Button onClick={() => setOpen(true)} className="gap-2">
                <Plus className="size-4" />
                Create team
              </Button>
            </div>
          ) : null}
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {teams.map((team) => (
            <article key={team.id} className={cn(surfaces.card, "flex flex-col p-5")}>
              <h2 className="text-[15px] font-semibold text-foreground">{team.name}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {team.description || "No description"}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {team.memberCount} members · {team.projectCount} projects · {team.role}
              </p>
              <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                <Link href={`/teams/${team.id}`}>Open team</Link>
              </Button>
            </article>
          ))}
        </section>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create team</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-name">Name</Label>
              <Input
                id="team-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team-desc">Description</Label>
              <Input
                id="team-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={createTeam.isPending} className="w-full gap-2">
              {createTeam.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
              Create
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
