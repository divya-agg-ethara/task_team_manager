import { Skeleton } from "@/components/ui/skeleton";

export function DashboardHomeSkeleton() {
  return (
    <div className="space-y-8 pb-14" aria-busy aria-label="Loading dashboard">
      {/* Welcome */}
      <div className="overflow-hidden rounded-2xl border border-border/40 bg-muted/20 p-6 shadow-sm ring-1 ring-border/25 sm:p-9">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl space-y-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-9 w-[min(100%,340px)]" />
            <Skeleton className="h-14 w-full max-w-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-[120px] rounded-lg" />
            <Skeleton className="h-9 w-[140px] rounded-lg" />
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/40 bg-muted/15 p-4 ring-1 ring-border/20"
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-4 h-8 w-16" />
            <Skeleton className="mt-3 h-3 w-28" />
          </div>
        ))}
      </div>

      {/* Productivity + stat column */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border/40 bg-muted/15 p-4 shadow-sm ring-1 ring-border/20 lg:col-span-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-3 w-64" />
          <Skeleton className="mt-8 h-[200px] w-full rounded-lg sm:h-[220px]" />
        </div>
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/40 bg-muted/15 p-4 ring-1 ring-border/20"
            >
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-3 h-8 w-12" />
              <Skeleton className="mt-3 h-3 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="rounded-xl border border-border/40 bg-muted/15 p-4 ring-1 ring-border/20 lg:col-span-5">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="mt-2 h-3 w-52" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="mt-1.5 size-2 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[75%] max-w-[200px]" />
                  <Skeleton className="h-3 w-full max-w-[280px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/40 bg-muted/15 p-4 ring-1 ring-border/20 lg:col-span-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-2 h-3 w-56" />
          <Skeleton className="mt-8 h-32 w-full rounded-xl" />
        </div>
        <div className="rounded-xl border border-border/40 bg-muted/15 p-4 ring-1 ring-border/20 lg:col-span-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-2 h-3 w-44" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[52px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
