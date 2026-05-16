import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDetailSkeleton() {
  return (
    <div className="space-y-8 pb-14" aria-busy aria-label="Loading project">
      <div className="rounded-2xl border border-border/40 bg-muted/15 p-8 ring-1 ring-border/20">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-4 h-9 w-[min(100%,320px)]" />
        <Skeleton className="mt-3 h-16 w-full max-w-2xl" />
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-12">
        <Skeleton className="h-64 rounded-2xl lg:col-span-7" />
        <Skeleton className="h-64 rounded-2xl lg:col-span-5" />
      </div>
    </div>
  );
}
