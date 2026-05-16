"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/empty-state";
import { recentActivityPlaceholder } from "@/components/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function ActivityFeed() {
  const items = recentActivityPlaceholder;
  const hasItems = items.length > 0;

  return (
    <Card className="border-border/50 bg-card/90 shadow-sm ring-1 ring-border/25 backdrop-blur-sm transition-shadow duration-300 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">
            Recent activity
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Live feed when task events stream in
          </p>
        </div>
        <span className="rounded-lg border border-border/60 bg-muted/30 p-2 text-muted-foreground">
          <History className="size-4" aria-hidden />
        </span>
      </CardHeader>
      <CardContent className="space-y-0">
        {hasItems ? (
          <ul className="divide-y divide-border/50">
            {items.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex gap-3 py-3.5 first:pt-0 last:pb-0"
              >
                <span
                  className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    item.tone === "success" && "bg-emerald-500/80",
                    item.tone === "accent" && "bg-primary",
                    (!item.tone || item.tone === "neutral") &&
                      "bg-muted-foreground/35",
                  )}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                  {item.timeLabel}
                </span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <DashboardEmpty
            icon={History}
            title="No activity yet"
            description="Task updates, mentions, and deliveries will stream here in real time."
            className="border-border/40 bg-muted/15 py-8"
          />
        )}
      </CardContent>
    </Card>
  );
}
