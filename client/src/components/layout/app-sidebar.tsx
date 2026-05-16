"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants/config";

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  badge?: string;
};

const mainNav: NavItem[] = [
  { title: "Overview", href: "/", icon: LayoutDashboard },
];

const workNav: NavItem[] = [
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
    disabled: true,
    badge: "Soon",
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    disabled: true,
    badge: "Soon",
  },
];

const bottomNav: NavItem[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    disabled: true,
    badge: "Soon",
  },
];

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
      : pathname.startsWith(item.href) && item.href !== "/";

  const className = cn(
    "group relative flex w-full items-center gap-3 overflow-hidden rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-200",
    collapsed && "justify-center px-2",
    active && "text-foreground",
    active &&
      collapsed &&
      "bg-muted/70 shadow-sm ring-1 ring-border/55 dark:bg-muted/50",
    !active && "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
    item.disabled && "pointer-events-none cursor-not-allowed opacity-50",
  );

  const content = (
    <>
      <AnimatePresence>
        {active && !collapsed && (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-muted/90 to-muted/40 shadow-sm ring-1 ring-border/50 dark:from-muted/50 dark:to-muted/25 dark:ring-border/40"
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
          className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary"
          transition={{ type: "spring", stiffness: 520, damping: 38 }}
          aria-hidden
        />
      )}
      <item.icon className="relative z-[1] size-[18px] shrink-0 opacity-90 transition-transform duration-200 group-hover:scale-[1.03]" />
      {!collapsed && (
        <>
          <span className="relative z-[1] truncate">{item.title}</span>
          {item.badge ? (
            <span className="relative z-[1] ml-auto rounded-md bg-background/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-border/45">
              {item.badge}
            </span>
          ) : null}
        </>
      )}
    </>
  );

  if (item.disabled) {
    return (
      <div
        className={className}
        title={collapsed ? item.title : undefined}
        aria-disabled
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={className}
      title={collapsed ? item.title : undefined}
      onClick={onNavigate}
    >
      {content}
    </Link>
  );
}

type AppSidebarProps = {
  collapsed: boolean;
  onNavigate?: () => void;
  /** Render inside mobile sheet — full width, always expanded */
  embedded?: boolean;
};

export function AppSidebar({
  collapsed,
  onNavigate,
  embedded = false,
}: AppSidebarProps) {
  const width = embedded ? 280 : collapsed ? 72 : 260;

  return (
    <motion.aside
      className={
        embedded
          ? "flex h-full w-full flex-col border-0 bg-transparent"
          : "hidden border-r border-border/45 bg-card/55 shadow-[inset_-1px_0_0_0_hsl(var(--border)/0.35)] backdrop-blur-xl md:flex md:flex-col"
      }
      initial={false}
      animate={{ width }}
      transition={{ type: "spring", stiffness: 380, damping: 38 }}
    >
      <div className="flex h-14 shrink-0 items-center border-b border-border/50 px-3">
        <Link
          href="/"
          onClick={onNavigate}
          className={cn(
            "flex min-w-0 items-center gap-2 font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90",
            collapsed && "justify-center",
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow-sm">
            TT
          </span>
          {!collapsed && (
            <span className="truncate text-sm">{APP_NAME}</span>
          )}
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-3">
        <div className="space-y-1">
          {!collapsed && (
            <p className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Workspace
            </p>
          )}
          {mainNav.map((item) => (
            <NavButton
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        <div className="space-y-1">
          {!collapsed && (
            <p className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
              Work
            </p>
          )}
          {workNav.map((item) => (
            <NavButton
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        <div className="mt-auto space-y-1 border-t border-border/50 pt-4">
          {bottomNav.map((item) => (
            <NavButton
              key={item.href}
              item={item}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </nav>
    </motion.aside>
  );
}
