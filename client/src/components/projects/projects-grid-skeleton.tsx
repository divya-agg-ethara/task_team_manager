import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsGridSkeleton() {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      aria-busy
      aria-label="Loading projects"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/40 bg-muted/15 p-5 ring-1 ring-border/20"
        >
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="size-10 rounded-xl" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
          <Skeleton className="mt-4 h-5 w-[60%] max-w-[180px]" />
          <Skeleton className="mt-2 h-4 w-full max-w-[280px]" />
          <div className="mt-6 flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}
