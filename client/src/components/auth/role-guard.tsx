"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { isWorkspaceAdmin } from "@/lib/auth/roles";
import { useAuthStore } from "@/stores/auth-store";
import type { WorkspaceRole } from "@/types/auth";

type RoleGuardProps = {
  roles: WorkspaceRole[];
  children: ReactNode;
  fallback?: ReactNode;
};

export function RoleGuard({ roles, children, fallback = null }: RoleGuardProps) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const allowed =
    user &&
    (roles.includes(user.role) ||
      (roles.includes("ADMIN") && isWorkspaceAdmin(user.role)));

  useEffect(() => {
    if (user && !allowed) {
      router.replace("/");
    }
  }, [user, allowed, router]);

  if (!user) return null;
  if (!allowed) return <>{fallback}</>;
  return <>{children}</>;
}
