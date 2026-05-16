"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Flame, Layers, Zap } from "lucide-react";
import {
  weeklyFocusData,
} from "@/components/dashboard/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { surfaces } from "@/lib/ui/surfaces";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "10px",
  fontSize: "12px",
  color: "hsl(var(--popover-foreground))",
  boxShadow: "0 8px 30px rgb(0 0 0 / 0.12)",
};

export function ProductivityOverview() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <motion.div
        className="lg:col-span-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className={cn("relative h-full", surfaces.card, surfaces.cardInteractive)}>
          <div className="pointer-events-none absolute right-8 top-0 h-28 w-[45%] bg-gradient-to-b from-primary/8 to-transparent" />
          <CardHeader className="relative pb-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base font-semibold tracking-tight">
                  Focus rhythm
                </CardTitle>
                <CardDescription>
                  Completed work units (preview) — plugs into analytics later.
                </CardDescription>
              </div>
              <span className="rounded-lg border border-border/60 bg-muted/40 p-2 text-muted-foreground">
                <Activity className="size-4" aria-hidden />
              </span>
            </div>
          </CardHeader>
          <CardContent className="relative pb-6">
            <div className="-mx-2 h-[200px] w-[calc(100%+16px)] sm:h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyFocusData}
                  margin={{ top: 12, right: 12, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="focusFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    vertical={false}
                    opacity={0.6}
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    dy={6}
                  />
                  <YAxis
                    hide
                    domain={[0, "dataMax + 2"]}
                  />
                  <Tooltip
                    cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                    contentStyle={tooltipStyle}
                    formatter={(value) => [
                      value != null ? String(value) : "—",
                      "Intensity",
                    ]}
                    labelFormatter={(label) => `Week · ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#focusFill)"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-3"
      >
        <StatGlass
          title="Active streak"
          value="—"
          hint="Tasks module"
          icon={Flame}
        />
        <StatGlass
          title="Projects"
          value="—"
          hint="Create first project"
          icon={Layers}
        />
        <StatGlass
          title="Velocity"
          value="+12%"
          hint="Vs last sprint (demo)"
          icon={Zap}
          highlight
        />
      </motion.div>
    </div>
  );
}

function StatGlass({
  title,
  value,
  hint,
  icon: Icon,
  highlight,
}: {
  title: string;
  value: string;
  hint: string;
  icon: typeof Activity;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "group rounded-xl border border-primary/25 bg-gradient-to-br from-primary/10 via-transparent to-muted/40 p-4 shadow-[0_1px_0_0_hsl(var(--foreground)/0.03)_inset] ring-1 ring-primary/15 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-10px_hsl(var(--primary)/0.2)]"
          : cn(
              "group rounded-xl border border-border/45 bg-gradient-to-br from-muted/30 to-muted/10 p-4 shadow-[0_1px_0_0_hsl(var(--foreground)/0.02)_inset] ring-1 ring-border/20 backdrop-blur-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-border/60 hover:shadow-[0_8px_24px_-12px_hsl(var(--foreground)/0.08)]",
            )
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-foreground">
            {value}
          </p>
          <p className="mt-2 text-[11px] text-muted-foreground transition-colors group-hover:text-muted-foreground/90">
            {hint}
          </p>
        </div>
        <span className="rounded-lg border border-border/50 bg-background/60 p-2 text-muted-foreground transition-colors group-hover:text-foreground">
          <Icon className="size-4" aria-hidden />
        </span>
      </div>
    </div>
  );
}
