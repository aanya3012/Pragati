import { createClient } from "@/lib/supabase/server";
import { AnimatedShell } from "@/components/AnimatedShell";
import { AppFrame } from "@/components/AppFrame";
import { GrowthChart } from "@/components/Charts";
import { DailyLogCard } from "@/components/DailyLogCard";
import { Award, Flame, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: growth } = await supabase
    .from("growth_metrics")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: streak } = await supabase
    .from("streak_history")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const momentum = growth?.momentum_score ?? 0;
  const percentile = growth?.percentile ?? 0;
  const currentStreak = streak?.current_streak ?? 0;

  return (
    <AppFrame
      title="Your journey"
      subtitle="Add today’s work, keep your streak honest, and see what changed."
    >
      <section className="mx-auto grid max-w-[1360px] gap-6 px-5 py-6 sm:px-8 xl:grid-cols-[1fr_0.78fr]">
        <AnimatedShell className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#1F2630_0%,#101318_58%,#2b261a_100%)] p-7 shadow-panel sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">
            Today
          </p>

          <h2 className="mt-3 max-w-3xl text-5xl font-bold leading-tight">
            Your update becomes your next signal.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-textSecondary">
            Log the problems, topics, time, and reflection from today. Pragati
            turns that into momentum, mastery, and comparison movement.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              [String(currentStreak), "Current streak"],
              [String(momentum), "Momentum score"],
              [`${percentile}%`, "Peer percentile"]
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-5"
              >
                <strong className="block text-4xl">{value}</strong>
                <span className="mt-3 block text-sm text-mutedText">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedShell>

        <AnimatedShell id="update">
          <DailyLogCard />
        </AnimatedShell>
      </section>

      <section className="mx-auto grid max-w-[1360px] gap-4 px-5 sm:px-8 md:grid-cols-2 xl:grid-cols-4">
        {[
          [
            TrendingUp,
            "Momentum",
            String(momentum),
            "Your recent hard-problem consistency is lifting the curve."
          ],
          [
            Flame,
            "Streak",
            `${currentStreak}d`,
            "One missed day does not erase the trend; today keeps it alive."
          ],
          [
            Target,
            "Next focus",
            "DP",
            "Your comparison group is gaining fastest in DP revision."
          ],
          [
            Award,
            "Next milestone",
            `${Math.max(0, 50 - currentStreak)}d`,
            "Keep logging daily to unlock your next certificate."
          ]
        ].map(([Icon, title, value, body]) => {
          const LucideIcon = Icon as typeof TrendingUp;

          return (
            <AnimatedShell
              key={title as string}
              className="rounded-[26px] border border-white/10 bg-surface/80 p-5 shadow-panel backdrop-blur"
            >
              <LucideIcon className="text-accentGold" />

              <p className="mt-5 text-sm font-semibold text-mutedText">
                {title as string}
              </p>

              <h3 className="mt-2 text-4xl font-bold">{value as string}</h3>

              <p className="mt-3 text-sm leading-6 text-textSecondary">
                {body as string}
              </p>
            </AnimatedShell>
          );
        })}
      </section>

      <section className="mx-auto grid max-w-[1360px] gap-6 px-5 py-6 pb-24 sm:px-8 xl:grid-cols-[1fr_0.76fr]">
        <AnimatedShell className="rounded-[28px] border border-white/10 bg-surface/80 p-5 shadow-panel backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-accentSoft">
                Recent growth
              </p>

              <h2 className="mt-2 text-2xl font-semibold">Score trend</h2>
            </div>

            <Link
              href="/dashboard/analytics"
              className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-textSecondary hover:text-textPrimary"
            >
              Open analytics
            </Link>
          </div>

          <div className="mt-6 h-72 rounded-3xl border border-white/10 bg-backgroundPrimary/55 p-4">
            <GrowthChart />
          </div>
        </AnimatedShell>

        <AnimatedShell
          id="certificate"
          className="rounded-[28px] border border-white/10 bg-[#f5ead5] p-2 text-[#1d1a13] shadow-panel"
        >
          <div className="min-h-full rounded-[22px] border border-[#846623]/30 bg-[#f8f1df] p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#846623]">
              Upcoming certificate
            </p>

            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight">
              Discipline is becoming identity.
            </h2>

            <p className="mt-6 text-sm leading-7 text-[#5f553f]">
              Unlocks at 50-day consistency.
            </p>
          </div>
        </AnimatedShell>
      </section>
    </AppFrame>
  );
}