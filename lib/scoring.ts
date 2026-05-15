export type DailyLog = {
  solvedEasy: number;
  solvedMedium: number;
  solvedHard: number;
  topics: string[];
  currentStreak: number;
  repeatedTopicSessions: number;
  weeklyImprovementRatio: number;
};

export function getStreakMultiplier(streak: number) {
  if (streak >= 150) return 1.75;
  if (streak >= 100) return 1.5;
  if (streak >= 50) return 1.35;
  if (streak >= 30) return 1.25;
  if (streak >= 7) return 1.1;
  return 1;
}

export function calculateGrowthScore(log: DailyLog) {
  const difficultyScore = log.solvedEasy + log.solvedMedium * 3 + log.solvedHard * 6;
  const uniqueTopics = new Set(log.topics.filter(Boolean));
  const diversityBonus = uniqueTopics.size * 0.15;
  const streakMultiplier = getStreakMultiplier(log.currentStreak);
  const improvementDelta = Math.min(Math.max(log.weeklyImprovementRatio, 0), 0.2) * difficultyScore;
  const monotonyPenalty = log.repeatedTopicSessions > 5 ? difficultyScore * 0.15 : 0;

  return Math.max(0, Math.round((difficultyScore + diversityBonus) * streakMultiplier + improvementDelta - monotonyPenalty));
}
