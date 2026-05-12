import { useEffect, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(30 * 60);
  const [running, setRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          if (!isBreak) {
            setIsBreak(true);
            return 10 * 60;
          }

          setRunning(false);
          setIsBreak(false);
          return 30 * 60;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, isBreak]);

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

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
          className="main-btn flex items-center gap-2"
        >
          <Play size={16} /> Start
        </button>

        <button onClick={() => setRunning(false)} className="secondary-btn">
          Stop
        </button>

        <button
          onClick={() => {
            setSeconds(30 * 60);
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
          <div className="h-3 w-[42%] bg-[#d95f4c] rounded-full" />
        </div>

        <p className="text-sm mt-5 opacity-70">Focus 30 min · Break 10 min</p>
      </div>
    </div>
  );
}