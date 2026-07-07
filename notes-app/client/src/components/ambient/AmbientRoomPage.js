import { useState } from "react";
import { RotateCcw, Play, ArrowLeft, Users } from "lucide-react";
import { useTimer } from "../../context/TimerContext";

const ROOMS = [
  {
    id: "lofi",
    name: "Lofi Study Room",
    tagline: "Chill beats and focused vibes. The perfect virtual café for deep work.",
    gradient: "from-[#5b3fae] to-[#2b2f6b]",
    accent: "#b39ddb",
    image:
      "https://img.freepik.com/premium-photo/anime-study-room-night_899449-276857.jpg",
  },
  {
    id: "darkacademia",
    name: "Dark Academia",
    tagline: "Candlelight, old books, and scholarly focus. For the deeply curious mind.",
    gradient: "from-[#8a5a1f] to-[#3d2b12]",
    accent: "#e0a95c",
    image:
      "https://img.freepik.com/premium-photo/anime-boy-studying-library_1031776-514.jpg",
  },
  {
    id: "tokyocafe",
    name: "Tokyo Café",
    tagline: "Neon lights and rain-streaked windows. A cyberpunk café to sharpen your focus.",
    gradient: "from-[#5c1f4e] to-[#241033]",
    accent: "#f48fb1",
    image:
      "https://img.freepik.com/premium-photo/cute-anime-girl-reading-book-studying_1186913-6025.jpg",
  },
  {
    id: "cozylibrary",
    name: "Cozy Library",
    tagline: "Wooden shelves and soft lamp glow. Like your favourite reading nook.",
    gradient: "from-[#3d4a2e] to-[#1c2416]",
    accent: "#c9d97a",
    image:
      "https://img.freepik.com/premium-photo/anime-study-room-night_899449-276857.jpg",
  },
  {
    id: "nightowl",
    name: "Night Owl",
    tagline: "City lights at 2 AM. For night owls who do their best work after dark.",
    gradient: "from-[#1f3a5c] to-[#0d1b2e]",
    accent: "#6ec6ff",
    image:
      "https://img.freepik.com/premium-photo/anime-boy-studying-library_1031776-514.jpg",
  },
  {
    id: "sakura",
    name: "Sakura Garden",
    tagline: "Cherry blossoms and gentle winds. A serene space for peaceful deep focus.",
    gradient: "from-[#7a2035] to-[#33101a]",
    accent: "#ff8fa3",
    image:
      "https://img.freepik.com/premium-photo/cute-anime-girl-reading-book-studying_1186913-6025.jpg",
  },
];
function FocusSession({ room, onExit }) {
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
    <div className="relative min-h-[80vh] rounded-[35px] overflow-hidden">
      <img
        src={room.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <button
        onClick={onExit}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md text-white text-sm font-semibold hover:bg-black/60 transition"
      >
        <ArrowLeft size={16} />
        Rooms
      </button>

      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md text-white text-sm font-semibold">
        <Users size={16} />1 here
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="glass-card w-[420px] p-7 text-center">
          <h2 className="section-title">
            {room.name} {isBreak ? "· Break" : "🎧"}
          </h2>
          <p className="text-sm opacity-70 mt-1">Pomodoro Timer</p>

          <div className="text-6xl font-black mt-8" style={{ color: room.accent }}>
            {min}:{sec.toString().padStart(2, "0")}
          </div>

          <div className="flex gap-4 mt-7 justify-center">
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
                className="h-3 rounded-full transition-all"
                style={{ width: `${progress}%`, background: room.accent }}
              />
            </div>

            <p className="text-sm mt-5 opacity-70">
              Focus {FOCUS_TIME / 60} min · Break {BREAK_TIME / 60} min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
// function FocusSession({ room, onExit }) {
//   const {
//     seconds,
//     running,
//     isBreak,
//     setRunning,
//     setSeconds,
//     setIsBreak,
//     FOCUS_TIME,
//     BREAK_TIME,
//   } = useTimer();

//   const min = Math.floor(seconds / 60);
//   const sec = seconds % 60;

//   const totalTime = isBreak ? BREAK_TIME : FOCUS_TIME;
//   const progress = ((totalTime - seconds) / totalTime) * 100;
//   return (
//   <div className="min-h-screen">

//     {/* Hero */}

//     <div className="relative overflow-hidden rounded-[40px] mb-10">

//       <div className="absolute inset-0 bg-gradient-to-r from-[#3c2a79] via-[#2c2b74] to-[#111827]" />

//       <div className="relative z-10 p-12">

//         <h1 className="text-6xl font-black text-white">
//           Study Worlds 🌙
//         </h1>

//         <p className="text-white/70 text-xl mt-4 max-w-2xl">

//           Enter immersive spaces designed to help you focus,
//           relax and study with friends.

//         </p>

//       </div>

//     </div>



//     <h2 className="text-3xl font-black mb-6">
//       Choose your world
//     </h2>



//     <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-8">

//       {ROOMS.map((room) => (

//         <button
//           key={room.id}
//           onClick={() => setActiveRoom(room)}
//           className="group overflow-hidden rounded-[35px] bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
//         >

//           <div className="relative h-[260px]">

//             <img
//               src={room.image}
//               alt=""
//               className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

//             <div className="absolute bottom-6 left-6">

//               <div
//                 className="inline-block px-4 py-2 rounded-full text-sm font-bold backdrop-blur-xl"
//                 style={{
//                   background: room.accent,
//                   color: "#fff",
//                 }}
//               >
//                 ● Live
//               </div>

//             </div>

//           </div>



//           <div className="p-7">

//             <h2 className="text-3xl font-black mb-3">
//               {room.name}
//             </h2>

//             <p className="text-gray-600 leading-7">
//               {room.tagline}
//             </p>

//             <div className="flex items-center justify-between mt-8">

//               <div className="flex gap-2">

//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                   🌧 Ambient
//                 </span>

//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                   🎵 Music
//                 </span>

//               </div>

//               <span
//                 className="font-bold"
//                 style={{ color: room.accent }}
//               >
//                 Enter →
//               </span>

//             </div>

//           </div>

//         </button>

//       ))}

//     </div>

//   </div>
// );

// }

export default function AmbientRoomPage() {
  const [activeRoom, setActiveRoom] = useState(null);

  if (activeRoom) {
    return <FocusSession room={activeRoom} onExit={() => setActiveRoom(null)} />;
  }

  return (
    <div className="space-y-8">
      <div className="glass p-8 rounded-[35px] relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl font-black mb-3">Ambient Rooms 🌙</h1>
          <p className="text-[#6d5c55] text-lg">
            Pick a mood, drop into a focus session, and let the room set the pace.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {ROOMS.map((room) => (
          <button
            key={room.id}
            onClick={() => setActiveRoom(room)}
            className="text-left glass rounded-[28px] overflow-hidden hover:scale-[1.02] transition-all duration-300"
          >
            <div
              className={`h-32 bg-gradient-to-br ${room.gradient} flex items-center justify-center`}
            >
              <span
                className="text-3xl font-black tabular-nums"
                style={{ color: room.accent }}
              >
                25:00
              </span>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-black mb-2">{room.name}</h2>
              <p className="text-[#6d5c55] text-sm">{room.tagline}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
