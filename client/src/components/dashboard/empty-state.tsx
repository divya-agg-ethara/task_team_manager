import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardEmptyProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function DashboardEmpty({
  icon: Icon,
  title,
  description,
  className,
}: DashboardEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border/70 bg-muted/25 px-6 py-10 text-center",
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-muted-foreground shadow-sm backdrop-blur-sm">
        <Icon className="size-[18px]" strokeWidth={1.75} />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="max-w-[260px] text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
