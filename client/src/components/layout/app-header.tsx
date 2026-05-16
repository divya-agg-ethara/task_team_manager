"use client";

import { Menu, PanelLeftClose, PanelLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useSidebar } from "@/components/layout/sidebar-context";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useIsMobile } from "@/hooks/use-media-query";

import { UserMenu } from "@/components/layout/user-menu";
import { useAuthStore } from "@/stores/auth-store";

export function AppHeader() {
  const { collapsed, toggleCollapsed, setMobileOpen, mobileOpen } =
    useSidebar();
  const isMobile = useIsMobile();

  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(/\s+/)[0] ?? "there";

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-border/50 bg-background/75 px-3 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60 sm:gap-4 sm:px-5">
      {isMobile ? (
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-9 shrink-0 rounded-lg border-border/60 bg-background/50 shadow-sm transition-[transform,box-shadow] hover:bg-background/80 active:scale-[0.97]"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(100vw-2rem,300px)] border-border/50 bg-card/95 p-0 shadow-2xl backdrop-blur-xl"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col">
              <AppSidebar
                embedded
                collapsed={false}
                onNavigate={() => setMobileOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-9 shrink-0 rounded-lg border-border/60 bg-background/50 shadow-sm transition-[transform,box-shadow] hover:bg-background/80 active:scale-[0.97]"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeft className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </Button>
      )}

      <div className="hidden min-w-0 flex-1 max-sm:hidden sm:block">
        <button
          type="button"
          className="group flex w-full max-w-md items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-3 py-2 text-left text-sm text-muted-foreground shadow-sm ring-1 ring-transparent transition-[border,background,box-shadow,ring] duration-200 hover:border-border/70 hover:bg-muted/45 hover:text-foreground hover:ring-border/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Search (coming soon)"
        >
          <Search className="size-4 shrink-0 opacity-60 transition-opacity group-hover:opacity-80" />
          <span className="flex-1 truncate text-[13px]">Search workspace…</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded-md border border-border/60 bg-background/80 px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-sm sm:inline-flex">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="min-w-0 flex-1 sm:hidden">
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Overview
          </span>
          <span className="truncate text-[11px] text-muted-foreground">
            Hey {firstName} — stay in flow
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
