"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  KanbanSquare,
  PlusCircle,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    id: "project",
    label: "New project",
    desc: "Spin up space for your team",
    icon: KanbanSquare,
    disabled: true,
  },
  {
    id: "task",
    label: "Add task",
    desc: "Quick capture to inbox",
    icon: ClipboardList,
    disabled: true,
  },
  {
    id: "invite",
    label: "Invite people",
    desc: "Collaborate instantly",
    icon: UsersRound,
    disabled: true,
  },
];

export function QuickActionsPanel() {
  return (
    <Card className="border-border/50 bg-card/90 shadow-sm ring-1 ring-border/25 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <PlusCircle className="size-4 text-muted-foreground" aria-hidden />
          Quick actions
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Shortcuts will wire into real flows next
        </p>
      </CardHeader>
      <CardContent className="grid gap-2 pt-1">
        {actions.map((a, i) => (
          <motion.button
            key={a.id}
            type="button"
            disabled={a.disabled}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1 + i * 0.04,
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
              a.disabled ? undefined : { scale: 1.01, translateX: 2 }
            }
            whileTap={a.disabled ? undefined : { scale: 0.99 }}
            onClick={() => {
              toast.message("Coming soon", {
                description: `${a.label} will open when wired to the backend.`,
              });
            }}
            className="group flex items-center gap-3 rounded-xl border border-border/50 bg-muted/25 px-3 py-3 text-left transition-[border,background] duration-200 hover:border-border/75 hover:bg-muted/40 disabled:pointer-events-none disabled:opacity-50"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/70 text-muted-foreground transition-colors group-hover:border-primary/35 group-hover:text-primary">
              <a.icon className="size-[18px]" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{a.label}</p>
              <p className="text-[11px] text-muted-foreground">{a.desc}</p>
            </div>
          </motion.button>
        ))}
      </CardContent>
    </Card>
  );
}
