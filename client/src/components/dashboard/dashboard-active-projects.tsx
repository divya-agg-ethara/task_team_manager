"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderKanban, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardEmpty } from "@/components/dashboard/empty-state";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import { ProjectRoleBadge } from "@/components/projects/project-role-badge";
import { surfaces } from "@/lib/ui/surfaces";
import { formatRelative } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

type DashboardActiveProjectsProps = {
  /** Narrow column beside project health on xl */
  compact?: boolean;
};

export function DashboardActiveProjects({ compact = false }: DashboardActiveProjectsProps) {
  const { data } = useDashboardContext();
  const projects = data?.activeProjects ?? [];

  return (
    <DashboardSection
      label="Projects"
      title="My active projects"
      description="Recently updated workspaces you're part of."
      action={
        <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-muted-foreground">
          <Link href="/projects">
            View all
            <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
      }
    >
      {projects.length === 0 ? (
        <DashboardEmpty
          icon={FolderKanban}
          title="No projects yet"
          description="Create a project to organize tasks, invite teammates, and track progress on boards."
          className="py-12"
        />
      ) : (
        <section
          className={cn(
            "grid gap-3 sm:grid-cols-2",
            compact ? "xl:grid-cols-2" : "lg:grid-cols-3",
          )}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              whileHover={{ y: -3 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className={cn(
                  "group flex h-full flex-col rounded-xl p-4",
                  surfaces.card,
                  surfaces.cardInteractive,
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-border/50 bg-background/70 text-primary">
                    <FolderKanban className="size-4" strokeWidth={1.75} />
                  </span>
                  <ProjectRoleBadge role={project.role} />
                </div>
                <h3 className="mt-3 truncate text-base font-semibold tracking-tight group-hover:text-primary">
                  {project.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description || "No description"}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Updated {formatRelative(project.updatedAt)} · {project.memberCount}{" "}
                  member{project.memberCount === 1 ? "" : "s"}
                </p>
              </Link>
            </motion.div>
          ))}
          {projects.length < 4 ? (
            <Link
              href="/projects?create=1"
              className={cn(
                "flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/55 bg-muted/10 p-4 text-center transition-colors hover:border-primary/35 hover:bg-primary/5",
              )}
            >
              <span className="flex size-9 items-center justify-center rounded-lg border border-border/50 bg-background/60 text-muted-foreground">
                <Plus className="size-4" />
              </span>
              <span className="text-sm font-medium text-foreground">New project</span>
              <span className="text-sm text-muted-foreground">Start a workspace</span>
            </Link>
          ) : null}
        </section>
      )}
    </DashboardSection>
  );
}
