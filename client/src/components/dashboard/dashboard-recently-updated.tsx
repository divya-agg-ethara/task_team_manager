"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function DashboardRecentlyUpdated() {
  const { data } = useDashboardContext();
  const items = data?.recentlyUpdated ?? [];

  return (
    <Card className={cn(surfaces.card, "h-full")}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <RefreshCw className="size-4 text-muted-foreground" aria-hidden />
          Recently updated
        </CardTitle>
        <p className="text-xs text-muted-foreground">Tasks and projects touched lately</p>
      </CardHeader>
      <CardContent className="space-y-1">
        {items.length === 0 ? (
          <p className="py-6 text-center text-xs text-muted-foreground">
            Updates will appear as you work on boards.
          </p>
        ) : (
          items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={item.projectId ? `/projects/${item.projectId}` : "/projects"}
                className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted/30"
              >
                <span className="truncate font-medium text-foreground">{item.title}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">
                  {item.timeLabel}
                </span>
              </Link>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
