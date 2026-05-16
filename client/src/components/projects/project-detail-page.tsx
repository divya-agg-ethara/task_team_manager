"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Crown, FolderKanban, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { FadeIn } from "@/components/motion/premium";
import { ProjectDetailSkeleton } from "@/components/projects/project-detail-skeleton";
import { ProjectEmpty } from "@/components/projects/project-empty";
import { ProjectMembersPanel } from "@/components/projects/project-members-panel";
import { ProjectRoleBadge } from "@/components/projects/project-role-badge";
import { useProject } from "@/hooks/use-projects";
import { formatRelative } from "@/lib/utils/format";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function ProjectDetailPage() {
  const params = useParams();
  const projectId = typeof params.projectId === "string" ? params.projectId : "";

  const { data: project, isLoading, isError, error } = useProject(projectId);

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (isError || !project) {
    return (
      <div className="space-y-6 pb-14">
        <Button variant="ghost" size="sm" asChild className="-ml-2 gap-1.5 text-muted-foreground">
          <Link href="/projects">
            <ArrowLeft className="size-4" />
            All projects
          </Link>
        </Button>
        <ProjectEmpty
          icon={FolderKanban}
          title="Project not found"
          description={
            error instanceof Error ? error.message : "This project may have been removed."
          }
        />
      </div>
    );
  }

  const createdDate = new Date(project.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8 pb-14">
      <FadeIn>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-2 gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Link href="/projects">
              <ArrowLeft className="size-4" />
              Projects
            </Link>
          </Button>
        </div>

        <section className={cn(surfaces.hero, "mt-4 px-6 py-8 sm:px-9")}>
          <motion.div
            className="pointer-events-none absolute -left-20 -top-20 size-56 rounded-full bg-primary/10 blur-3xl"
            animate={{ opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex size-11 items-center justify-center rounded-xl border border-border/50 bg-background/70 text-primary shadow-sm">
                  <FolderKanban className="size-5" strokeWidth={1.75} />
                </span>
                <ProjectRoleBadge role={project.role} />
                {project.role === "ADMIN" ? (
                  <Badge variant="outline" className="gap-1 border-primary/30 text-[10px]">
                    <Crown className="size-3" />
                    You manage this workspace
                  </Badge>
                ) : null}
              </div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-[2rem]">
                {project.name}
              </h1>
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {project.description ||
                  "Add a description so your team understands the goals of this project."}
              </p>
              <p className="text-xs text-muted-foreground">
                Created by {project.createdBy.name} · {createdDate}
              </p>
            </div>
          </div>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
            {[
              {
                label: "Members",
                value: project.memberCount,
                icon: Users,
              },
              {
                label: "Your role",
                value: project.role === "ADMIN" ? "Admin" : "Member",
                icon: Crown,
              },
              {
                label: "Last activity",
                value: formatRelative(project.updatedAt),
                icon: Calendar,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className={cn(surfaces.stat, "flex items-center gap-3")}
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
                  <stat.icon className="size-4" />
                </span>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-sm font-semibold tabular-nums text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <KanbanBoard project={project} />

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:col-start-8">
          <ProjectMembersPanel project={project} />
        </div>
      </div>
    </div>
  );
}
