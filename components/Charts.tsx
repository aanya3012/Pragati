"use client";

import { topicMastery, weeklyLogs } from "@/lib/data";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const cohort = [
  { name: "You", momentum: 94, consistency: 88 },
  { name: "Cohort avg", momentum: 71, consistency: 67 },
  { name: "Top 10%", momentum: 106, consistency: 96 }
];

export function GrowthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={weeklyLogs}>
        <defs>
          <linearGradient id="scoreFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#C6A969" stopOpacity={0.34} />
            <stop offset="100%" stopColor="#C6A969" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" stroke="#7C8796" axisLine={false} tickLine={false} />
        <YAxis hide domain={[50, 100]} />
        <Tooltip contentStyle={{ background: "#171B22", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, color: "#F5F7FA" }} />
        <Area className="chart-line" type="monotone" dataKey="score" stroke="#C6A969" strokeWidth={4} fill="url(#scoreFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MasteryRadar() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={topicMastery}>
        <PolarGrid stroke="rgba(255,255,255,.12)" />
        <PolarAngleAxis dataKey="topic" tick={{ fill: "#B0B8C4", fontSize: 12 }} />
        <Radar dataKey="mastery" stroke="#77C8FF" fill="#77C8FF" fillOpacity={0.22} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function ComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={cohort}>
        <CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} />
        <XAxis dataKey="name" stroke="#7C8796" axisLine={false} tickLine={false} />
        <YAxis stroke="#7C8796" axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "#171B22", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, color: "#F5F7FA" }} />
        <Bar dataKey="momentum" fill="#C6A969" radius={[10, 10, 0, 0]} />
        <Bar dataKey="consistency" fill="#77C8FF" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
