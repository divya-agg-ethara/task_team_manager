"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { AuthRehydration } from "@/components/auth/auth-rehydration";
import { SessionSync } from "@/components/auth/session-sync";
import { AccentSync } from "@/components/preferences/accent-sync";
import { QueryProvider } from "@/components/providers/query-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange={false}
      >
        <AuthRehydration />
        <AccentSync />
        <SessionSync />
        {children}
        <Toaster position="top-right" richColors closeButton />
      </ThemeProvider>
    </QueryProvider>
  );
}
