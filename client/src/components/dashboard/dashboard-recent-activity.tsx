"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { History } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardEmpty } from "@/components/dashboard/empty-state";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import type { DashboardActivityItem } from "@/lib/dashboard/types";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function DashboardRecentActivity() {
  const { data } = useDashboardContext();
  const items = data?.recentActivity ?? [];

  return (
    <Card className={cn(surfaces.card)}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-3">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">
            Recent activity
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Latest task and project updates across your workspaces
          </p>
        </div>
        <span className="rounded-lg border border-border/60 bg-muted/30 p-2 text-muted-foreground">
          <History className="size-4" aria-hidden />
        </span>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <DashboardEmpty
            icon={History}
            title="No activity yet"
            description="Create a project and add tasks — updates from boards will appear here."
            className="border-border/40 bg-muted/10 py-8"
          />
        ) : (
          <ul className="divide-y divide-border/50">
            {items.map((item, i) => (
              <ActivityRow key={item.id} item={item} index={i} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function ActivityRow({ item, index }: { item: DashboardActivityItem; index: number }) {
  const inner = (
    <>
      <span
        className={cn(
          "mt-1.5 size-2 shrink-0 rounded-full",
          item.tone === "success" && "bg-emerald-500/80",
          item.tone === "accent" && "bg-primary",
          item.tone === "warning" && "bg-amber-500/80",
          item.tone === "neutral" && "bg-muted-foreground/35",
        )}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
          {item.title}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
      </div>
      <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
        {item.timeLabel}
      </span>
    </>
  );

  return (
    <motion.li
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.32 }}
      className="py-3.5 first:pt-0 last:pb-0"
    >
      {item.projectId ? (
        <Link
          href={`/projects/${item.projectId}`}
          className="group flex gap-3 rounded-lg px-1 transition-colors hover:bg-muted/20"
        >
          {inner}
        </Link>
      ) : (
        <div className="flex gap-3 px-1">{inner}</div>
      )}
    </motion.li>
  );
}
