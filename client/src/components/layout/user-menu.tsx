"use client";

import { ChevronDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function UserMenu() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);

  function handleSignOut() {
    clearSession();
    toast.success("Signed out");
    router.replace("/login");
  }

  if (!user) return null;

  const initials = user.name
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-9 gap-1 rounded-lg border-border/70 bg-background/50 px-1.5 pl-1 shadow-sm ring-1 ring-transparent transition-[box-shadow,ring] hover:bg-background/80 hover:ring-border/35"
          aria-label="Account menu"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/85 text-[11px] font-semibold text-primary-foreground shadow-inner shadow-primary/20">
            {initials}
          </span>
          <ChevronDown
            className="size-3.5 text-muted-foreground opacity-70"
            aria-hidden
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 border-border/50 bg-popover/95 shadow-xl backdrop-blur-xl"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="gap-2 text-muted-foreground">
          <User className="size-4" />
          Profile (soon)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
