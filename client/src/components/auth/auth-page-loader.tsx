"use client";

import { motion } from "framer-motion";

export function AuthPageLoader({ label }: { label: string }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="size-10 rounded-full border-2 border-primary/30 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
