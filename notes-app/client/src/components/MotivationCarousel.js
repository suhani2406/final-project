const quotes = [

  "Small steps every day build massive results ✨",

  "Consistency creates elegance.",

  "Discipline beats motivation.",

  "You are building your dream life slowly 🌸",

  "Focus. Build. Repeat.",

];

export default function MotivationCarousel() {
const user =
  JSON.parse(localStorage.getItem("user")) || {};

const streak =
  localStorage.getItem(
    `streak_${user.id || "guest"}`
  ) || 1;

const today =
  new Date().getDate();

const randomQuote =
  quotes[today % quotes.length];

  return (
    

    <div
      className="
      glass
      p-8
      min-h-[180px]
      flex
      flex-col
      justify-center
      animate-pulse
    "
    >

      <h1
        className="
        text-5xl
        font-black
        mb-4
      "
      >
        Today's Focus ✨
      </h1>

      <p
        className="
        text-xl
        text-[#5f4b45]
      "
      >
        {randomQuote}
      </p>
     <p className="text-sm opacity-80 mt-3">
  🔥 Current streak: {streak} days
</p>

    </div>
  );
}