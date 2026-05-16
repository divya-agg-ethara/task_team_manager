"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, useSidebar } from "@/components/layout/sidebar-context";
import { layout } from "@/lib/ui/surfaces";

function DashboardShellInner({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="relative flex min-h-0 min-h-screen w-full flex-1 overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,hsl(var(--primary)/0.09),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,hsl(var(--chart-1)/0.04),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,hsl(var(--muted)/0.4)_0%,transparent_28%)]"
        aria-hidden
      />
      <AppSidebar collapsed={collapsed} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <motion.main
          className="relative flex-1 overflow-x-hidden"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={cn(layout.contentMax, layout.contentPadding)}>
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardShellInner>{children}</DashboardShellInner>
    </SidebarProvider>
  );
}
