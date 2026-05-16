"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SettingsRowProps = {
  label: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SettingsRow({ label, description, children, className }: SettingsRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border/40 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description ? (
          <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
