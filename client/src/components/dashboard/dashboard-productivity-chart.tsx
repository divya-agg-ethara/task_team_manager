"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardSection } from "@/components/dashboard/dashboard-section";
import { useDashboardContext } from "@/components/dashboard/dashboard-context";
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

export function DashboardProductivityChart() {
  const { data } = useDashboardContext();
  const trend = data?.completionTrend ?? [];
  const total = trend.reduce((n, p) => n + p.completed, 0);

  return (
    <DashboardSection
      label="Momentum"
      title="Productivity trends"
      description="Tasks completed per day across all your projects — last 7 days."
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className={cn(surfaces.card, "h-full")}>
          <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
            <div>
              <CardTitle className="text-base font-semibold tracking-tight">
                Completion rhythm
              </CardTitle>
              <CardDescription>
                {total > 0
                  ? `${total} task${total === 1 ? "" : "s"} completed this week`
                  : "Complete tasks on your boards to see momentum build."}
              </CardDescription>
            </div>
            <span className="rounded-lg border border-border/60 bg-muted/30 p-2 text-muted-foreground">
              <TrendingUp className="size-4" aria-hidden />
            </span>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="h-[200px] w-full sm:h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    vertical={false}
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    width={28}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted)/0.35)" }}
                    contentStyle={tooltipStyle}
                    formatter={(value) => [
                      value != null ? String(value) : "0",
                      "Completed",
                    ]}
                  />
                  <Bar
                    dataKey="completed"
                    fill="hsl(var(--primary))"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardSection>
  );
}
