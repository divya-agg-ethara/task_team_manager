"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { premiumEase } from "@/components/motion/premium";
import { cn } from "@/lib/utils";

export function KanbanColumnEmpty({
  onAdd,
  label = "Drop tasks here",
}: {
  onAdd?: () => void;
  label?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onAdd}
      disabled={!onAdd}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: premiumEase }}
      className={cn(
        "flex min-h-[120px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/50 bg-muted/15 px-4 py-8 text-center transition-colors",
        onAdd && "cursor-pointer hover:border-border/70 hover:bg-muted/25",
        !onAdd && "cursor-default",
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg border border-border/40 bg-background/60 text-muted-foreground">
        {onAdd ? <Plus className="size-3.5" /> : null}
      </span>
      <p className="text-[11px] text-muted-foreground">{label}</p>
      {onAdd ? (
        <p className="text-[10px] font-medium text-primary/80">Add task</p>
      ) : null}
    </motion.button>
  );
}
