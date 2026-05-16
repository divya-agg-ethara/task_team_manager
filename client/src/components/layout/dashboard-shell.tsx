"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, useSidebar } from "@/components/layout/sidebar-context";

function DashboardShellInner({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="relative flex min-h-0 min-h-screen w-full flex-1 overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,hsl(var(--muted)/0.35)_0%,transparent_32%)]"
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
          <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
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
