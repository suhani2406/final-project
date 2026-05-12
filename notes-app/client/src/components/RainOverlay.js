export default function RainOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 opacity-20">

      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[1px] h-[20px] bg-white animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${0.5 + Math.random()}s`,
          }}
        />
      ))}

    </div>
  );
}