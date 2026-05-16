"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  Bell,
  Check,
  KeyRound,
  Loader2,
  Monitor,
  Moon,
  Palette,
  Shield,
  SlidersHorizontal,
  Sun,
  User,
  Workflow,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsPanel } from "@/components/settings/settings-panel";
import { SettingsRow } from "@/components/settings/settings-row";
import { FadeIn } from "@/components/motion/premium";
import {
  AuthApiError,
  changePasswordRequest,
  fetchMe,
  updateProfileRequest,
} from "@/lib/api/auth";
import { ACCENT_OPTIONS } from "@/lib/preferences/types";
import {
  passwordSettingsResolver,
  profileSettingsResolver,
  type PasswordSettingsValues,
  type ProfileSettingsValues,
} from "@/lib/validation/settings-schemas";
import { surfaces, typography } from "@/lib/ui/surfaces";
import { useAuthStore } from "@/stores/auth-store";
import { usePreferencesStore } from "@/stores/preferences-store";
import { cn } from "@/lib/utils";

type SettingsTab =
  | "profile"
  | "appearance"
  | "notifications"
  | "workspace"
  | "account"
  | "security";

const NAV: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "workspace", label: "Workspace", icon: Workflow },
  { id: "account", label: "Account", icon: SlidersHorizontal },
  { id: "security", label: "Security", icon: Shield },
];

const VALID_TABS = new Set<SettingsTab>([
  "profile",
  "appearance",
  "notifications",
  "workspace",
  "account",
  "security",
]);

export function SettingsPage() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<SettingsTab>("profile");
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const requested = searchParams.get("tab");
    if (requested && VALID_TABS.has(requested as SettingsTab)) {
      setTab(requested as SettingsTab);
    }
  }, [searchParams]);
  const updateUser = useAuthStore((s) => s.updateUser);
  const [accountMeta, setAccountMeta] = useState<{
    createdAt?: string;
    updatedAt?: string;
  }>({});
  const [loadingMeta, setLoadingMeta] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await fetchMe();
        if (!cancelled) {
          updateUser(me);
          setAccountMeta({ createdAt: me.createdAt, updatedAt: me.updatedAt });
        }
      } catch {
        /* use cached user */
      } finally {
        if (!cancelled) setLoadingMeta(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [updateUser]);

  return (
    <div className="space-y-8 pb-14">
      <FadeIn>
        <header className={cn(surfaces.hero, "px-6 py-8 sm:px-9")}>
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(circle,hsl(var(--brand)/0.2),transparent_70%)] blur-2xl" />
          <p className={typography.sectionLabel}>Preferences</p>
          <h1 className={cn("mt-2 text-balance", typography.pageTitle)}>Settings</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Personalize how TeamTask looks, notifies you, and fits your workflow.
          </p>
        </header>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
        <nav className="flex gap-1 overflow-x-auto rounded-xl border border-border/50 bg-card/60 p-1 lg:flex-col lg:overflow-visible">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="min-w-0 space-y-6"
        >
          {tab === "profile" && <ProfileSection user={user} updateUser={updateUser} />}
          {tab === "appearance" && <AppearanceSection />}
          {tab === "notifications" && <NotificationsSection />}
          {tab === "workspace" && <WorkspaceSection />}
          {tab === "account" && (
            <AccountSection
              user={user}
              meta={accountMeta}
              loading={loadingMeta}
            />
          )}
          {tab === "security" && <SecuritySection />}
        </motion.div>
      </div>
    </div>
  );
}

function ProfileSection({
  user,
  updateUser,
}: {
  user: ReturnType<typeof useAuthStore.getState>["user"];
  updateUser: (u: NonNullable<typeof user>) => void;
}) {
  const form = useForm<ProfileSettingsValues>({
    resolver: profileSettingsResolver,
    defaultValues: { name: user?.name ?? "" },
  });

  useEffect(() => {
    if (user?.name) form.reset({ name: user.name });
  }, [user?.name, form]);

  async function onSubmit(values: ProfileSettingsValues) {
    try {
      const updated = await updateProfileRequest(values.name);
      updateUser(updated);
      toast.success("Profile updated");
    } catch (e) {
      toast.error(e instanceof AuthApiError ? e.message : "Could not save profile.");
    }
  }

  return (
    <SettingsPanel
      icon={User}
      title="Profile"
      description="How you appear to teammates across projects and tasks."
      footer={
        <Button
          type="submit"
          form="profile-form"
          size="sm"
          disabled={form.formState.isSubmitting}
          className="gap-2"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : null}
          Save profile
        </Button>
      }
    >
      <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Display name</Label>
          <Input
            id="profile-name"
            className="max-w-md border-border/70 bg-background/80"
            {...form.register("name")}
          />
          {form.formState.errors.name ? (
            <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <Input
            id="profile-email"
            value={user?.email ?? ""}
            disabled
            className="max-w-md border-border/70 bg-muted/30"
          />
          <p className="text-[11px] text-muted-foreground">
            Email is tied to your account. Contact support to change it.
          </p>
        </div>
      </form>
    </SettingsPanel>
  );
}

function AppearanceSection() {
  const { theme, setTheme } = useTheme();
  const accent = usePreferencesStore((s) => s.accent);
  const reduceMotion = usePreferencesStore((s) => s.reduceMotion);
  const setPreferences = usePreferencesStore((s) => s.setPreferences);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function saveAppearance() {
    toast.success("Appearance preferences saved");
  }

  const themeOptions = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <SettingsPanel
      icon={Palette}
      title="Appearance"
      description="Theme, accent color, and motion preferences."
      footer={
        <Button type="button" size="sm" onClick={saveAppearance}>
          Save appearance
        </Button>
      }
    >
      <SettingsRow label="Theme" description="Choose light, dark, or match your OS.">
        <div className="flex flex-wrap gap-2">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const active = mounted && theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                  active
                    ? "border-primary/40 bg-primary/10 text-primary ring-1 ring-primary/25"
                    : "border-border/60 bg-background/60 text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </SettingsRow>

      <SettingsRow
        label="Accent color"
        description="Subtle brand tint across buttons, charts, and highlights."
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ACCENT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setPreferences({ accent: opt.id })}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-all",
                accent === opt.id
                  ? "border-primary/50 bg-primary/5 ring-2 ring-primary/25"
                  : "border-border/50 bg-background/50 hover:border-border",
              )}
            >
              <span
                className="size-6 rounded-full shadow-inner ring-1 ring-black/10"
                style={{ background: opt.swatch }}
              />
              <span className="text-xs font-medium">{opt.label}</span>
              {accent === opt.id ? (
                <Check className="size-3.5 text-primary" aria-hidden />
              ) : null}
            </button>
          ))}
        </div>
      </SettingsRow>

      <SettingsRow
        label="Reduce motion"
        description="Minimize animations for a calmer interface."
      >
        <Switch
          checked={reduceMotion}
          onCheckedChange={(v) => setPreferences({ reduceMotion: v })}
        />
      </SettingsRow>
    </SettingsPanel>
  );
}

function NotificationsSection() {
  const prefs = usePreferencesStore();
  const setPreferences = usePreferencesStore((s) => s.setPreferences);

  function save() {
    toast.success("Notification preferences saved");
  }

  return (
    <SettingsPanel
      icon={Bell}
      title="Notifications"
      description="Control what you want to hear about — delivery expands as we ship email."
      footer={
        <Button type="button" size="sm" onClick={save}>
          Save notifications
        </Button>
      }
    >
      <SettingsRow
        label="Weekly digest"
        description="Summary of completed tasks and upcoming deadlines."
      >
        <Switch
          checked={prefs.emailDigest}
          onCheckedChange={(v) => setPreferences({ emailDigest: v })}
        />
      </SettingsRow>
      <SettingsRow label="Task assigned to me" description="When a teammate assigns you work.">
        <Switch
          checked={prefs.taskAssigned}
          onCheckedChange={(v) => setPreferences({ taskAssigned: v })}
        />
      </SettingsRow>
      <SettingsRow label="Due date reminders" description="Nudges before tasks are due.">
        <Switch
          checked={prefs.taskDueReminder}
          onCheckedChange={(v) => setPreferences({ taskDueReminder: v })}
        />
      </SettingsRow>
      <SettingsRow label="Project updates" description="Membership and workspace changes.">
        <Switch
          checked={prefs.projectUpdates}
          onCheckedChange={(v) => setPreferences({ projectUpdates: v })}
        />
      </SettingsRow>
      <SettingsRow label="Mentions" description="When someone references you in a task.">
        <Switch
          checked={prefs.mentionNotifications}
          onCheckedChange={(v) => setPreferences({ mentionNotifications: v })}
        />
      </SettingsRow>
    </SettingsPanel>
  );
}

function WorkspaceSection() {
  const prefs = usePreferencesStore();
  const setPreferences = usePreferencesStore((s) => s.setPreferences);

  function save() {
    toast.success("Workspace preferences saved");
  }

  return (
    <SettingsPanel
      icon={Workflow}
      title="Workspace"
      description="Defaults for how you navigate projects and boards."
      footer={
        <Button type="button" size="sm" onClick={save}>
          Save workspace
        </Button>
      }
    >
      <SettingsRow label="Default landing" description="Where you go after signing in.">
        <Select
          value={prefs.defaultLanding}
          onValueChange={(v) =>
            setPreferences({ defaultLanding: v as "dashboard" | "projects" })
          }
        >
          <SelectTrigger className="w-[180px] border-border/70 bg-background/80">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dashboard">Dashboard</SelectItem>
            <SelectItem value="projects">Projects</SelectItem>
          </SelectContent>
        </Select>
      </SettingsRow>
      <SettingsRow
        label="Compact density"
        description="Tighter spacing on lists and cards."
      >
        <Switch
          checked={prefs.compactDensity}
          onCheckedChange={(v) => setPreferences({ compactDensity: v })}
        />
      </SettingsRow>
      <SettingsRow
        label="Show completed tasks"
        description="Display done items on Kanban boards by default."
      >
        <Switch
          checked={prefs.showCompletedTasks}
          onCheckedChange={(v) => setPreferences({ showCompletedTasks: v })}
        />
      </SettingsRow>
    </SettingsPanel>
  );
}

function AccountSection({
  user,
  meta,
  loading,
}: {
  user: ReturnType<typeof useAuthStore.getState>["user"];
  meta: { createdAt?: string; updatedAt?: string };
  loading: boolean;
}) {
  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  return (
    <SettingsPanel
      icon={SlidersHorizontal}
      title="Account"
      description="Account metadata and identifiers."
    >
      <div className="space-y-3 py-2 text-sm">
        <div className="flex justify-between gap-4 border-b border-border/30 py-3">
          <span className="text-muted-foreground">User ID</span>
          <span className="max-w-[200px] truncate font-mono text-xs text-foreground">
            {user?.id ?? "—"}
          </span>
        </div>
        <div className="flex justify-between gap-4 border-b border-border/30 py-3">
          <span className="text-muted-foreground">Member since</span>
          <span className="text-foreground">
            {loading ? "Loading…" : formatDate(meta.createdAt)}
          </span>
        </div>
        <div className="flex justify-between gap-4 py-3">
          <span className="text-muted-foreground">Last updated</span>
          <span className="text-foreground">
            {loading ? "Loading…" : formatDate(meta.updatedAt)}
          </span>
        </div>
      </div>
    </SettingsPanel>
  );
}

function SecuritySection() {
  const clearSession = useAuthStore((s) => s.clearSession);
  const form = useForm<PasswordSettingsValues>({
    resolver: passwordSettingsResolver,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: PasswordSettingsValues) {
    try {
      await changePasswordRequest(values);
      toast.success("Password updated");
      form.reset();
    } catch (e) {
      toast.error(e instanceof AuthApiError ? e.message : "Could not update password.");
    }
  }

  function signOutEverywhere() {
    clearSession();
    toast.success("Signed out on this device");
    window.location.href = "/login";
  }

  return (
    <>
      <SettingsPanel
        icon={KeyRound}
        title="Password"
        description="Update your password regularly to keep your account secure."
        footer={
          <Button
            type="submit"
            form="password-form"
            size="sm"
            disabled={form.formState.isSubmitting}
            className="gap-2"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : null}
            Update password
          </Button>
        }
      >
        <form
          id="password-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md space-y-4 py-2"
        >
          {(["currentPassword", "newPassword", "confirmPassword"] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>
                {field === "currentPassword"
                  ? "Current password"
                  : field === "newPassword"
                    ? "New password"
                    : "Confirm password"}
              </Label>
              <Input
                id={field}
                type="password"
                autoComplete={
                  field === "newPassword" ? "new-password" : "current-password"
                }
                className="border-border/70 bg-background/80"
                {...form.register(field)}
              />
              {form.formState.errors[field] ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors[field]?.message}
                </p>
              ) : null}
            </div>
          ))}
        </form>
      </SettingsPanel>

      <SettingsPanel
        icon={Shield}
        title="Sessions"
        description="Manage active sessions on your devices."
      >
        <SettingsRow
          label="Sign out"
          description="End your session on this browser. Other devices stay signed in until we add full session management."
        >
          <Button type="button" variant="outline" size="sm" onClick={signOutEverywhere}>
            Sign out
          </Button>
        </SettingsRow>
      </SettingsPanel>
    </>
  );
}
