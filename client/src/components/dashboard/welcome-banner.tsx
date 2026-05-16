"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function WelcomeBanner() {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(/\s+/)[0] ?? "there";
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.section
      className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card/95 via-card/80 to-muted/40 shadow-[0_1px_0_0_rgb(255_255_255/0.04)_inset,0_8px_32px_-8px_rgb(0_0_0/0.08)] backdrop-blur-sm dark:from-card/70 dark:to-muted/25 dark:shadow-[0_1px_0_0_rgb(255_255_255/0.06)_inset,0_12px_48px_-12px_rgb(0_0_0/0.45)]"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -right-[20%] -top-[40%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.14),transparent_68%)]" />
        <div className="absolute -bottom-[30%] left-[10%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,hsl(220_90%_60%/0.08),transparent_70%)] dark:bg-[radial-gradient(circle,hsl(258_85%_60%/0.12),transparent_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,hsl(var(--foreground)/0.025)_48%,transparent_56%)]" />
      </div>

      <div className="relative flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-9">
        <div className="max-w-xl space-y-4">
          <Badge
            variant="secondary"
            className="w-fit gap-1.5 border border-border/60 bg-background/50 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted-foreground backdrop-blur-md"
          >
            <Sparkles className="size-3 text-primary" aria-hidden />
            Overview
          </Badge>
          <div className="space-y-2">
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem] sm:leading-tight">
              {greeting},{" "}
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {firstName}
              </span>
            </h1>
            <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Here&apos;s how your workspace is shaping up. Metrics are sample
              data until tasks and analytics sync—layout is ready when you plug
              in APIs.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-stretch lg:flex-row lg:items-center">
          <Button
            asChild
            size="sm"
            className="h-9 gap-1.5 shadow-md shadow-primary/10 transition-[transform,box-shadow] duration-200 hover:shadow-lg hover:shadow-primary/15 active:scale-[0.98]"
          >
            <Link href="/">
              View overview
              <ArrowUpRight className="size-3.5 opacity-70" aria-hidden />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled
            className="h-9 border-dashed text-muted-foreground"
          >
            New project · soon
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
