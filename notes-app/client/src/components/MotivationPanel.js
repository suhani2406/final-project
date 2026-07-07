import MotivationCarousel from "./MotivationCarousel";

export default function MotivationPanel() {
  const data = MotivationCarousel();

  return (
    <div className="glass-card p-4 h-[430px] relative overflow-hidden">

      <img
        src={data.image}
        alt=""
        className="w-full h-full object-cover rounded-[28px]"
      />

      <div className="absolute inset-4 rounded-[28px] bg-black/30" />

      <div className="absolute top-8 left-8 text-white">

        <h2 className="text-3xl font-black">
          {data.title}
        </h2>

      </div>

      <div className="absolute left-14 top-32 max-w-[470px] text-white">

        <p className="text-5xl font-black leading-tight drop-shadow-xl">
          “ {data.quote} ”
        </p>

        <p className="mt-8 text-xl font-semibold">
          {data.sub}
        </p>

        <div className="mt-8 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full">

          🔥

          <span className="font-bold">
            {data.streak} Day Streak
          </span>

        </div>

      </div>

      <div className="absolute bottom-8 right-8 text-white font-bold text-xl">

        {data.slide} / {data.total}

      </div>

    </div>
  );
}