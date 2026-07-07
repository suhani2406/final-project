import { useEffect, useState } from "react";

export default function GoalProgress() {
  const getMinutes = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const userId = user.id || "guest";
    return Number(localStorage.getItem(`studyMinutesToday_${userId}`)) || 0;
  };

  const [todayMinutes, setTodayMinutes] = useState(getMinutes);
  const DAILY_GOAL = 180;

  useEffect(() => {
    const refresh = () => setTodayMinutes(getMinutes());
    window.addEventListener("study-data-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("study-data-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const progress = Math.min((todayMinutes / DAILY_GOAL) * 100, 100);

  return (
    <div className="glass-card p-8 rounded-3xl">
      <h2 className="text-2xl font-bold text-black mb-8">🎯 Daily Goal</h2>
      <div className="flex justify-between text-black/80 mb-3">
        <span>{todayMinutes} / {DAILY_GOAL} mins</span>
        <span>{Math.floor(progress)}%</span>
      </div>
      <div className="w-full h-5 bg-black/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-6 text-black/70">
        {progress === 100 ? "🎉 Daily goal completed!" : `${DAILY_GOAL - todayMinutes} mins left today.`}
      </p>
    </div>
  );
}