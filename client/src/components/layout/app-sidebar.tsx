"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { isWorkspaceAdmin } from "@/lib/auth/roles";
import { useAuthStore } from "@/stores/auth-store";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants/config";

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

function getNavForRole(role: import("@/types/auth").WorkspaceRole | undefined): NavItem[] {
  if (isWorkspaceAdmin(role)) {
    return [
      { title: "Overview", href: "/", icon: LayoutDashboard },
      { title: "Teams", href: "/teams", icon: Users },
      { title: "Projects", href: "/projects", icon: FolderKanban },
      { title: "Tasks", href: "/tasks", icon: CheckSquare },
      { title: "Analytics", href: "/analytics", icon: BarChart3 },
      { title: "Settings", href: "/settings", icon: Settings },
    ];
  }

  return [
    { title: "Overview", href: "/", icon: LayoutDashboard },
    { title: "My tasks", href: "/tasks", icon: CheckSquare },
    { title: "Projects", href: "/projects", icon: FolderKanban },
    { title: "Teams", href: "/teams", icon: Users },
    { title: "Settings", href: "/settings", icon: Settings },
  ];
}

function NavButton({
  item,
  collapsed,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? item.title : undefined}
      className={cn(
        "group relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-3 py-3 text-base font-medium transition-colors duration-200",
        collapsed && "justify-center px-2",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:bg-muted/55 hover:text-foreground",
      )}
    >
      <AnimatePresence>
        {active && !collapsed && (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-[hsl(var(--brand-muted)/0.7)] via-card/80 to-transparent ring-1 ring-[hsl(var(--brand)/0.15)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden
          />
        )}
      </AnimatePresence>
      {!collapsed && active && (
        <motion.span
          layoutId="nav-active-accent"
          className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 520, damping: 38 }}
          aria-hidden
        />
      )}
      <item.icon
        className={cn(
          "relative z-[1] size-5 shrink-0",
          active ? "text-primary" : "opacity-85",
        )}
      />
      {!collapsed && <span className="relative z-[1] truncate">{item.title}</span>}
    </Link>
  );
}

type AppSidebarProps = {
  collapsed: boolean;
  onNavigate?: () => void;
  embedded?: boolean;
};

export function AppSidebar({ collapsed, onNavigate, embedded = false }: AppSidebarProps) {
  const role = useAuthStore((s) => s.user?.role);
  const primaryNav = getNavForRole(role);
  const width = embedded ? 300 : collapsed ? 76 : 264;

  return (
    <motion.aside
      className={
        embedded
          ? "flex h-full w-full flex-col bg-transparent"
          : "hidden border-r border-border/45 bg-gradient-to-b from-[hsl(var(--sidebar-tint))] via-card/50 to-background/95 md:flex md:flex-col"
      }
      initial={false}
      animate={{ width }}
      transition={{ type: "spring", stiffness: 380, damping: 38 }}
    >
      <div className="flex h-[3.75rem] shrink-0 items-center border-b border-border/45 px-3">
        <Link
          href="/"
          onClick={onNavigate}
          className={cn(
            "flex min-w-0 items-center gap-2.5 font-semibold tracking-tight text-foreground",
            collapsed && "justify-center",
          )}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg brand-gradient-bg text-sm font-bold text-primary-foreground shadow-md shadow-[hsl(var(--brand)/0.3)]">
            TT
          </span>
          {!collapsed && <span className="truncate text-base">{APP_NAME}</span>}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {!collapsed && (
          <p className="px-3 pb-2 pt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {isWorkspaceAdmin(role) ? "Admin workspace" : "My workspace"}
          </p>
        )}
        {primaryNav.map((item) => (
          <NavButton
            key={item.href}
            item={item}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </motion.aside>
  );
}
