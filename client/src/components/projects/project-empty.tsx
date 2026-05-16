"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { premiumEase } from "@/components/motion/premium";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

type ProjectEmptyProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function ProjectEmpty({
  icon: Icon,
  title,
  description,
  action,
  className,
}: ProjectEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: premiumEase }}
      className={cn(surfaces.empty, "px-8 py-16 text-center", className)}
    >
      <div className="pattern-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden />
      <motion.div
        className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-primary/10 blur-3xl"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.04, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -bottom-14 -left-14 size-44 rounded-full bg-chart-1/10 blur-3xl"
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        aria-hidden
      />
      <motion.span
        className="relative mx-auto flex size-16 items-center justify-center rounded-2xl border border-border/45 bg-gradient-to-br from-background/95 to-muted/30 text-muted-foreground shadow-[0_1px_0_0_hsl(var(--foreground)/0.05)_inset,0_8px_24px_-8px_hsl(var(--foreground)/0.1)] ring-1 ring-border/30 backdrop-blur-md"
        whileHover={{ scale: 1.04, rotate: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <Icon className="size-7" strokeWidth={1.4} />
      </motion.span>
      <div className="relative mt-6 space-y-2">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {action ? <motion.div className="relative mt-7">{action}</motion.div> : null}
    </motion.div>
  );
}
