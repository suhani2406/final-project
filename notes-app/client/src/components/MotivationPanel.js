export default function MotivationPanel() {
  return (
    <div className="glass-card p-4 h-[430px] relative overflow-hidden">
      <img
        src="https://img.freepik.com/premium-photo/cute-anime-girl-reading-book-studying_1186913-6025.jpg?w=2000"
        alt=""
        className="w-full h-full object-cover rounded-[28px]"
      />

      <div className="absolute inset-4 rounded-[28px] bg-black/10" />

      <div className="absolute top-8 left-8 text-white">
        <h2 className="text-3xl font-black">Motivation</h2>
      </div>

      <div className="absolute left-14 top-32 max-w-[430px] text-white">
        <p className="text-5xl font-black leading-tight drop-shadow">
          “ Small progress every day leads to big results. ”
        </p>
        <p className="mt-8 text-xl font-semibold">Keep going, you're doing great!</p>
      </div>

      <div className="absolute bottom-8 right-8 text-white font-bold text-xl">
        1 / 6
      </div>
    </div>
  );
}