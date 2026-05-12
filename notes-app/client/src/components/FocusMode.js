import { useEffect, useRef, useState } from "react";

export default function FocusMode() {

  const [minutes, setMinutes] = useState(25);

  const [seconds, setSeconds] = useState(0);

  const [isRunning, setIsRunning] =
    useState(false);
  

  const audioRef = useRef(null);

  useEffect(() => {

    let timer;

    if (isRunning) {

      timer = setInterval(() => {

        if (seconds > 0) {
          setSeconds(seconds - 1);

        } else {

          if (minutes === 0) {

            clearInterval(timer);

            setIsRunning(false);

            audioRef.current.pause();

            audioRef.current.currentTime = 0;

            alert(
              "Focus session completed 🌸"
            );

          } else {

            setMinutes(minutes - 1);

            setSeconds(59);

          }

        }

      }, 1000);

    }

    return () => clearInterval(timer);

  }, [isRunning, seconds, minutes]);
    const songs = [
  "/music/f1.mp3",
  "/music/f2.mp3",
  "/music/f3.mp3",
  "/music/f4.mp3",
  "/music/f5.mp3",
];

  const startFocus = () => {

  const randomSong =
    songs[
      Math.floor(
        Math.random() * songs.length
      )
    ];

  audioRef.current.src = randomSong;

  audioRef.current.play();

  setIsRunning(true);

};
  const stopFocus = () => {

    setIsRunning(false);

    audioRef.current.pause();

    audioRef.current.currentTime = 0;

  };

  return (
    <div
      className="
      bg-white/20
      bg-[#1e293b]
      rounded-[32px]
      border border-white/10
      p-6
      shadow-[0_8px_40px_rgba(0,0,0,0.08)]
    "
    >

      <h2 className="text-3xl font-bold text-[#3f2b24] mb-6">
        Focus Mode 🎧
      </h2>

      <div className="text-6xl font-bold text-[#5a463f] mb-8">

        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}

      </div>

      <div className="flex gap-4">

        <button
          onClick={startFocus}
          className="
          bg-[#9d5c4d]
          text-white
          px-6
          py-3
          rounded-2xl
        "
        >
          Start
        </button>

        <button
          onClick={stopFocus}
          className="
          bg-white/20
          text-[#3f2b24]
          px-6
          py-3
          rounded-2xl
        "
        >
          Stop
        </button>

      </div>

     <audio
  ref={audioRef}
  loop
/>

    </div>
  );
}