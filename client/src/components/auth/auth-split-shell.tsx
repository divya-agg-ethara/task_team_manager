"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { APP_NAME } from "@/lib/constants/config";
import { cn } from "@/lib/utils";

type AuthSplitShellProps = {
  children: ReactNode;
  rightFooter?: ReactNode;
};

export function AuthSplitShell({ children, rightFooter }: AuthSplitShellProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[hsl(var(--background))]">
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-40%,hsl(var(--primary)/0.18),transparent_55%)] dark:bg-[radial-gradient(ellipse_120%_80%_at_50%_-40%,hsl(var(--primary)/0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_100%,hsl(220_90%_56%/0.12),transparent_50%)] dark:bg-[radial-gradient(ellipse_70%_50%_at_100%_100%,hsl(260_80%_60%/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_0%_100%,hsl(200_85%_60%/0.08),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.35] dark:opacity-25 [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_85%_60%_at_50%_40%,#000_45%,transparent)]" />
      </div>

      <div className="mx-auto flex min-h-[100dvh] max-w-[1200px] flex-col lg:max-w-none lg:flex-row">
        {/* Brand panel — desktop */}
        <motion.div
          className="relative hidden min-h-[100dvh] flex-1 flex-col justify-between border-border/40 px-10 py-12 lg:flex lg:max-w-[52%] lg:border-r"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -left-20 top-24 size-[420px] rounded-full bg-gradient-to-br from-violet-500/25 via-fuchsia-500/15 to-transparent blur-3xl"
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.65, 0.85, 0.65],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 right-0 size-[360px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent blur-3xl"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.75, 0.5],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute left-1/3 top-1/2 size-32 rounded-full bg-primary/20 blur-2xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 space-y-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-80"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
                TT
              </span>
              <span>{APP_NAME}</span>
            </Link>

            <div className="max-w-md space-y-5 pt-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/90 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.06]"
              >
                <Sparkles className="size-3.5 text-amber-400/90" />
                Built for focused teams
              </motion.div>
              <motion.h1
                className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-[2.35rem] md:leading-[1.1]"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                Task clarity.
                <br />
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent dark:from-white dark:to-white/70">
                  Team momentum.
                </span>
              </motion.h1>
              <motion.p
                className="text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32, duration: 0.45 }}
              >
                A workspace that matches how modern teams ship — calm interface,
                sharp execution. Sign in and get to the work that matters.
              </motion.p>
            </div>
          </div>

          <motion.p
            className="relative z-10 max-w-sm text-xs leading-relaxed text-muted-foreground/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Inspired by products that respect your time. Crafted for recruiters
            who notice the details.
          </motion.p>
        </motion.div>

        {/* Form column */}
        <div
          className={cn(
            "relative flex flex-1 flex-col justify-center px-5 py-12 sm:px-8 lg:min-h-[100dvh] lg:max-w-none lg:py-16 lg:pl-12 lg:pr-10",
          )}
        >
          <div className="mb-8 flex items-center justify-between gap-3 lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/85 text-xs font-bold text-primary-foreground shadow-md">
                TT
              </span>
              {APP_NAME}
            </Link>
          </div>

          <motion.div
            className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto lg:mr-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Glass card */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-violet-500/10 opacity-60 blur-sm dark:from-white/10 dark:to-violet-500/20" aria-hidden />
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-background/50 dark:shadow-black/40 sm:p-8">
                {children}
              </div>
            </div>
            {rightFooter ? (
              <div className="mt-8 text-center text-sm text-muted-foreground">
                {rightFooter}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
