"use client";

import { AnimatedShell } from "@/components/AnimatedShell";
import { AppFrame } from "@/components/AppFrame";
import { GrowthChart, MasteryRadar } from "@/components/Charts";
import { weeklyLogs } from "@/lib/data";

export default function AnalyticsPage() {
  return (
    <AppFrame title="Analytics" subtitle="Understand what your updates are doing to your growth curve.">
      <section className="mx-auto grid max-w-[1360px] gap-6 px-5 py-6 pb-24 sm:px-8 xl:grid-cols-[1.1fr_0.9fr]">
        <AnimatedShell className="rounded-[28px] border border-white/10 bg-surface/80 p-5 shadow-panel backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Growth graph</p>
            <h2 className="mt-2 text-2xl font-semibold">Momentum over the last week</h2>
          </div>
          <div className="mt-6 h-96 rounded-3xl border border-white/10 bg-backgroundPrimary/55 p-4">
            <GrowthChart />
          </div>
          <div className="mt-4 rounded-3xl border border-accentGold/20 bg-accentGold/10 p-4 text-sm leading-6 text-accentSoft">
            Score combines problem difficulty, topic diversity, streak multiplier, improvement, and repeated-topic penalty.
          </div>
        </AnimatedShell>

        <AnimatedShell className="rounded-[28px] border border-white/10 bg-surface/80 p-5 shadow-panel backdrop-blur">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Topic map</p>
            <h2 className="mt-2 text-2xl font-semibold">Mastery radar</h2>
          </div>
          <div className="mt-6 h-96">
            <MasteryRadar />
          </div>
        </AnimatedShell>

        <AnimatedShell className="rounded-[28px] border border-white/10 bg-surface/80 p-5 shadow-panel backdrop-blur xl:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Log history</p>
          <h2 className="mt-2 text-2xl font-semibold">Recent updates</h2>
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-white/[0.04] text-mutedText">
                <tr>
                  <th className="p-4">Day</th>
                  <th className="p-4">Focus</th>
                  <th className="p-4">Easy</th>
                  <th className="p-4">Medium</th>
                  <th className="p-4">Hard</th>
                  <th className="p-4">Score</th>
                </tr>
              </thead>
              <tbody>
                {weeklyLogs.map((log) => (
                  <tr key={log.day} className="border-t border-white/10 text-textSecondary">
                    <td className="p-4 font-semibold text-textPrimary">{log.day}</td>
                    <td className="p-4">{log.focus}</td>
                    <td className="p-4">{log.easy}</td>
                    <td className="p-4">{log.medium}</td>
                    <td className="p-4">{log.hard}</td>
                    <td className="p-4 text-accentSoft">{log.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedShell>
      </section>
    </AppFrame>
  );
}
