import { useEffect, useRef } from "react";

const SONGS = [
  "/music/f1.mp3",
  "/music/f2.mp3",
  "/music/f3.mp3",
  "/music/f4.mp3",
  "/music/f5.mp3",
];

function FocusSession({ room, onExit }) {
  const {
    seconds,
    running,
    isBreak,
    setRunning,
    setSeconds,
    setIsBreak,
    FOCUS_TIME,
    BREAK_TIME,
  } = useTimer();

  const audioRef = useRef(null);

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  const totalTime = isBreak ? BREAK_TIME : FOCUS_TIME;
  const progress = ((totalTime - seconds) / totalTime) * 100;

  const handleStart = () => {
    const randomSong = SONGS[Math.floor(Math.random() * SONGS.length)];
    if (audioRef.current) {
      audioRef.current.src = randomSong;
      audioRef.current.loop = true;
      audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
    }
    setRunning(true);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setRunning(false);
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSeconds(FOCUS_TIME);
    setRunning(false);
    setIsBreak(false);
  };

  // Stop music if the user navigates away from this room entirely
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40">
      <img
        src={room.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      <button
        onClick={() => {
          if (audioRef.current) audioRef.current.pause();
          onExit();
        }}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md text-white text-sm font-semibold hover:bg-black/60 transition"
      >
        <ArrowLeft size={16} />
        Rooms
      </button>

      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md text-white text-sm font-semibold">
        <Users size={16} />1 here
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
        <div
          className="w-full max-w-[420px] p-7 text-center rounded-[32px] border backdrop-blur-xl"
          style={{
            background: "rgba(10, 10, 20, 0.55)",
            borderColor: `${room.accent}40`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5)`,
            color: "#f5ead0",
          }}
        >
          <h2 className="text-2xl font-black">
            {room.name} {isBreak ? "· Break" : "🎧"}
          </h2>
          <p className="text-sm opacity-70 mt-1">Pomodoro Timer</p>

          <div className="text-6xl font-black mt-8" style={{ color: room.accent }}>
            {min}:{sec.toString().padStart(2, "0")}
          </div>

          <div className="flex gap-4 mt-7 justify-center">
            <button
              onClick={handleStart}
              disabled={running}
              className="px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition"
              style={{ background: room.accent, color: "#1a1a1a" }}
            >
              <Play size={16} /> Start
            </button>

            <button
              onClick={handleStop}
              disabled={!running}
              className="px-6 py-3 rounded-2xl font-semibold bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Stop
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="mt-7">
            <div className="flex justify-between text-sm font-semibold mb-2 opacity-80">
              <span>Session</span>
              <span>{isBreak ? "Break Time" : "Focus Time"}</span>
            </div>

            <div className="w-full h-2.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: room.accent }}
              />
            </div>

            <p className="text-sm mt-5 opacity-60">
              Focus {FOCUS_TIME / 60} min · Break {BREAK_TIME / 60} min
            </p>
          </div>

          <audio ref={audioRef} />
        </div>
      </div>
    </div>
  );
}