export default function ProgressChart() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || "guest";

  const key = `studyMinutes_${userId}`;

  const data =
    JSON.parse(localStorage.getItem(key)) || [
      { day: "Mon", minutes: 0 },
      { day: "Tue", minutes: 0 },
      { day: "Wed", minutes: 0 },
      { day: "Thu", minutes: 0 },
      { day: "Fri", minutes: 0 },
      { day: "Sat", minutes: 0 },
      { day: "Sun", minutes: 0 },
    ];

  const maxMinutes = Math.max(...data.map((d) => d.minutes), 60);

  return (
    <div className="w-full">
      <div className="flex items-end gap-4 h-[260px]">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-3">
            <div className="text-black text-sm font-bold">
              {item.minutes} min
            </div>

            <div className="w-full h-[210px] bg-black/10 rounded-2xl flex items-end overflow-hidden">
              <div
                className="w-full bg-[#d96c52] rounded-2xl"
                style={{
                  height: `${(item.minutes / maxMinutes) * 100}%`,
                }}
              />
            </div>

            <div className="text-black/70 text-sm">{item.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}