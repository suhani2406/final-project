export default function AchievementBadges() {

  const badges = [

    "🔥 7 Day Streak",
    "📚 50 Notes",
    "🧠 AI Master",
    "🎯 Quiz Topper",

  ];

  return (

    <div className="glass p-6">

      <h2 className="title mb-6">
        Achievements 🏆
      </h2>

      <div className="grid grid-cols-2 gap-4">

        {badges.map((badge, index) => (

          <div
            key={index}
            className="
            bg-white/20
            rounded-2xl
            p-4
            text-center
            font-semibold
          "
          >

            {badge}

          </div>

        ))}

      </div>

    </div>
  );
}