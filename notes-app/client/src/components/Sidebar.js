import {
  LayoutDashboard, StickyNote, Folder, Heart, Brain,
  BarChart3, Users, User, Settings, Moon, LogOut, Sparkles, X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar({ activePage, setActivePage, mobileOpen, onClose }) {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") user = JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("user");
  }

  const menu = [
    { label: "Dashboard", value: "dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Notes", value: "notes", icon: <StickyNote size={18} /> },
    { label: "Folders", value: "folders", icon: <Folder size={18} /> },
    { label: "Favorites", value: "favorites", icon: <Heart size={18} /> },
    { label: "AI Assistant", value: "ai", icon: <Brain size={18} /> },
    { label: "Progress", value: "progress", icon: <BarChart3 size={18} /> },
    { label: "Study Room", value: "studyroom", icon: <Users size={18} /> },
    { label: "Ambient Room", value: "ambientroom", icon: <Sparkles size={18} /> },
    { label: "Profile", value: "profile", icon: <User size={18} /> },
    { label: "Settings", value: "settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleSelect = (value) => {
    setActivePage(value);
    onClose?.();
  };

  const sidebarContent = (
    <>
      <div>
        <div className="flex items-center justify-between lg:block">
          <div>
            <h1 className="text-3xl font-black">YumeNote 🌸</h1>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "opacity-70"}`}>
              Your peaceful workspace
            </p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-10 space-y-3">
          {menu.map((item) => (
            <button
              key={item.value}
              onClick={() => handleSelect(item.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition ${
                activePage === item.value
                  ? "bg-[#d95f4c] text-white shadow-lg"
                  : darkMode
                  ? "hover:bg-white/10 text-gray-300"
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
          className={`w-full flex items-center justify-between rounded-2xl p-4 ${
            darkMode ? "bg-white/5" : "bg-white/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <Moon size={18} />
            <span className="font-semibold">Dark Mode</span>
          </div>
          <div className={`w-11 h-6 rounded-full transition ${darkMode ? "bg-[#d95f4c]" : "bg-gray-300"}`}>
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transition-transform mt-0.5 ${
                darkMode ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
        </button>

        <button
          onClick={() => handleSelect("profile")}
          className={`w-full flex items-center gap-3 rounded-2xl p-4 text-left ${
            darkMode ? "bg-white/5" : "bg-white/60"
          }`}
        >
          <img
            src={user?.avatar || "https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg"}
            alt="avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-sm">{user?.name || "Guest User"}</h3>
            <p className={`text-xs ${darkMode ? "text-gray-400" : "opacity-70"}`}>
              {user?.role || "Student"}
            </p>
          </div>
        </button>

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 rounded-2xl p-4 font-semibold ${
            darkMode ? "bg-red-500/10 text-red-400" : "bg-red-100 text-red-600"
          }`}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar — unchanged behavior */}
      <aside
        className={`hidden lg:flex w-[270px] min-h-screen p-6 backdrop-blur-xl rounded-r-[32px] flex-col justify-between shadow-xl transition-colors ${
          darkMode
            ? "bg-[#0f1424]/90 text-gray-200 border-r border-white/5"
            : "bg-white/75 text-[#2f2420]"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer + backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`lg:hidden fixed top-0 left-0 h-screen w-[280px] max-w-[85vw] p-6 backdrop-blur-xl flex flex-col justify-between shadow-2xl z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          darkMode
            ? "bg-[#0f1424]/95 text-gray-200 border-r border-white/5"
            : "bg-white/95 text-[#2f2420]"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}