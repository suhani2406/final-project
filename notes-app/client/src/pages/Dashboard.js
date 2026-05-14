import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MotivationPanel from "../components/MotivationPanel";
import FocusTimer from "../components/FocusTimer";
import MusicPlayer from "../components/MusicPlayer";
import NotesGrid from "../components/NotesGrid";
import StreakCalendar from "../components/StreakCalendar";
import AIAssistantPage from "./AIAssistantPage";

import StudyRoomPage from "./StudyRoomPage";
import ProfilePage from "./ProfilePage";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const { darkMode } = useTheme();

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

  return (
    <div
      className="min-h-screen w-full flex bg-cover bg-center text-[#2f2420] transition-all duration-700"
      style={{
        backgroundImage: darkMode
          ? 'url("https://img.freepik.com/premium-photo/torii-moonlight-anime-style_1194342-5553.jpg")'
          : 'url("https://images8.alphacoders.com/132/thumb-1920-1329400.jpeg")',
      }}
    >
      <div
        className={`absolute inset-0 ${
          darkMode ? "bg-black/45" : "bg-white/20"
        }`}
      />

      <div className="relative z-10 flex w-full min-h-screen">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />

        <main className="flex-1 p-6 overflow-y-auto">
          <Header />

          {activePage === "dashboard" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-6 mt-6 max-w-[1500px] mx-auto">
             <section className="xl:col-span-8 space-y-4 md:space-y-6">
                <MotivationPanel />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-card p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="section-title">Today’s Goals</h2>

                      <button onClick={addGoal} className="small-btn">
                        + Add
                      </button>
                    </div>

                    <div className="space-y-4 mt-5 text-sm max-h-[180px] overflow-y-auto">
                      {goals.length === 0 && (
                        <p className="opacity-60">No goals added yet.</p>
                      )}

                      {goals.map((goal, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center gap-3"
                        >
                          <p>✅ {goal}</p>

                          <button
                            onClick={() => deleteGoal(index)}
                            className="text-red-500 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-6">
                    <div className="flex justify-between items-center">
                      <h2 className="section-title">Quick Notes</h2>

                      <button onClick={addQuickNote} className="small-btn">
                        + New
                      </button>
                    </div>

                    <div className="space-y-4 mt-5 text-sm max-h-[180px] overflow-y-auto">
                      {quickNotes.length === 0 && (
                        <p className="opacity-60">No quick notes added yet.</p>
                      )}

                      {quickNotes.map((note, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center gap-3"
                        >
                          <p>🟣 {note}</p>

                          <button
                            onClick={() => deleteQuickNote(index)}
                            className="text-red-500 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

             <section className="xl:col-span-4 space-y-4 md:space-y-6">
                <FocusTimer />
                <MusicPlayer />
              </section>
            </div>
          )}

          {activePage === "notes" && <NotesGrid />}
          {activePage === "ai" && <AIAssistantPage />}
          {activePage === "streak" && <StreakCalendar />}
          {activePage === "studyroom" && <StudyRoomPage />}
          {activePage === "profile" && <ProfilePage />}
        </main>
      </div>
    </div>
  );
}