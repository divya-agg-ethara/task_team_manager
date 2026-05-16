import { Skeleton } from "@/components/ui/skeleton";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function KanbanBoardSkeleton() {
  return (
    <section className={cn(surfaces.card, "overflow-hidden p-0")} aria-busy>
      <div className="border-b border-border/40 px-5 py-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-2 h-3 w-48" />
      </div>
      <div className="flex gap-4 overflow-hidden p-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-[300px] shrink-0 space-y-3">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-2 rounded-2xl border border-border/30 bg-muted/15 p-2.5">
              <Skeleton className="h-24 w-full rounded-xl" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
