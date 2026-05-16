"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { premiumEase } from "@/components/motion/premium";
import { surfaces } from "@/lib/ui/surfaces";
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: premiumEase }}
      className={cn(
        surfaces.empty,
        "flex flex-col items-center justify-center gap-3 px-6 py-10 text-center",
        className,
      )}
    >
      <div className="pattern-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/8 blur-2xl"
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.span
        className="relative flex size-12 items-center justify-center rounded-xl border border-border/50 bg-background/85 text-muted-foreground shadow-[0_1px_0_0_hsl(var(--foreground)/0.04)_inset,0_4px_12px_-4px_hsl(var(--foreground)/0.08)] ring-1 ring-border/30 backdrop-blur-md"
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <Icon className="size-5" strokeWidth={1.5} />
      </motion.span>
      <div className="relative space-y-1">
        <p className="text-sm font-semibold tracking-tight text-foreground">{title}</p>
        <p className="max-w-[280px] text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
