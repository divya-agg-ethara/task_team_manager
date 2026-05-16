"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ClipboardList,
  KanbanSquare,
  PlusCircle,
  UsersRound,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

type QuickAction = {
  id: string;
  label: string;
  desc: string;
  icon: typeof KanbanSquare;
  disabled?: boolean;
  href?: string;
};

const actions: QuickAction[] = [
  {
    id: "project",
    label: "New project",
    desc: "Spin up space for your team",
    icon: KanbanSquare,
    href: "/projects?create=1",
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
    <Card className={cn(surfaces.card)}>
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
        {actions.map((a, i) => {
          const className =
            "group flex w-full items-center gap-3 rounded-xl border border-border/50 bg-muted/25 px-3 py-3 text-left transition-[border,background] duration-200 hover:border-border/75 hover:bg-muted/40 disabled:pointer-events-none disabled:opacity-50";
          const inner = (
            <>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/70 text-muted-foreground transition-colors group-hover:border-primary/35 group-hover:text-primary">
                <a.icon className="size-[18px]" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{a.label}</p>
                <p className="text-[11px] text-muted-foreground">{a.desc}</p>
              </div>
            </>
          );

          if (a.href && !a.disabled) {
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.04,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.01, translateX: 2 }}
                whileTap={{ scale: 0.99 }}
              >
                <Link href={a.href} className={className}>
                  {inner}
                </Link>
              </motion.div>
            );
          }

          return (
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
              className={className}
            >
              {inner}
            </motion.button>
          );
        })}
      </CardContent>
    </Card>
  );
}
