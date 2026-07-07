import { useEffect, useState } from "react";

const BADGES = [
  {
    id: "first-session",
    emoji: "🌱",
    title: "First Steps",
    description: "Complete your first study session",
    check: (s) => s.totalMinutes >= 1,
    progress: (s) => Math.min(s.totalMinutes / 1, 1),
  },
  {
    id: "streak-3",
    emoji: "🔥",
    title: "3 Day Streak",
    description: "Study 3 days in a row",
    check: (s) => s.longest >= 3,
    progress: (s) => Math.min(s.longest / 3, 1),
  },
  {
    id: "streak-7",
    emoji: "⚡",
    title: "7 Day Streak",
    description: "A full week of consistency",
    check: (s) => s.longest >= 7,
    progress: (s) => Math.min(s.longest / 7, 1),
  },
  {
    id: "streak-30",
    emoji: "🏆",
    title: "30 Day Streak",
    description: "A month of dedication",
    check: (s) => s.longest >= 30,
    progress: (s) => Math.min(s.longest / 30, 1),
  },
  {
    id: "hour-1",
    emoji: "⏱️",
    title: "1 Hour Club",
    description: "Study for 1 hour total",
    check: (s) => s.totalMinutes >= 60,
    progress: (s) => Math.min(s.totalMinutes / 60, 1),
  },
  {
    id: "hours-10",
    emoji: "📚",
    title: "10 Hours Total",
    description: "10 hours of focused study",
    check: (s) => s.totalMinutes >= 600,
    progress: (s) => Math.min(s.totalMinutes / 600, 1),
  },
  {
    id: "hours-50",
    emoji: "🎓",
    title: "50 Hours Total",
    description: "A true scholar",
    check: (s) => s.totalMinutes >= 3000,
    progress: (s) => Math.min(s.totalMinutes / 3000, 1),
  },
  {
    id: "goal-day",
    emoji: "🎯",
    title: "Daily Goal Crushed",
    description: "Hit 180 minutes in a single day",
    check: (s) => s.todayMinutes >= 180,
    progress: (s) => Math.min(s.todayMinutes / 180, 1),
  },
];

function readStats() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || "guest";
  return {
    streak: Number(localStorage.getItem(`streak_${userId}`)) || 0,
    longest: Number(localStorage.getItem(`longestStreak_${userId}`)) || 0,
    todayMinutes: Number(localStorage.getItem(`studyMinutesToday_${userId}`)) || 0,
    totalMinutes: Number(localStorage.getItem(`studyTotalMinutes_${userId}`)) || 0,
  };
}

export default function Achievements() {
  const [stats, setStats] = useState(readStats);

  useEffect(() => {
    const refresh = () => setStats(readStats());
    window.addEventListener("study-data-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("study-data-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const unlockedCount = BADGES.filter((b) => b.check(stats)).length;

  return (
    <div className="glass-card p-8 rounded-3xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">🏅 Achievements</h2>
        <span className="text-sm text-black/60 font-semibold">
          {unlockedCount} / {BADGES.length} unlocked
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BADGES.map((badge) => {
          const unlocked = badge.check(stats);
          const progress = badge.progress(stats);

          return (
            <div
              key={badge.id}
              className={`rounded-2xl p-5 border transition-all ${
                unlocked
                  ? "bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-300 shadow-md"
                  : "bg-black/5 border-black/10 opacity-60"
              }`}
            >
              <div className={`text-4xl mb-3 ${unlocked ? "" : "grayscale opacity-50"}`}>
                {badge.emoji}
              </div>
              <h3 className="font-bold text-black text-sm">{badge.title}</h3>
              <p className="text-xs text-black/60 mt-1">{badge.description}</p>

              {!unlocked && (
                <div className="mt-3">
                  <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-400 rounded-full transition-all"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-black/40 mt-1">
                    {Math.floor(progress * 100)}% complete
                  </p>
                </div>
              )}

              {unlocked && (
                <p className="text-[11px] font-bold text-orange-600 mt-3">✓ Unlocked</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}