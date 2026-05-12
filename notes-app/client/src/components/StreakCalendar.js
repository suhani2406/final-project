import { useEffect, useState } from "react";

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function StreakCalendar() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const streakKey = `streak_${user.id || "guest"}`;
  const visitKey = `lastVisit_${user.id || "guest"}`;

  const [streak, setStreak] = useState(
    Number(localStorage.getItem(streakKey)) || 1
  );

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem(visitKey);

    if (lastVisit !== today) {
      const newStreak = streak + 1;
      localStorage.setItem(streakKey, newStreak);
      localStorage.setItem(visitKey, today);
      setStreak(newStreak);
    }
  }, []);

  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-[35px] p-8">
      <h2 className="text-3xl font-bold text-white mb-6">
        Study Streak 🔥
      </h2>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day, index) => (
          <div
            key={index}
            className="h-14 rounded-2xl bg-[#d96c52] text-white flex items-center justify-center font-bold"
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