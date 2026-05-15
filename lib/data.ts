import type { DailyLog } from "@/lib/scoring";

export const weeklyLogs = [
  { day: "Mon", score: 76, easy: 2, medium: 4, hard: 1, focus: "Graphs" },
  { day: "Tue", score: 82, easy: 1, medium: 3, hard: 2, focus: "DP" },
  { day: "Wed", score: 69, easy: 3, medium: 2, hard: 0, focus: "Trees" },
  { day: "Thu", score: 88, easy: 2, medium: 5, hard: 1, focus: "Sliding Window" },
  { day: "Fri", score: 94, easy: 1, medium: 4, hard: 2, focus: "Graphs" },
  { day: "Sat", score: 81, easy: 4, medium: 2, hard: 1, focus: "Hashing" },
  { day: "Sun", score: 97, easy: 2, medium: 3, hard: 3, focus: "DP" }
];

export const topicMastery = [
  { topic: "Arrays", mastery: 86 },
  { topic: "Graphs", mastery: 62 },
  { topic: "Dynamic Programming", mastery: 54 },
  { topic: "Trees", mastery: 73 },
  { topic: "Sliding Window", mastery: 78 },
  { topic: "Backtracking", mastery: 41 }
];

export const milestones = [
  { day: 7, label: "First rhythm", status: "earned" },
  { day: 30, label: "Consistency is becoming your language.", status: "earned" },
  { day: 50, label: "Discipline is becoming identity.", status: "active" },
  { day: 100, label: "Most stop before progress compounds.", status: "locked" },
  { day: 150, label: "Your younger self would be proud.", status: "locked" }
];

export const demoLog: DailyLog = {
  solvedEasy: 2,
  solvedMedium: 4,
  solvedHard: 2,
  topics: ["Graphs", "DP", "Sliding Window"],
  currentStreak: 43,
  repeatedTopicSessions: 2,
  weeklyImprovementRatio: 0.14
};
