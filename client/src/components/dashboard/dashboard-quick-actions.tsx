"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FolderKanban, KanbanSquare, PlusCircle, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

export function DashboardQuickActions() {
  const { data } = useDashboardContext();
  const boardHref = data?.focusProjectId
    ? `/projects/${data.focusProjectId}`
    : "/projects";

  const actions = [
    {
      id: "board",
      label: "Open task board",
      desc: data?.focusProjectId ? "Jump to your latest project" : "Pick a project first",
      icon: KanbanSquare,
      href: boardHref,
    },
    {
      id: "project",
      label: "New project",
      desc: "Create a workspace for your team",
      icon: FolderKanban,
      href: "/projects?create=1",
    },
    {
      id: "projects",
      label: "All projects",
      desc: `${data?.projects.length ?? 0} workspace${data?.projects.length === 1 ? "" : "s"}`,
      icon: UsersRound,
      href: "/projects",
    },
  ];

  return (
    <Card className={cn(surfaces.card)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <PlusCircle className="size-4 text-muted-foreground" aria-hidden />
          Quick actions
        </CardTitle>
        <p className="text-xs text-muted-foreground">Shortcuts to your daily workflow</p>
      </CardHeader>
      <CardContent className="grid gap-2 pt-1">
        {actions.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + i * 0.04, duration: 0.3 }}
            whileHover={{ x: 2 }}
          >
            <Link
              href={a.href}
              className="group flex w-full items-center gap-3 rounded-xl border border-border/50 bg-muted/25 px-3 py-3 transition-[border,background] hover:border-border/75 hover:bg-muted/40"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/70 text-muted-foreground transition-colors group-hover:border-primary/35 group-hover:text-primary">
                <a.icon className="size-[18px]" aria-hidden />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-sm font-medium text-foreground">{a.label}</p>
                <p className="text-[11px] text-muted-foreground">{a.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
