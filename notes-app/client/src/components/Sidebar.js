import {
  LayoutDashboard,
  StickyNote,
  Folder,
  Heart,
  Brain,
  BarChart3,
  Users,
  User,
  Settings,
  Moon,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({ activePage, setActivePage }) {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  let user = null;

try {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    user = JSON.parse(storedUser);
  }
} catch (err) {
  localStorage.removeItem("user");
  user = null;
}

  const menu = [
    { label: "Dashboard", value: "dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Notes", value: "notes", icon: <StickyNote size={18} /> },
    { label: "Folders", value: "folders", icon: <Folder size={18} /> },
    { label: "Favorites", value: "favorites", icon: <Heart size={18} /> },
    { label: "AI Assistant", value: "ai", icon: <Brain size={18} /> },
    { label: "Progress", value: "progress", icon: <BarChart3 size={18} /> },
    { label: "Study Room", value: "studyroom", icon: <Users size={18} /> },
    { label: "Profile", value: "profile", icon: <User size={18} /> },
    { label: "Settings", value: "settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="hidden lg:flex w-[270px] min-h-screen p-6 bg-white/75 backdrop-blur-xl rounded-r-[32px] flex-col justify-between shadow-xl">
      <div>
        <h1 className="text-3xl font-black">YumeNote 🌸</h1>
        <p className="text-sm opacity-70 mt-1">Your peaceful workspace</p>

        <div className="mt-10 space-y-3">
          {menu.map((item) => (
            <button
              key={item.value}
              onClick={() => setActivePage(item.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                activePage === item.value
                  ? "bg-[#d95f4c] text-white shadow-lg"
                  : "hover:bg-white/70"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between bg-white/60 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3">
            <Moon size={18} />
            <span className="font-semibold">Dark Mode</span>
          </div>

          <div
            className={`w-11 h-6 rounded-full transition ${
              darkMode ? "bg-[#2f2f46]" : "bg-[#d95f4c]"
            }`}
          />
        </button>

        <button
          onClick={() => setActivePage("profile")}
          className="w-full flex items-center gap-3 bg-white/60 rounded-2xl p-4 text-left"
        >
          <img
            src={
              user?.avatar ||
              "https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg"
            }
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold text-sm">
              {user?.name || "Guest User"}
            </h3>
            <p className="text-xs opacity-70">
              {user?.role || "Student"}
            </p>
          </div>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 bg-red-100 text-red-600 rounded-2xl p-4 font-semibold"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}