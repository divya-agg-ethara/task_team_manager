"use client";

import { useRouter, usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useAuthHydrated } from "@/hooks/use-auth-hydration";
import { AuthPageLoader } from "@/components/auth/auth-page-loader";

export function AuthGuard({ children }: { children: ReactNode }) {
  const hydrated = useAuthHydrated();
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);
  const hasSession = Boolean(accessToken && userId);

  useEffect(() => {
    if (!hydrated) return;
    if (!hasSession) {
      const from =
        pathname && pathname !== "/login" ? `?from=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${from}`);
    }
  }, [hydrated, hasSession, router, pathname]);

  if (!hydrated) {
    return <AuthPageLoader label="Restoring your session…" />;
  }

  if (!hasSession) {
    return <AuthPageLoader label="Redirecting to sign in…" />;
  }

  return <>{children}</>;
}
