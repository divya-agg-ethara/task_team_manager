"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { surfaces, typography } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

type SettingsPanelProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function SettingsPanel({
  icon: Icon,
  title,
  description,
  children,
  footer,
  className,
}: SettingsPanelProps) {
  return (
    <section className={cn(surfaces.settingsPanel, "overflow-hidden", className)}>
      <div className="border-b border-border/40 bg-[hsl(var(--brand-muted)/0.25)] px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[hsl(var(--brand)/0.2)] bg-background/80 text-primary shadow-sm">
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className={typography.cardTitle}>{title}</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      <div className="px-5 py-2 sm:px-6">{children}</div>
      {footer ? (
        <div className="border-t border-border/40 bg-muted/15 px-5 py-3 sm:px-6">{footer}</div>
      ) : null}
    </section>
  );
}
