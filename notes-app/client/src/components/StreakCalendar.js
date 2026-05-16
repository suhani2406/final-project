import { useEffect, useState } from "react";

const days = ["M", "T", "W", "T", "F", "S", "S"];

export default function StreakCalendar() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const userId = user.id || "guest";

  const streakKey = `streak_${userId}`;
  const studyKey = `lastStudy_${userId}`;

  const minutes =
    Number(
      localStorage.getItem(
        `studyMinutesToday_${userId}`
      )
    ) || 0;

  const calculateStreak = () => {
    const today =
      new Date().toDateString();

    const lastStudy =
      localStorage.getItem(studyKey);

    let currentStreak =
      Number(
        localStorage.getItem(
          streakKey
        )
      ) || 0;

    if (!lastStudy) {
      return currentStreak || 0;
    }

    if (lastStudy === today) {
      if (currentStreak === 0) {
        currentStreak = 1;
      }
    } else {
      const yesterday =
        new Date();

      yesterday.setDate(
        yesterday.getDate() - 1
      );

      if (
        lastStudy ===
        yesterday.toDateString()
      ) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }
    }

    localStorage.setItem(
      streakKey,
      currentStreak
    );

    return currentStreak;
  };

  const [streak, setStreak] =
    useState(0);

  useEffect(() => {
    setStreak(
      calculateStreak()
    );
  }, []);

  return (
    <div className="bg-[#1e293b] border border-white/10 rounded-[35px] p-8">
      <h2 className="text-3xl font-bold text-white mb-6">
        Study Streak 🔥
      </h2>

      <div className="grid grid-cols-7 gap-3">
        {days.map(
          (day, index) => (
            <div
              key={index}
              className={`h-14 rounded-2xl flex items-center justify-center font-bold ${
                index <
                Math.min(
                  streak,
                  7
                )
                  ? "bg-[#d96c52] text-white"
                  : "bg-white/10 text-white/50"
              }`}
            >
              {day}
            </div>
          )
        )}
      </div>

      <div className="mt-6 text-lg text-white">
        Current Streak:
        <span className="font-bold">
          {" "}
          {streak} Days
        </span>
      </div>

      <div className="mt-3 text-lg text-white">
        Study Time Today:
        <span className="font-bold">
          {" "}
          {minutes} min
        </span>
      </div>
    </div>
  );
}