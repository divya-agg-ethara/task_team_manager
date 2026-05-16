/** Shared premium surface classes — warm editorial productivity */

export const surfaces = {
  hero: [
    "relative overflow-hidden rounded-2xl",
    "border border-border/55",
    "bg-gradient-to-br from-card via-card/98 to-[hsl(var(--section-tint))]",
    "shadow-[0_1px_0_0_hsl(var(--foreground)/0.04)_inset,0_14px_44px_-18px_hsl(var(--brand)/0.14)]",
    "ring-1 ring-border/40",
  ].join(" "),

  card: [
    "relative overflow-hidden rounded-xl",
    "border border-border/50",
    "bg-gradient-to-br from-card/98 via-card/95 to-[hsl(var(--section-tint)/0.45)]",
    "shadow-[0_1px_0_0_hsl(var(--foreground)/0.03)_inset,0_6px_28px_-12px_hsl(var(--brand)/0.1)]",
    "ring-1 ring-border/30",
  ].join(" "),

  cardInteractive: [
    "transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:-translate-y-0.5 hover:border-[hsl(var(--brand)/0.22)]",
    "hover:shadow-[0_1px_0_0_hsl(var(--foreground)/0.04)_inset,0_18px_50px_-16px_hsl(var(--brand)/0.16)]",
  ].join(" "),

  stat: [
    "rounded-xl border border-border/45",
    "bg-gradient-to-br from-background/95 to-[hsl(var(--brand-muted)/0.5)]",
    "px-4 py-4 shadow-[0_1px_0_0_hsl(var(--foreground)/0.03)_inset]",
    "ring-1 ring-border/25",
  ].join(" "),

  empty: [
    "relative overflow-hidden rounded-2xl",
    "border border-dashed border-border/55",
    "bg-gradient-to-br from-[hsl(var(--brand-muted)/0.4)] via-card/55 to-muted/15",
    "ring-1 ring-border/25",
  ].join(" "),

  settingsPanel: [
    "rounded-xl border border-border/50",
    "bg-gradient-to-br from-card via-card/98 to-[hsl(var(--section-tint)/0.55)]",
    "ring-1 ring-border/30",
  ].join(" "),

  glowPrimary:
    "pointer-events-none absolute rounded-full bg-[radial-gradient(circle,hsl(var(--brand)/0.14),transparent_70%)] blur-3xl",
} as const;

export const typography = {
  sectionLabel:
    "text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground",
  pageTitle:
    "text-[2rem] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[2.375rem]",
  sectionTitle:
    "text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
  cardTitle: "text-lg font-semibold tracking-tight text-foreground",
  body: "text-base leading-relaxed text-muted-foreground",
  caption: "text-sm text-muted-foreground",
} as const;

/** Main content column — narrower than full HD so UI reads at comfortable scale */
export const layout = {
  contentMax: "mx-auto w-full max-w-6xl",
  contentPadding: "px-4 py-7 sm:px-6 sm:py-9",
} as const;
