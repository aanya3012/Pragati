"use client";

import { calculateGrowthScore } from "@/lib/scoring";
import { saveDailyLog } from "@/app/dashboard/actions";
import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

const allTopics = ["Graphs", "DP", "Trees", "Sliding Window", "Hashing"];

export function DailyLogCard() {
  const [easy, setEasy] = useState(2);
  const [medium, setMedium] = useState(4);
  const [hard, setHard] = useState(2);
  const [topics, setTopics] = useState(["Graphs", "DP", "Sliding Window"]);

  const score = useMemo(
    () =>
      calculateGrowthScore({
        solvedEasy: easy,
        solvedMedium: medium,
        solvedHard: hard,
        topics,
        currentStreak: 43,
        repeatedTopicSessions: 2,
        weeklyImprovementRatio: 0.14
      }),
    [easy, hard, medium, topics]
  );

  function toggleTopic(topic: string) {
    setTopics((current) => (current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]));
  }

  const fields: Array<[string, number, (next: number) => void]> = [
    ["Easy", easy, setEasy],
    ["Medium", medium, setMedium],
    ["Hard", hard, setHard]
  ];

  return (
    <section id="log" className="rounded-[28px] border border-white/10 bg-surface/85 p-5 shadow-panel backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">Today&apos;s log</p>
          <h2 className="mt-2 text-2xl font-semibold">One honest attempt</h2>
        </div>
        <span className="rounded-full border border-accentGold/25 bg-accentGold/10 px-3 py-1 text-sm font-semibold text-accentSoft">
          Auto-score
        </span>
      </div>

      <form action={saveDailyLog}>
      <input type="hidden" name="currentStreak" value="43" />
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {fields.map(([label, value, setter]) => (
          <label key={label} className="grid gap-2 text-sm font-semibold text-mutedText">
            {label}
            <input
              className="h-16 rounded-2xl border border-white/10 bg-backgroundPrimary/60 px-4 text-2xl font-bold text-textPrimary outline-none transition focus:border-accentGold/60 focus:ring-4 focus:ring-accentGold/10"
              min={0}
              type="number"
              name={label === "Easy" ? "solvedEasy" : label === "Medium" ? "solvedMedium" : "solvedHard"}
              value={value}
              onChange={(event) => setter(Number(event.target.value))}
            />
          </label>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {allTopics.map((topic) => {
          const active = topics.includes(topic);
          return (
            <button
              key={topic}
              type="button"
              onClick={() => toggleTopic(topic)}
              className={`rounded-full border px-3 py-2 text-sm transition hover:-translate-y-0.5 ${
                active
                  ? "border-accentGold/40 bg-accentGold/10 text-accentSoft"
                  : "border-white/10 bg-white/[0.04] text-textSecondary"
              }`}
            >
              {active ? <input type="hidden" name="topics" value={topic} /> : null}
              {topic}
            </button>
          );
        })}
      </div>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-mutedText">
        Key learning
        <textarea
          className="min-h-28 resize-y rounded-2xl border border-white/10 bg-backgroundPrimary/60 p-4 leading-7 text-textPrimary outline-none transition focus:border-accentGold/60 focus:ring-4 focus:ring-accentGold/10"
          name="learningNotes"
          defaultValue="Graph traversal patterns feel clearer after comparing BFS layer order with DFS recursion state."
        />
      </label>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-mutedText">
        Hours studied
        <input
          className="h-12 rounded-2xl border border-white/10 bg-backgroundPrimary/60 px-4 text-textPrimary outline-none transition focus:border-accentGold/60 focus:ring-4 focus:ring-accentGold/10"
          name="hoursStudied"
          min={0}
          step="0.25"
          type="number"
          defaultValue={2}
        />
      </label>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-backgroundPrimary/55 p-4">
        <div>
          <p className="text-sm text-mutedText">Projected growth score</p>
          <strong className="mt-1 block text-3xl">{score}</strong>
        </div>
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accentGold px-4 py-2 font-bold text-[#17130b] shadow-gold transition hover:-translate-y-0.5 hover:bg-accentSoft">
          <Sparkles size={17} />
          Save log
        </button>
      </div>
      </form>
    </section>
  );
}
