"use client";

import { AnimatedShell } from "@/components/AnimatedShell";
import { AppFrame } from "@/components/AppFrame";
import { ComparisonChart } from "@/components/Charts";

const learners = [
  { rank: 1, name: "Mira", streak: 61, momentum: 112, movement: "+4" },
  { rank: 2, name: "Arjun", streak: 49, momentum: 103, movement: "+1" },
  { rank: 3, name: "You", streak: 43, momentum: 94, movement: "+14" },
  { rank: 4, name: "Dev", streak: 38, momentum: 91, movement: "-2" },
  { rank: 5, name: "Ira", streak: 35, momentum: 86, movement: "+3" }
];

export default function LeaderboardPage() {
  return (
    <AppFrame title="Relative progress" subtitle="Compare momentum with learners updating in the same consistency window.">
      <section className="mx-auto grid max-w-[1360px] gap-6 px-5 py-6 pb-24 sm:px-8 xl:grid-cols-[0.9fr_1.1fr]">
        <AnimatedShell className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#1F2630_0%,#101318_58%,#203044_100%)] p-7 shadow-panel sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Your position</p>
          <h2 className="mt-3 text-5xl font-bold leading-tight">Ahead of 73% of active learners.</h2>
          <p className="mt-5 text-lg leading-8 text-textSecondary">
            The comparison updates when your daily entry changes your momentum score, topic diversity, or streak health.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["#3", "Cohort rank"],
              ["+14", "Weekly climb"],
              ["94", "Momentum"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                <strong className="block text-4xl">{value}</strong>
                <span className="mt-3 block text-sm text-mutedText">{label}</span>
              </div>
            ))}
          </div>
        </AnimatedShell>

        <AnimatedShell className="rounded-[28px] border border-white/10 bg-surface/80 p-5 shadow-panel backdrop-blur">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Cohort comparison</p>
          <h2 className="mt-2 text-2xl font-semibold">Momentum vs consistency</h2>
          <div className="mt-6 h-96 rounded-3xl border border-white/10 bg-backgroundPrimary/55 p-4">
            <ComparisonChart />
          </div>
        </AnimatedShell>

        <AnimatedShell className="rounded-[28px] border border-white/10 bg-surface/80 p-5 shadow-panel backdrop-blur xl:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Active learners</p>
          <h2 className="mt-2 text-2xl font-semibold">Leaderboard</h2>
          <div className="mt-6 grid gap-3">
            {learners.map((learner) => (
              <div
                key={learner.name}
                className={`grid gap-3 rounded-2xl border p-4 sm:grid-cols-[70px_1fr_110px_110px_90px] ${
                  learner.name === "You" ? "border-accentGold/40 bg-accentGold/10" : "border-white/10 bg-backgroundPrimary/55"
                }`}
              >
                <span className="font-bold text-accentSoft">#{learner.rank}</span>
                <span className="font-semibold">{learner.name}</span>
                <span className="text-textSecondary">{learner.streak}d streak</span>
                <span className="text-textSecondary">{learner.momentum} score</span>
                <span className={learner.movement.startsWith("+") ? "text-emerald-300" : "text-red-300"}>{learner.movement}</span>
              </div>
            ))}
          </div>
        </AnimatedShell>
      </section>
    </AppFrame>
  );
}
