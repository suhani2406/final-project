    import FocusMode from "./FocusMode";

export default function RightPanel() {
  return (
    <div
      className="
      w-80
      bg-white/22
bg-[#1e293b]
      rounded-[32px]
      border border-white/10
      shadow-[0_8px_40px_rgba(0,0,0,0.08)]
      p-6
    "
    >
      <h2 className="text-2xl font-bold text-[#3f2b24] mb-8">
        Daily Energy 🌸
      </h2>
      <div className="space-y-6">

  <FocusMode />

</div>

      <div className="space-y-6">
        <div className="bg-white/20 rounded-[24px] p-5">
          <p className="text-[#6d5b54] mb-2">Productivity</p>

          <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
            <div className="w-[78%] h-full bg-[#b96d5d] rounded-full"></div>
          </div>
        </div>

        <div className="bg-white/20 rounded-[24px] p-5">
          <p className="text-[#6d5b54] mb-2">Creativity</p>

          <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
            <div className="w-[90%] h-full bg-[#d49d7d] rounded-full"></div>
          </div>
        </div>

        <div className="bg-white/20 rounded-[24px] p-5">
          <h3 className="text-xl font-semibold text-[#3f2b24] mb-3">
            Reminder
          </h3>

          <p className="text-[#5f514b] leading-8">
            Rest is productive too. Don’t rush your growth.
          </p>
        </div>
      </div>
    </div>
  );
}