"use client";

import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/empty-state";
import {
  upcomingDeadlinesPlaceholder,
  type UpcomingDeadline,
} from "@/components/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function UpcomingDeadlines() {
  const items = upcomingDeadlinesPlaceholder;
  const hasItems = items.length > 0;

  return (
    <Card className="border-border/50 bg-card/90 shadow-sm ring-1 ring-border/25 backdrop-blur-sm transition-shadow duration-300 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">
            Upcoming deadlines
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Pulls from task due dates when enabled
          </p>
        </div>
        <span className="rounded-lg border border-border/60 bg-muted/30 p-2 text-muted-foreground">
          <CalendarClock className="size-4" aria-hidden />
        </span>
      </CardHeader>
      <CardContent>
        {hasItems ? (
          <ul className="space-y-2">
            {items.map((item, i) => (
              <DeadlineRow key={item.id} item={item} index={i} />
            ))}
          </ul>
        ) : (
          <DashboardEmpty
            icon={CalendarClock}
            title="No deadlines yet"
            description="When you assign due dates to tasks, they’ll appear here with gentle reminders."
            className="border-border/40 bg-muted/15 py-8"
          />
        )}
      </CardContent>
    </Card>
  );
}

function DeadlineRow({ item, index }: { item: UpcomingDeadline; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-muted/20 px-3 py-2.5 transition-colors hover:border-border/70 hover:bg-muted/30",
        item.urgent && "border-destructive/25 bg-destructive/5",
      )}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
        <p className="text-[11px] text-muted-foreground">{item.label}</p>
      </div>
      <span className="shrink-0 rounded-lg bg-background/70 px-2 py-1 text-[11px] font-medium tabular-nums text-muted-foreground shadow-sm ring-1 ring-border/40">
        {item.dueDisplay}
      </span>
    </motion.li>
  );
}
