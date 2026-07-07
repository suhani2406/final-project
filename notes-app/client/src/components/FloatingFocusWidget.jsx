import { useEffect, useRef, useState } from "react";
import { useTimer } from "../context/TimerContext";
import MusicPlayer from "./MusicPlayer";

export default function FloatingFocusWidget({ activePage, dashboardAnchorRef }) {
  const { seconds, running, setRunning, isBreak } = useTimer();
  const [showOnDashboard, setShowOnDashboard] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [pos, setPos] = useState({ x: window.innerWidth - 260, y: window.innerHeight - 100 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const min = Math.floor(seconds / 60);
  const sec = String(seconds % 60).padStart(2, "0");

  useEffect(() => {
    if (activePage !== "dashboard" || !dashboardAnchorRef?.current) {
      setShowOnDashboard(false);
      return;
    }
    const el = dashboardAnchorRef.current;
    const observer = new IntersectionObserver(([entry]) => setShowOnDashboard(!entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [activePage, dashboardAnchorRef]);

  const startDrag = (x, y) => { dragging.current = true; offset.current = { x: x - pos.x, y: y - pos.y }; };
  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      setPos({
        x: Math.min(Math.max(0, cx - offset.current.x), window.innerWidth - 60),
        y: Math.min(Math.max(0, cy - offset.current.y), window.innerHeight - 60),
      });
    };
    const end = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
    };
  }, []);

  const onDashboard = activePage === "dashboard";
  if (onDashboard && !showOnDashboard) return null;

  const style = { position: "fixed", left: pos.x, top: pos.y, zIndex: 9999, touchAction: "none" };

  // Collapsed circle (everywhere except dashboard, until tapped)
  if (!onDashboard && !expanded) {
    return (
      <button
        style={style}
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
        onClick={() => setExpanded(true)}
        aria-label={`Focus timer, ${min} minutes ${sec} seconds remaining, ${running ? "running" : "paused"}. Tap to expand.`}
        className="w-14 h-14 rounded-full bg-[#1e1533] text-white flex items-center justify-center shadow-lg border border-white/15 focus:outline-none focus:ring-2 focus:ring-[#d95f4c] focus:ring-offset-2"
      >
        <span
          aria-hidden="true"
          className={`absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-[#1e1533] ${running ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
        />
        <span className="text-xs font-bold tabular-nums">{min}:{sec}</span>
      </button>
    );
  }

  // Expanded card: real timer + real music player, both working
  return (
    <div
      style={style}
      role="region"
      aria-label="Focus timer and music player"
      className="bg-[#1e1533] text-white rounded-2xl shadow-2xl border border-white/15 w-64 overflow-hidden max-h-[80vh] overflow-y-auto"
    >
      <div
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => startDrag(e.touches[0].clientX, e.touches[0].clientY)}
        className="flex items-center justify-between px-4 py-2 cursor-grab active:cursor-grabbing bg-white/5 sticky top-0"
      >
        <span className="text-xs font-semibold tracking-wide">集中 · Focus</span>
        {!onDashboard && (
          <button
            onClick={() => setExpanded(false)}
            aria-label="Minimize focus widget"
            className="text-xs opacity-70 hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-white rounded px-1"
          >
            ✕
          </button>
        )}
      </div>

      <div className="px-4 py-3">
        <p className="text-[11px] uppercase tracking-wide opacity-60 mb-1">
          {isBreak ? "Break Time" : "Focus Time"}
        </p>
        <p className="text-3xl font-black tabular-nums" aria-live="polite">
          {min}:{sec}
        </p>

        <button
          onClick={() => setRunning(!running)}
          aria-label={running ? "Pause focus timer" : "Start focus timer"}
          className="mt-3 w-full py-2 rounded-full bg-[#d95f4c] hover:bg-[#c14e3c] font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {running ? "⏸ Pause" : "▶ Start"}
        </button>
      </div>

      <div className="px-4 py-3 border-t border-white/10 text-[#2f2420]">
        <MusicPlayer />
      </div>
    </div>
  );
}