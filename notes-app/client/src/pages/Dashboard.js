import AmbientRoomPage from "../components/ambient/AmbientRoomPage";
import SettingsPage from "./SettingsPage";
import ProgressPage from "./ProgressPage";
import { useTheme } from "../context/ThemeContext";
import { useState, useRef } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MotivationPanel from "../components/MotivationPanel";
import FocusTimer from "../components/FocusTimer";
import MusicPlayer from "../components/MusicPlayer";
import NotesGrid from "../components/NotesGrid";
import FloatingFocusWidget from "../components/FloatingFocusWidget";

import AIAssistantPage from "./AIAssistantPage";
import StudyRoomPage from "./StudyRoomPage";
import ProfilePage from "./ProfilePage";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode } = useTheme();
  const dashboardAnchorRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || "guest";

  const [goals, setGoals] = useState(
    JSON.parse(localStorage.getItem(`goals_${userId}`)) || []
  );
  const [quickNotes, setQuickNotes] = useState(
    JSON.parse(localStorage.getItem(`quickNotes_${userId}`)) || []
  );

  const addGoal = () => {
    const value = prompt("Enter new goal");
    if (!value) return;
    const updated = [...goals, value];
    setGoals(updated);
    localStorage.setItem(`goals_${userId}`, JSON.stringify(updated));
  };

  const addQuickNote = () => {
    const value = prompt("Enter quick note");
    if (!value) return;
    const updated = [...quickNotes, value];
    setQuickNotes(updated);
    localStorage.setItem(`quickNotes_${userId}`, JSON.stringify(updated));
  };

  const deleteGoal = (index) => {
    const updated = goals.filter((_, i) => i !== index);
    setGoals(updated);
    localStorage.setItem(`goals_${userId}`, JSON.stringify(updated));
  };

  const deleteQuickNote = (index) => {
    const updated = quickNotes.filter((_, i) => i !== index);
    setQuickNotes(updated);
    localStorage.setItem(`quickNotes_${userId}`, JSON.stringify(updated));
  };

  const textColorClass = darkMode ? "text-[#f5ead0]" : "text-[#2f2420]";
  const mutedTextClass = darkMode ? "opacity-70" : "opacity-60";

  return (
    <div
      className={`relative min-h-screen w-full flex bg-cover bg-center ${textColorClass} transition-all duration-700 overflow-hidden`}
      style={{
        backgroundImage: darkMode
          ? 'url("https://img.freepik.com/premium-photo/torii-moonlight-anime-style_1194342-5553.jpg")'
          : 'url("https://images8.alphacoders.com/132/thumb-1920-1329400.jpeg")',
        fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif",
      }}
    >
      {/* Tint overlay */}
      <div
        className={`absolute inset-0 ${
          darkMode
            ? "bg-gradient-to-b from-[#0b0f2a]/70 via-[#1a1035]/50 to-black/60"
            : "bg-gradient-to-b from-white/30 via-[#fff6e9]/20 to-[#f5e6d3]/30"
        }`}
      />

      {/* Falling sakura petals */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="sakura-petal"
            style={{
              left: `${(i * 97) % 100}%`,
              animationDuration: `${9 + (i % 5) * 2}s`,
              animationDelay: `${i * 1.3}s`,
              fontSize: `${14 + (i % 3) * 6}px`,
            }}
          >
            🌸
          </span>
        ))}
      </div>

      <style>{`
        .sakura-petal {
          position: absolute;
          top: -5%;
          opacity: 0.75;
          animation-name: sakuraFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes sakuraFall {
          0%   { transform: translateY(-10%) translateX(0) rotate(0deg); }
          50%  { transform: translateY(55vh) translateX(20px) rotate(180deg); }
          100% { transform: translateY(110vh) translateX(-15px) rotate(360deg); }
        }
        .washi-card {
          background: ${darkMode
            ? "linear-gradient(160deg, rgba(26,20,45,0.75), rgba(10,10,25,0.75))"
            : "linear-gradient(160deg, rgba(255,250,240,0.85), rgba(245,230,210,0.75))"};
          border: 1px solid ${darkMode ? "rgba(212,175,55,0.3)" : "rgba(176,58,46,0.2)"};
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
          backdrop-filter: blur(10px);
          color: ${darkMode ? "#f5ead0" : "#2f2420"};
        }
        .jp-heading {
          letter-spacing: 0.03em;
          position: relative;
          padding-left: 14px;
          color: ${darkMode ? "#f5ead0" : "#2f2420"};
        }
        .jp-heading::before {
          content: "";
          position: absolute;
          left: 0;
          top: 2px;
          bottom: 2px;
          width: 4px;
          border-radius: 2px;
          background: linear-gradient(180deg, #c0392b, #d4af37);
        }
      `}</style>

      {/* Single flex row: Sidebar + Main */}
      <div className="relative z-10 flex w-full min-h-screen">
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto w-full min-w-0">
          <Header onMenuClick={() => setMobileMenuOpen(true)} />

          {/* DASHBOARD — single copy, ref lives on this one and only node */}
          <div
            ref={dashboardAnchorRef}
            className={`grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6 mt-6 max-w-[1500px] mx-auto ${
              activePage === "dashboard" ? "block xl:grid" : "hidden"
            }`}
          >
            <section className="xl:col-span-8 space-y-4 md:space-y-6">
              <MotivationPanel />

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="washi-card rounded-2xl p-4 sm:p-6">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h2 className="jp-heading text-base sm:text-lg font-semibold">
                      今日の目標 · Today's Goals
                    </h2>
                    <button
                      onClick={addGoal}
                      className={`text-sm px-3 py-1 rounded-full border transition ${
                        darkMode
                          ? "border-[#d4af37]/50 hover:bg-[#d4af37]/15 text-[#f5ead0]"
                          : "border-[#c0392b]/40 hover:bg-[#c0392b]/10 text-[#2f2420]"
                      }`}
                    >
                      + 追加
                    </button>
                  </div>

                  <div className="space-y-4 mt-5 text-sm max-h-[180px] overflow-y-auto">
                    {goals.length === 0 && (
                      <p className={`italic ${mutedTextClass}`}>No goals added yet.</p>
                    )}
                    {goals.map((goal, index) => (
                      <div key={index} className="flex justify-between items-center gap-3">
                        <p className="break-words min-w-0">🎌 {goal}</p>
                        <button onClick={() => deleteGoal(index)} className="text-[#e0564a] font-bold shrink-0">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="washi-card rounded-2xl p-4 sm:p-6">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h2 className="jp-heading text-base sm:text-lg font-semibold">
                      メモ · Quick Notes
                    </h2>
                    <button
                      onClick={addQuickNote}
                      className={`text-sm px-3 py-1 rounded-full border transition ${
                        darkMode
                          ? "border-[#d4af37]/50 hover:bg-[#d4af37]/15 text-[#f5ead0]"
                          : "border-[#d4af37]/60 hover:bg-[#d4af37]/10 text-[#2f2420]"
                      }`}
                    >
                      + 新規
                    </button>
                  </div>

                  <div className="space-y-4 mt-5 text-sm max-h-[180px] overflow-y-auto">
                    {quickNotes.length === 0 && (
                      <p className={`italic ${mutedTextClass}`}>No quick notes added yet.</p>
                    )}
                    {quickNotes.map((note, index) => (
                      <div key={index} className="flex justify-between items-center gap-3">
                        <p className="break-words min-w-0">🟣 {note}</p>
                        <button onClick={() => deleteQuickNote(index)} className="text-[#e0564a] font-bold shrink-0">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="xl:col-span-4 space-y-4 md:space-y-6">
              <div className="washi-card rounded-2xl p-4 sm:p-6">
                <FocusTimer />
              </div>
              <div className="washi-card rounded-2xl p-4 sm:p-6">
                <MusicPlayer />
              </div>
            </section>
          </div>

          <div className={activePage === "ambientroom" ? "block mt-6" : "hidden"}>
            <AmbientRoomPage />
          </div>
          <div className={activePage === "settings" ? "block mt-6" : "hidden"}>
  <SettingsPage />
</div>

          <div className={activePage === "notes" ? "block mt-6" : "hidden"}>
            <NotesGrid />
          </div>
          <div className={activePage === "ai" ? "block mt-6" : "hidden"}>
            <AIAssistantPage />
          </div>
          <div className={activePage === "progress" ? "block mt-6" : "hidden"}>
            <ProgressPage />
          </div>
          <div className={activePage === "studyroom" ? "block mt-6" : "hidden"}>
            <StudyRoomPage />
          </div>
          <div className={activePage === "profile" ? "block mt-6" : "hidden"}>
            <ProfilePage />
          </div>
        </main>
      </div>

      {/* Compact floating widget: small pill/circle, never the full-size cards */}
      <FloatingFocusWidget activePage={activePage} dashboardAnchorRef={dashboardAnchorRef} />
    </div>
  );
}