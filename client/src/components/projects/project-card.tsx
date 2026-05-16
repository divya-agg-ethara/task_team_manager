"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderKanban, Users } from "lucide-react";
import { premiumEase } from "@/components/motion/premium";
import { ProjectRoleBadge } from "@/components/projects/project-role-badge";
import { surfaces } from "@/lib/ui/surfaces";
import { formatRelative } from "@/lib/utils/format";
import type { ProjectHealth } from "@/lib/workspace/types";
import type { ProjectSummary } from "@/types/project";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: ProjectSummary;
  health?: ProjectHealth | null;
  index?: number;
};

export function ProjectCard({ project, health, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.055, duration: 0.45, ease: premiumEase }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl p-5",
          surfaces.card,
          surfaces.cardInteractive,
        )}
      >
        <div className="relative flex items-start justify-between gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/45 bg-gradient-to-br from-background/90 to-muted/30 text-primary">
            <FolderKanban className="size-[18px]" strokeWidth={1.75} />
          </span>
          <ProjectRoleBadge role={project.role} />
        </div>

        <div className="relative mt-4 min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold tracking-tight text-foreground group-hover:text-primary">
            {project.name}
          </h3>
          <p
            className={cn(
              "mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground",
              !project.description && "italic",
            )}
          >
            {project.description || "No description yet"}
          </p>
          {health && health.openCount + health.doneCount > 0 ? (
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>{health.completionRate}% complete</span>
                <span>{health.openCount} open</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted/50">
                <motion.div
                  className="h-full rounded-full bg-primary/75"
                  style={{ width: `${health.completionRate}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="relative mt-5 flex items-center justify-between gap-2 border-t border-border/35 pt-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-muted/30 px-2 py-0.5">
            <Users className="size-3.5" aria-hidden />
            {project.memberCount} members
          </span>
          <span className="inline-flex items-center gap-1 font-medium group-hover:text-primary">
            Open
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
        <span className="sr-only">Updated {formatRelative(project.updatedAt)}</span>
      </Link>
    </motion.div>
  );
}
