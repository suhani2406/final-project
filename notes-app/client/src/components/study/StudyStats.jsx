// import {
//   Flame,
//   Trophy,
//   Clock3,
//   CalendarDays,
// } from "lucide-react";

export default function StudyStats() {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const userId = user.id || "guest";

  const currentStreak =
    Number(
      localStorage.getItem(
        `streak_${userId}`
      )
    ) || 0;

  const todayMinutes =
    Number(
      localStorage.getItem(
        `studyMinutesToday_${userId}`
      )
    ) || 0;
    const weekMinutes =
  Number(
    localStorage.getItem(
      `studyWeek_${userId}`
    )
  ) || todayMinutes;

// const monthMinutes =
//   Number(
//     localStorage.getItem(
//       `studyMonth_${userId}`
//     )
//   ) || todayMinutes;

  const longestStreak =
    Number(
      localStorage.getItem(
        `longestStreak_${userId}`
      )
    ) || currentStreak;

  if (currentStreak > longestStreak) {
    localStorage.setItem(
      `longestStreak_${userId}`,
      currentStreak
    );
  }

  const cards = [
  {
    title: "🔥 Current Streak",
    value: `${currentStreak}`,
    subtitle: "Days",
    color: "from-orange-500 to-red-500",
  },

  {
    title: "🏆 Longest",
    value: `${Math.max(
      currentStreak,
      longestStreak
    )}`,
    subtitle: "Days",
    color: "from-yellow-500 to-orange-500",
  },

  {
    title: "📚 Today",
    value: `${todayMinutes}`,
    subtitle: "Minutes",
    color: "from-cyan-500 to-blue-500",
  },

  {
    title: "📅 This Week",
    value: `${weekMinutes}`,
    subtitle: "Minutes",
    color: "from-purple-500 to-pink-500",
  },
];

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
      {cards.map((card, i) => (
        <div
          key={i}
          className="rounded-3xl p-6 bg-[#1f2937] border border-white/10 hover:scale-105 transition-all duration-300 shadow-xl"
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-r ${card.color} text-black`}
          >
            {card.icon}
          </div>

          <h3 className="text-black/70 mt-5 text-sm">
            {card.title}
          </h3>

          <div className="mt-3">

<h2 className="text-black text-5xl font-black">
  {card.value}
</h2>

<p className="text-black/60">
  {card.subtitle}
</p>

</div>
        </div>
      ))}
    </div>
  );
}