import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MotivationPanel from "../components/MotivationPanel";
import FocusTimer from "../components/FocusTimer";
import MusicPlayer from "../components/MusicPlayer";
import NotesGrid from "../components/NotesGrid";
import AIAssistantPage from "./AIAssistantPage";
import ProgressPage from "./ProgressPage";
import StudyRoomPage from "./StudyRoomPage";
import ProfilePage from "./ProfilePage";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const { darkMode } = useTheme();

  return (
    // <div
    //   className="min-h-screen w-full flex bg-cover bg-center text-[#2f2420]"
    //   style={{
    //     backgroundImage:
    //       'url("https://as1.ftcdn.net/v2/jpg/07/97/79/80/1000_F_797798018_w391h0EaJzr8R9zxLIVsiI2LQvJBBRKw.jpg")',
    //   }}
    // >
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
  <div className="grid grid-cols-12 gap-6 mt-6 max-w-[1500px] mx-auto">
    <section className="col-span-12 xl:col-span-8 space-y-6">
      <MotivationPanel />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="section-title">Today’s Goals</h2>
          <div className="space-y-4 mt-5 text-sm">
            <p>✅ Finish Dashboard UI</p>
            <p>✅ Study for AI Exam</p>
            <p>✅ Read 20 pages</p>
            <p>⬜ Practice 20 MCQs</p>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex justify-between items-center">
            <h2 className="section-title">Quick Notes</h2>
            <button className="small-btn">+ New</button>
          </div>
          <div className="space-y-4 mt-5 text-sm">
            <p>🟣 React Project Ideas</p>
            <p>🟣 AI Flashcards Plan</p>
            <p>🟠 Podcast Episode Ideas</p>
          </div>
        </div>
      </div>
    </section>

    <section className="col-span-12 xl:col-span-4 space-y-6">
      <FocusTimer />
      <MusicPlayer />
    </section>
  </div>
)}

             

          {activePage === "notes" && <NotesGrid />}
          {activePage === "ai" && <AIAssistantPage />}
          {activePage === "progress" && <ProgressPage />}
          {activePage === "studyroom" && <StudyRoomPage />}
          {activePage === "profile" && <ProfilePage />}
        </main>
      </div>
    </div>
  );
}