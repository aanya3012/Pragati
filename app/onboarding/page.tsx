"use client";

import { AnimatedShell } from "@/components/AnimatedShell";
import { saveOnboarding } from "@/app/onboarding/actions";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const steps = [
  {
    title: "Where are you in your DSA journey?",
    options: ["Just starting", "Learning foundations", "Intermediate solver", "Pattern recognition phase", "Interview-ready revision"]
  },
  {
    title: "Which topics have you touched?",
    options: ["Arrays", "Strings", "Hashing", "Trees", "Graphs", "Dynamic Programming", "Greedy", "Backtracking"]
  },
  {
    title: "Roughly how many problems have you solved?",
    options: ["0-50", "50-150", "150-300", "300-500", "500+"]
  },
  {
    title: "What weekly rhythm feels honest?",
    options: ["3 days", "5 days", "6 days", "Daily"]
  }
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const step = steps[current];
  const done = current === steps.length - 1;

  function choose(option: string) {
    setAnswers((value) => ({ ...value, [current]: [option] }));
  }

  return (
    <main className="min-h-screen px-5 py-8 text-textPrimary sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.75fr_1fr]">
        <AnimatedShell className="rounded-[32px] border border-white/10 bg-surface/82 p-7 shadow-panel backdrop-blur sm:p-9">
          <Link href="/login" className="grid size-12 place-items-center rounded-2xl bg-accentGold text-xl font-black text-[#15120c] shadow-gold">
            P
          </Link>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Short quiz</p>
          <h1 className="mt-3 text-5xl font-bold leading-tight">Tell Pragati where to start.</h1>
          <p className="mt-5 text-lg leading-8 text-textSecondary">
            This sets the first version of your dashboard: expectations, goals, topic map, and comparison cohort.
          </p>
          <div className="mt-10 grid gap-3">
            {steps.map((item, index) => (
              <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-backgroundPrimary/45 p-4">
                <CheckCircle2 className={index <= current ? "text-accentGold" : "text-mutedText"} size={20} />
                <span className="text-sm text-textSecondary">{item.title}</span>
              </div>
            ))}
          </div>
        </AnimatedShell>

        <AnimatedShell className="rounded-[32px] border border-white/10 bg-surface/82 p-7 shadow-panel backdrop-blur sm:p-9">
          <form action={saveOnboarding}>
          <input type="hidden" name="journeyPhase" value={answers[0]?.[0] ?? ""} />
          {(answers[1] ?? []).map((topic) => (
            <input key={topic} type="hidden" name="coveredTopics" value={topic} />
          ))}
          <input type="hidden" name="estimatedTotalSolved" value={answers[2]?.[0] ?? ""} />
          <input type="hidden" name="weeklyGoal" value={answers[3]?.[0] ?? ""} />
          <input type="hidden" name="confidenceLevel" value="65" />
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-mutedText">Step {current + 1} of {steps.length}</p>
              <h2 className="mt-2 text-3xl font-semibold">{step.title}</h2>
            </div>
            <span className="rounded-full border border-accentGold/30 bg-accentGold/10 px-3 py-1 text-sm font-bold text-accentSoft">
              {Math.round(((current + 1) / steps.length) * 100)}%
            </span>
          </div>

          <div className="grid gap-3">
            {step.options.map((option) => {
              const active = answers[current]?.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => choose(option)}
                  className={`rounded-2xl border p-4 text-left font-semibold transition hover:-translate-y-0.5 ${
                    active
                      ? "border-accentGold/45 bg-accentGold/10 text-accentSoft"
                      : "border-white/10 bg-backgroundPrimary/55 text-textSecondary hover:text-textPrimary"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-end">
            {done ? (
              <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accentGold px-6 py-3 font-bold text-[#17130b] shadow-gold transition hover:-translate-y-0.5 hover:bg-accentSoft">
                Build my dashboard
                <ArrowRight size={18} />
              </button>
            ) : (
              <button type="button" onClick={() => setCurrent((value) => value + 1)} className="inline-flex items-center gap-2 rounded-full bg-accentGold px-6 py-3 font-bold text-[#17130b] shadow-gold transition hover:-translate-y-0.5 hover:bg-accentSoft">
                Continue
                <ArrowRight size={18} />
              </button>
            )}
          </div>
          </form>
        </AnimatedShell>
      </div>
    </main>
  );
}
