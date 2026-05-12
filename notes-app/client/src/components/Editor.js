export default function Editor() {
  return (
    <div className="flex-1 bg-[#1e293b] rounded-[40px] border border-white/20 shadow-xl p-10 relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-6xl font-bold text-white leading-tight">
          Today’s Focus ✨
        </h1>

        <p className="text-white/70 mt-5 text-lg leading-8 max-w-3xl">
          Build something beautiful today. Every small effort compounds into
          something extraordinary over time.
        </p>

        <div className="mt-14 space-y-8">
          <div className="bg-white/10 rounded-[30px] p-6 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4">Goals</h2>

            <div className="space-y-3 text-white/70 text-lg">
              <p>☑ Finish dashboard UI</p>
              <p>☑ Add anime aesthetic</p>
              <p>☐ Polish final deployment</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-[30px] p-6 border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Thoughts
            </h2>

            <p className="text-white/70 leading-9 text-lg">
              Consistency creates elegance. Keep showing up, even when progress
              feels slow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}