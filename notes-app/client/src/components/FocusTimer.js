import { Play, RotateCcw } from "lucide-react";
import { useTimer } from "../context/TimerContext";

export default function FocusTimer() {
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

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  const totalTime = isBreak ? BREAK_TIME : FOCUS_TIME;
  const progress = ((totalTime - seconds) / totalTime) * 100;

  return (
    <div className="glass-card p-7">
      <h2 className="section-title">Focus Mode 🎧</h2>
      <p className="text-sm opacity-70 mt-1">Pomodoro Timer</p>

      <div className="text-6xl font-black mt-8">
        {min}:{sec.toString().padStart(2, "0")}
      </div>

     <div className="flex gap-4 mt-7">
    <button
      onClick={() => setRunning(true)}
      disabled={running}
      className="main-btn flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Play size={16} /> Start
    </button>

    <button
      onClick={() => setRunning(false)}
      disabled={!running}
      className="secondary-btn disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Stop
    </button>

        <button
          onClick={() => {
            setSeconds(FOCUS_TIME);
            setRunning(false);
            setIsBreak(false);
          }}
          className="secondary-btn"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="mt-7">
        <div className="flex justify-between text-sm font-semibold mb-2">
          <span>Session</span>
          <span>{isBreak ? "Break Time" : "Focus Time"}</span>
        </div>

        <div className="w-full h-3 bg-white/50 rounded-full">
          <div
            className="h-3 bg-[#d95f4c] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm mt-5 opacity-70">Focus 30 min · Break 10 min</p>
      </div>
    </div>
  );
}