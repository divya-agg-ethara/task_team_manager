"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Check,
  LayoutDashboard,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthHydrated } from "@/hooks/use-auth-hydration";
import { isWorkspaceAdmin } from "@/lib/auth/roles";
import { ACCENT_OPTIONS, type AccentColor } from "@/lib/preferences/types";
import { useAuthStore } from "@/stores/auth-store";
import { usePreferencesStore } from "@/stores/preferences-store";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UserMenu() {
  const router = useRouter();
  const hydrated = useAuthHydrated();
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const accent = usePreferencesStore((s) => s.accent);
  const setPreferences = usePreferencesStore((s) => s.setPreferences);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sessionReady = hydrated || Boolean(accessToken && user);

  function handleSignOut() {
    setOpen(false);
    clearSession();
    toast.success("Signed out");
    router.replace("/login");
  }

  if (!sessionReady) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="size-9 rounded-full border-border/70 bg-background/50"
        aria-label="Loading account"
        disabled
      />
    );
  }

  if (!user) {
    return (
      <Button type="button" variant="outline" size="icon" className="size-9 rounded-full" asChild>
        <Link href="/login" aria-label="Sign in">
          ?
        </Link>
      </Button>
    );
  }

  const initials = getInitials(user.name);
  const themeValue = mounted ? (theme ?? "system") : "system";
  const roleLabel = isWorkspaceAdmin(user.role) ? "Admin" : "Member";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "relative inline-flex size-9 shrink-0 items-center justify-center rounded-full",
            "border border-border/70 bg-background/60 shadow-sm",
            "ring-1 ring-transparent transition-[box-shadow,ring,transform] duration-200",
            "hover:bg-background hover:ring-border/40",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-[state=open]:ring-primary/30 data-[state=open]:shadow-md data-[state=open]:shadow-primary/10",
          )}
          aria-label="Open account menu"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <Avatar size="sm" className="size-8">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-[11px] font-semibold text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-72 overflow-hidden border-border/50 bg-popover/95 p-0 shadow-xl backdrop-blur-xl"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <header className="border-b border-border/50 bg-muted/20 px-3 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-sm font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              <Badge variant="secondary" className="mt-1.5 h-5 px-1.5 text-[10px] uppercase">
                {roleLabel}
              </Badge>
            </div>
          </div>
        </header>

        <nav className="p-1.5" aria-label="Account">
          <DropdownMenuItem asChild className="cursor-pointer gap-2 rounded-md">
            <Link href="/settings?tab=profile" onClick={() => setOpen(false)}>
              <User className="size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer gap-2 rounded-md">
            <Link href="/settings" onClick={() => setOpen(false)}>
              <Settings className="size-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer gap-2 rounded-md">
            <Link href="/" onClick={() => setOpen(false)}>
              <LayoutDashboard className="size-4" />
              My workspace
            </Link>
          </DropdownMenuItem>
        </nav>

        <DropdownMenuSeparator className="mx-0" />

        <section className="px-2 py-1.5">
          <DropdownMenuLabel className="px-1 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Theme
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={themeValue} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light" className="cursor-pointer gap-2 rounded-md">
              <Sun className="size-4" />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" className="cursor-pointer gap-2 rounded-md">
              <Moon className="size-4" />
              Dark
              {mounted && resolvedTheme === "dark" ? (
                <span className="sr-only"> (active)</span>
              ) : null}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system" className="cursor-pointer gap-2 rounded-md">
              <Monitor className="size-4" />
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </section>

        <DropdownMenuSeparator className="mx-0" />

        <section className="px-2 py-1.5">
          <DropdownMenuLabel className="flex items-center gap-1.5 px-1 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <Palette className="size-3.5" />
            Accent
          </DropdownMenuLabel>
          <div
            className="grid grid-cols-4 gap-1.5 px-1 pb-1"
            role="group"
            aria-label="Accent color"
            onPointerDown={(e) => e.preventDefault()}
          >
            {ACCENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                title={opt.label}
                onClick={() => setPreferences({ accent: opt.id as AccentColor })}
                className={cn(
                  "relative flex h-9 items-center justify-center rounded-lg border transition-all duration-200",
                  "hover:scale-[1.03] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  accent === opt.id
                    ? "border-primary/50 bg-primary/10 shadow-sm"
                    : "border-border/50 bg-muted/30 hover:border-border",
                )}
                aria-label={opt.label}
                aria-pressed={accent === opt.id}
              >
                <span
                  className="size-4 rounded-full ring-1 ring-black/10"
                  style={{ background: opt.swatch }}
                />
                {accent === opt.id ? (
                  <Check className="absolute right-0.5 top-0.5 size-3 text-primary" />
                ) : null}
              </button>
            ))}
          </div>
        </section>

        <DropdownMenuSeparator className="mx-0" />

        <nav className="p-1.5">
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault();
              handleSignOut();
            }}
            className="cursor-pointer gap-2 rounded-md"
          >
            <LogOut className="size-4" />
            Logout
          </DropdownMenuItem>
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
