"use client";

import type { ReactNode } from "react";
import { typography } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

type DashboardSectionProps = {
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DashboardSection({
  label,
  title,
  description,
  action,
  children,
  className,
}: DashboardSectionProps) {
  return (
    <section className={cn("space-y-5", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className={typography.sectionLabel}>{label}</p>
          <h2 className={typography.sectionTitle}>{title}</h2>
          {description ? (
            <p className={cn("max-w-2xl", typography.body)}>{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
