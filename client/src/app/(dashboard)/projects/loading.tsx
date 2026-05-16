import { ProjectsGridSkeleton } from "@/components/projects/projects-grid-skeleton";

export default function ProjectsLoading() {
  return (
    <div className="space-y-8 pb-14">
      <div className="h-48 animate-pulse rounded-2xl bg-muted/30 ring-1 ring-border/20" />
      <ProjectsGridSkeleton />
    </div>
  );
}
