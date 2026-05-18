"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function saveOnboarding(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { error } = await supabase.from("onboarding_state").upsert({
    user_id: user.id,
    journey_phase: String(formData.get("journeyPhase") ?? "Intermediate solver"),
    covered_topics: formData.getAll("coveredTopics").map(String),
    estimated_total_solved: String(formData.get("estimatedTotalSolved") ?? "150-300"),
    weekly_goal: String(formData.get("weeklyGoal") ?? "6 days"),
    confidence_level: Number(formData.get("confidenceLevel") ?? 60),
    completed: true
  });

  if (error) throw new Error(error.message);

  redirect("/dashboard");
}
