export default function ProgressChart() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const key = `quizScores_${user.id || "guest"}`;

  const scores =
    JSON.parse(localStorage.getItem(key)) || [
      { day: "Mon", score: 55 },
      { day: "Tue", score: 68 },
      { day: "Wed", score: 62 },
      { day: "Thu", score: 76 },
      { day: "Fri", score: 74 },
      { day: "Sat", score: 88 },
      { day: "Sun", score: 92 },
    ];

  return (
    <div className="w-full">
      <div className="flex items-end gap-4 h-[260px]">
        {scores.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-3">
            <div className="text-white text-sm font-bold">
              {item.score}%
            </div>

            <div className="w-full h-[210px] bg-white/10 rounded-2xl flex items-end overflow-hidden">
              <div
                className="w-full bg-[#d96c52] rounded-2xl"
                style={{ height: `${item.score}%` }}
              />
            </div>

            <div className="text-white/70 text-sm">
              {item.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}