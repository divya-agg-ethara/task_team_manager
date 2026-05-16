"use client";

import { motion, type Transition } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const premiumEase = [0.22, 1, 0.36, 1] as const;

export const premiumTransition: Transition = {
  duration: 0.45,
  ease: premiumEase,
};

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...premiumTransition, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function Stagger({ children, className, stagger = 0.07 }: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: premiumEase },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** Subtle hover lift wrapper for cards and tiles */
export function HoverLift({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}

/** Ambient floating glow — place inside relative overflow-hidden parent */
export function AmbientGlow({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "muted";
}) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        variant === "primary"
          ? "bg-[radial-gradient(circle,hsl(var(--primary)/0.12),transparent_68%)]"
          : "bg-[radial-gradient(circle,hsl(var(--muted-foreground)/0.08),transparent_70%)]",
        className,
      )}
      animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.05, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}
