import { describe, expect, it } from "vitest";
import { calculateGrowthScore, getStreakMultiplier } from "@/lib/scoring";

describe("growth scoring", () => {
  it("applies milestone streak multipliers", () => {
    expect(getStreakMultiplier(6)).toBe(1);
    expect(getStreakMultiplier(7)).toBe(1.1);
    expect(getStreakMultiplier(30)).toBe(1.25);
    expect(getStreakMultiplier(50)).toBe(1.35);
    expect(getStreakMultiplier(100)).toBe(1.5);
    expect(getStreakMultiplier(150)).toBe(1.75);
  });

  it("calculates a deterministic growth score", () => {
    expect(
      calculateGrowthScore({
        solvedEasy: 2,
        solvedMedium: 4,
        solvedHard: 2,
        topics: ["Graphs", "DP", "Graphs"],
        currentStreak: 43,
        repeatedTopicSessions: 2,
        weeklyImprovementRatio: 0.14
      })
    ).toBe(37);
  });
});
