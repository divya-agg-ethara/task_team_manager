/** Placeholder dashboard data until project/task APIs are wired. */

export const weeklyFocusData = [
  { label: "Mon", value: 2 },
  { label: "Tue", value: 4 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 6 },
  { label: "Fri", value: 5 },
  { label: "Sat", value: 1 },
  { label: "Sun", value: 2 },
];

export type DashboardActivityItem = {
  id: string;
  title: string;
  detail: string;
  timeLabel: string;
  tone?: "neutral" | "accent" | "success";
};

export const recentActivityPlaceholder: DashboardActivityItem[] = [
  {
    id: "1",
    title: "Workspace synced",
    detail: "Your session is connected to TeamTask backend.",
    timeLabel: "Just now",
    tone: "success",
  },
  {
    id: "2",
    title: "Projects module",
    detail: "Create and switch teams across projects.",
    timeLabel: "Coming soon",
    tone: "neutral",
  },
  {
    id: "3",
    title: "Task workflows",
    detail: "Boards and deadlines will aggregate here.",
    timeLabel: "Coming soon",
    tone: "neutral",
  },
];

export type UpcomingDeadline = {
  id: string;
  title: string;
  label: string;
  dueDisplay: string;
  urgent?: boolean;
};

/** Empty initially — showcases empty-state UI until tasks API exists */
export const upcomingDeadlinesPlaceholder: UpcomingDeadline[] = [];

export type DashboardKpiStat = {
  id: string;
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
};

/** Demo KPI row — replace with API-backed metrics */
export const dashboardKpiStats: DashboardKpiStat[] = [
  {
    id: "throughput",
    label: "Throughput",
    value: "24",
    delta: "+8% vs last week",
    positive: true,
  },
  {
    id: "cycle",
    label: "Cycle time",
    value: "2.4d",
    delta: "Target < 3d",
  },
  {
    id: "wip",
    label: "WIP",
    value: "7",
    delta: "Healthy load",
  },
  {
    id: "focus",
    label: "Focus blocks",
    value: "12",
    delta: "This week",
  },
];
