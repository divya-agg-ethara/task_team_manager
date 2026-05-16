import { Skeleton } from "@/components/ui/skeleton";

export function DashboardHomeSkeleton() {
  return (
    <section className="space-y-9 pb-4" aria-busy aria-label="Loading dashboard">
      <section className="overflow-hidden rounded-2xl border border-border/40 bg-muted/20 p-6 sm:p-9">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="mt-4 h-9 w-[min(100%,360px)]" />
        <Skeleton className="mt-3 h-12 w-full max-w-xl" />
        <section className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </section>
        <section className="mt-6 flex gap-2">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </section>
      </section>

      <section className="space-y-3">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-7 w-44" />
        <Skeleton className="h-4 w-64" />
        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </section>
      </section>

      <section className="grid gap-8 xl:grid-cols-5">
        <section className="space-y-3 xl:col-span-3">
          <Skeleton className="h-7 w-40" />
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </section>
        </section>
        <section className="space-y-3 xl:col-span-2">
          <Skeleton className="h-7 w-36" />
          <section className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </section>
        </section>
      </section>
    </section>
  );
}
