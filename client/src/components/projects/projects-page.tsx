"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FolderKanban, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeIn } from "@/components/motion/premium";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectEmpty } from "@/components/projects/project-empty";
import { ProjectsGridSkeleton } from "@/components/projects/projects-grid-skeleton";
import {
  ProjectsToolbar,
  type ProjectFilterRole,
} from "@/components/projects/projects-toolbar";
import { QueryErrorState } from "@/components/shared/query-error-state";
import { useProjectsList } from "@/hooks/use-projects";
import { useWorkspace } from "@/hooks/use-workspace";
import { useQueryLoadingState } from "@/hooks/use-query-loading";
import type { ProjectHealth } from "@/lib/workspace/types";
import { surfaces, typography } from "@/lib/ui/surfaces";
import type { ProjectSummary } from "@/types/project";
import { cn } from "@/lib/utils";

type StatusTab = "active" | "completed";

export function ProjectsPage() {
  const searchParams = useSearchParams();
  const projectsQuery = useProjectsList();
  const projects = projectsQuery.data ?? [];
  const isLoading = useQueryLoadingState(projectsQuery);
  const isError = !isLoading && projectsQuery.isError;
  const { data: workspace, isFetching: workspaceFetching } = useWorkspace();
  const workspaceLoading = workspaceFetching && !workspace;

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<ProjectFilterRole>("ALL");
  const [statusTab, setStatusTab] = useState<StatusTab>("active");
  const [createOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("create") === "1") {
      setCreateOpen(true);
    }
  }, [searchParams]);

  const healthByProjectId = useMemo(() => {
    const map = new Map<string, ProjectHealth>();
    workspace?.projectHealth.forEach((h) => map.set(h.projectId, h));
    return map;
  }, [workspace]);

  const tabSource = useMemo((): ProjectSummary[] => {
    if (!workspace) return projects;
    return statusTab === "active"
      ? workspace.activeProjectsList
      : workspace.completedProjectsList;
  }, [workspace, statusTab, projects]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tabSource.filter((p) => {
      const matchesRole = roleFilter === "ALL" || p.role === roleFilter;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q) ?? false);
      return matchesRole && matchesSearch;
    });
  }, [tabSource, search, roleFilter]);

  const stats = useMemo(() => {
    const activeCount = workspace?.activeProjectsList.length ?? projects.length;
    const completedCount = workspace?.completedProjectsList.length ?? 0;
    const atRisk =
      workspace?.projectHealth.filter((h) => h.status === "at-risk").length ?? 0;
    const totalMembers = projects.reduce((sum, p) => sum + p.memberCount, 0);
    return { activeCount, completedCount, atRisk, totalMembers };
  }, [workspace, projects]);

  return (
    <div className="space-y-8 pb-14">
      <FadeIn>
        <section className={cn(surfaces.hero, "px-6 py-8 sm:px-9 sm:py-9")}>
          <div
            className="pointer-events-none absolute -right-[15%] -top-[50%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.12),transparent_68%)]"
            aria-hidden
          />
          <div className="pattern-grid pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl space-y-3">
              <p className={typography.sectionLabel}>Workspace</p>
              <h1 className={typography.pageTitle}>Projects</h1>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                Track progress, membership, and task health across every workspace you
                collaborate in.
              </p>
            </div>
            <Button
              onClick={() => setCreateOpen(true)}
              className="h-10 shrink-0 gap-2 shadow-md shadow-primary/15 transition-transform active:scale-[0.98]"
            >
              <Plus className="size-4" />
              New project
            </Button>
          </div>

          {!isLoading && projects.length > 0 ? (
            <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Active", value: stats.activeCount },
                { label: "Completed", value: stats.completedCount },
                {
                  label: workspaceLoading ? "Collaborators" : "Needs attention",
                  value: workspaceLoading ? stats.totalMembers : stats.atRisk,
                },
              ].map((stat) => (
                <div key={stat.label} className={cn(surfaces.stat)}>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      </FadeIn>

      {isLoading ? (
        <ProjectsGridSkeleton />
      ) : isError ? (
        <QueryErrorState
          title="Couldn't load projects"
          error={projectsQuery.error}
          onRetry={() => void projectsQuery.refetch()}
          isRetrying={projectsQuery.isFetching}
        />
      ) : projects.length === 0 ? (
        <ProjectEmpty
          icon={FolderKanban}
          title="No projects yet"
          description="Create your first project to start collaborating with your team in a focused workspace."
          action={
            <Button onClick={() => setCreateOpen(true)} className="gap-2">
              <Plus className="size-4" />
              Create project
            </Button>
          }
        />
      ) : (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs
              value={statusTab}
              onValueChange={(v) => setStatusTab(v as StatusTab)}
            >
              <TabsList>
                <TabsTrigger value="active">
                  Active
                  {workspace ? (
                    <span className="ml-1 tabular-nums text-muted-foreground">
                      ({workspace.activeProjectsList.length})
                    </span>
                  ) : null}
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed
                  {workspace ? (
                    <span className="ml-1 tabular-nums text-muted-foreground">
                      ({workspace.completedProjectsList.length})
                    </span>
                  ) : null}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ProjectsToolbar
            search={search}
            onSearchChange={setSearch}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            resultCount={filtered.length}
          />

          {filtered.length === 0 ? (
            <ProjectEmpty
              icon={FolderKanban}
              title={statusTab === "completed" ? "No completed projects" : "No matches"}
              description={
                statusTab === "completed"
                  ? "Projects with all tasks done will appear here."
                  : "Try a different search term or clear your role filter."
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  health={healthByProjectId.get(project.id)}
                  index={i}
                />
              ))}
            </div>
          )}
        </>
      )}

      <CreateProjectDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}
