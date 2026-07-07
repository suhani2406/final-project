import { Search, Bell, Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  return (
    <header className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden shrink-0 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow truncate">
            Welcome back, {user?.name || "Student"} ✨
          </h1>
          <p className="text-white/90 text-xs sm:text-sm hidden sm:block">
            Stay focused and build beautifully today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 shrink-0">
        <div className="hidden md:flex w-[240px] lg:w-[380px] xl:w-[520px] bg-white/80 rounded-2xl px-5 py-3 items-center gap-3 shadow">
          <Search size={18} />
          <input
            placeholder="Search notes, flashcards, etc..."
            className="bg-transparent outline-none w-full text-sm"
          />
          <span className="bg-white px-2 py-1 rounded-lg text-xs">⌘K</span>
        </div>

        <div className="relative">
          <Bell className="text-white" size={20} />
          {notifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </div>

        <img
          src={user?.avatar || "https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg"}
          alt="profile"
          className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
        />
      </div>
    </header>
  );
}