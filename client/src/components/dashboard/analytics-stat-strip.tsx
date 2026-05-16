"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { dashboardKpiStats } from "@/components/dashboard/mock-data";
import { cn } from "@/lib/utils";

export function AnalyticsStatStrip() {
  return (
    <motion.div
      className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.06 },
        },
      }}
    >
      {dashboardKpiStats.map((stat) => (
        <motion.div
          key={stat.id}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          whileHover={{
            y: -2,
            transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
          }}
          className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card/95 via-card/80 to-muted/25 p-4 shadow-sm ring-1 ring-border/20 backdrop-blur-sm transition-[box-shadow,border-color] duration-300 hover:border-border/70 hover:shadow-md hover:shadow-black/[0.04] dark:hover:shadow-black/30"
        >
          <div
            className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-primary/[0.07] blur-2xl transition-opacity duration-300 group-hover:opacity-90"
            aria-hidden
          />
          <div className="relative flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              {stat.positive !== undefined ? (
                <span
                  className={cn(
                    "flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                    stat.positive
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                  )}
                  aria-hidden
                >
                  {stat.positive ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                </span>
              ) : null}
            </div>
            <p className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
              {stat.value}
            </p>
            <p className="text-[11px] text-muted-foreground transition-colors duration-200 group-hover:text-muted-foreground/90">
              {stat.delta}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
