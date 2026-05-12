import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-black text-white drop-shadow">
          Welcome back, Suhani ✨
        </h1>
        <p className="text-white/90">Stay focused and build beautifully today.</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="w-[520px] bg-white/80 rounded-2xl px-5 py-3 flex items-center gap-3 shadow">
          <Search size={18} />
          <input
            placeholder="Search notes, flashcards, etc..."
            className="bg-transparent outline-none w-full text-sm"
          />
          <span className="bg-white px-2 py-1 rounded-lg text-xs">⌘K</span>
        </div>

        <div className="relative">
          <Bell className="text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        <img
          src="https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg"
          alt=""
          className="w-12 h-12 rounded-full border-2 border-white object-cover"
        />
      </div>
    </header>
  );
}