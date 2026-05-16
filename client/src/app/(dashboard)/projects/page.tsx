import { Suspense } from "react";
import { ProjectsPage } from "@/components/projects/projects-page";
import { ProjectsGridSkeleton } from "@/components/projects/projects-grid-skeleton";

export const metadata = {
  title: "Projects",
};

export default function ProjectsRoutePage() {
  return (
    <Suspense fallback={<ProjectsPageFallback />}>
      <ProjectsPage />
    </Suspense>
  );
}

function ProjectsPageFallback() {
  return (
    <div className="space-y-8 pb-14">
      <div className="h-48 animate-pulse rounded-2xl bg-muted/30" />
      <ProjectsGridSkeleton />
    </div>
  );
}
