"use server";

import { calculateGrowthScore } from "@/lib/scoring";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveDailyLog(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const topics = formData.getAll("topics").map(String);
  const solvedEasy = Number(formData.get("solvedEasy") ?? 0);
  const solvedMedium = Number(formData.get("solvedMedium") ?? 0);
  const solvedHard = Number(formData.get("solvedHard") ?? 0);
  const currentStreak = Number(formData.get("currentStreak") ?? 0);
  const growthScore = calculateGrowthScore({
    solvedEasy,
    solvedMedium,
    solvedHard,
    topics,
    currentStreak,
    repeatedTopicSessions: 0,
    weeklyImprovementRatio: 0.1
  });

  const { error } = await supabase.from("daily_logs").upsert(
    {
      user_id: user.id,
      log_date: new Date().toISOString().slice(0, 10),
      solved_easy: solvedEasy,
      solved_medium: solvedMedium,
      solved_hard: solvedHard,
      topics,
      hours_studied: Number(formData.get("hoursStudied") ?? 0),
      project_work_notes: String(formData.get("projectWorkNotes") ?? ""),
      learning_notes: String(formData.get("learningNotes") ?? ""),
      growth_score: growthScore
    },
    { onConflict: "user_id,log_date" }
  );

  if (error) throw new Error(error.message);

  await supabase.from("growth_metrics").upsert({
    user_id: user.id,
    momentum_score: growthScore,
    consistency_score: Math.min(100, currentStreak * 2),
    topic_diversity_score: Math.min(100, topics.length * 14),
    growth_delta: 10,
    percentile: Math.min(99, 50 + Math.round(growthScore / 3))
  });

  await supabase.from("streak_history").upsert({
    user_id: user.id,
    current_streak: currentStreak,
    longest_streak: currentStreak,
    last_logged_date: new Date().toISOString().slice(0, 10)
  });

  revalidatePath("/dashboard");
}
