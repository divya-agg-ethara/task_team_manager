export type AccentColor = "copper" | "sage" | "coral" | "graphite";

export type DefaultLanding = "dashboard" | "projects";

export type UserPreferences = {
  accent: AccentColor;
  defaultLanding: DefaultLanding;
  compactDensity: boolean;
  showCompletedTasks: boolean;
  emailDigest: boolean;
  taskAssigned: boolean;
  taskDueReminder: boolean;
  projectUpdates: boolean;
  mentionNotifications: boolean;
  reduceMotion: boolean;
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  accent: "copper",
  defaultLanding: "dashboard",
  compactDensity: false,
  showCompletedTasks: true,
  emailDigest: true,
  taskAssigned: true,
  taskDueReminder: true,
  projectUpdates: true,
  mentionNotifications: true,
  reduceMotion: false,
};

export const ACCENT_OPTIONS: {
  id: AccentColor;
  label: string;
  description: string;
  swatch: string;
}[] = [
  {
    id: "copper",
    label: "Copper",
    description: "Warm editorial — default",
    swatch: "hsl(22 68% 48%)",
  },
  {
    id: "sage",
    label: "Sage",
    description: "Calm, grounded productivity",
    swatch: "hsl(152 32% 40%)",
  },
  {
    id: "coral",
    label: "Coral",
    description: "Human and approachable",
    swatch: "hsl(12 55% 52%)",
  },
  {
    id: "graphite",
    label: "Graphite",
    description: "Mature, minimal contrast",
    swatch: "hsl(25 12% 38%)",
  },
];
