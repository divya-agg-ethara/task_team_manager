"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthHydrated } from "@/hooks/use-auth-hydration";
import { AuthPageLoader } from "@/components/auth/auth-page-loader";

export function GuestOnly({ children }: { children: ReactNode }) {
  const hydrated = useAuthHydrated();
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!hydrated) return;
    if (accessToken) {
      router.replace("/");
    }
  }, [hydrated, accessToken, router]);

  if (!hydrated) {
    return <AuthPageLoader label="Loading…" />;
  }

  if (accessToken) {
    return <AuthPageLoader label="Loading your workspace…" />;
  }

  return <>{children}</>;
}
