import { useEffect, useState } from "react";

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function StreakCalendar() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || "guest";

  const streakKey = `streak_${userId}`;
  const lastVisitKey = `lastVisit_${userId}`;

  const calculateStreak = () => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem(lastVisitKey);
    let currentStreak = Number(localStorage.getItem(streakKey)) || 0;

    if (!lastVisit) {
      currentStreak = 1;
    } else if (lastVisit !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastVisit === yesterday.toDateString()) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
    }

    localStorage.setItem(streakKey, currentStreak);
    localStorage.setItem(lastVisitKey, today);

    return currentStreak;
  };

  const [streak, setStreak] = useState(1);

  useEffect(() => {
    setStreak(calculateStreak());
  }, []);

  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-[35px] p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Study Streak 🔥</h2>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day, index) => (
          <div
            key={index}
            className={`h-14 rounded-2xl flex items-center justify-center font-bold ${
              index < Math.min(streak, 7)
                ? "bg-[#d96c52] text-white"
                : "bg-white/10 text-white/50"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-6 text-lg text-white">
        Current Streak:
        <span className="font-bold"> {streak} Days</span>
      </div>
    </div>
  );
}