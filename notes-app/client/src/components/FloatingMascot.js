export default function FloatingMascot() {
  return (
    <div
      className="
        fixed
        bottom-6
        left-6
        flex
        items-end
        gap-3
      "
    >
      <img
        src="https://i.pinimg.com/736x/37/9e/30/379e305874e6f65d1f6a8f5d0df2715d.jpg"
        alt="mascot"
        className="w-24 h-24 rounded-3xl object-cover shadow-xl"
      />

      <div
        className="
          bg-white/70
bg-[#1e293b]
          px-5
          py-4
          rounded-2xl
          text-sm
          text-[#5c443d]
          shadow-lg
        "
      >
        Stay motivated 🌸
      </div>
    </div>
  );
}