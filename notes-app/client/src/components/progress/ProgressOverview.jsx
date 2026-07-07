import { useEffect, useState } from "react";

function readStats() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || "guest";
  return {
    streak: Number(localStorage.getItem(`streak_${userId}`)) || 0,
    longest: Number(localStorage.getItem(`longestStreak_${userId}`)) || 0,
    todayMinutes: Number(localStorage.getItem(`studyMinutesToday_${userId}`)) || 0,
    weekMinutes: Number(localStorage.getItem(`studyWeek_${userId}`)) || 0,
  };
}

export default function ProgressOverview() {
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

  const cards = [
    { emoji: "🔥", title: "Current Streak", value: stats.streak, sub: "Days", color: "from-orange-500 to-red-500" },
    { emoji: "🏆", title: "Longest Streak", value: Math.max(stats.streak, stats.longest), sub: "Days", color: "from-yellow-500 to-orange-500" },
    { emoji: "📚", title: "Today's Study", value: stats.todayMinutes, sub: "Minutes", color: "from-cyan-500 to-blue-500" },
    { emoji: "📅", title: "This Week", value: stats.weekMinutes, sub: "Minutes", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="glass-card rounded-3xl p-6 hover:scale-105 transition duration-300 shadow-xl">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-2xl`}>
            {card.emoji}
          </div>
          <h3 className="mt-5 text-black/70 text-sm">{card.title}</h3>
          <h2 className="text-5xl font-black text-black mt-2">{card.value}</h2>
          <p className="text-black/60">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}