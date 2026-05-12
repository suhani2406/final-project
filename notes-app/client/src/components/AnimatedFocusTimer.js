import { useEffect, useState } from "react";

export default function AnimatedFocusTimer() {

  const [seconds, setSeconds] =
    useState(1500);

  const [running, setRunning] =
    useState(false);

  useEffect(() => {

    let interval;

    if (running && seconds > 0) {

      interval = setInterval(() => {

        setSeconds(prev => prev - 1);

      }, 1000);

    }

    return () => clearInterval(interval);

  }, [running, seconds]);

  const mins =
    Math.floor(seconds / 60);

  const secs =
    seconds % 60;

  const progress =
    (seconds / 1500) * 100;

  return (

    <div
      className="
      glass
      p-8
      relative
      overflow-hidden
    "
    >

      <h2 className="title mb-6">
        Focus Timer 🎧
      </h2>

      {/* CIRCLE */}

      <div className="flex justify-center">

        <div
          className="
          relative
          w-56
          h-56
          rounded-full
          flex
          items-center
          justify-center
        "
          style={{
            background:
              `conic-gradient(
                #d96c52 ${progress}%,
                rgba(255,255,255,0.2) ${progress}%
              )`
          }}
        >

          <div
            className="
            w-44
            h-44
            rounded-full
            bg-white/20
            bg-[#1e293b]
            flex
            items-center
            justify-center
            text-5xl
            font-bold
          "
          >

            {mins}:
            {secs.toString().padStart(2, "0")}

          </div>

        </div>

      </div>

      {/* BUTTONS */}

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => setRunning(true)}
          className="
          flex-1
          py-3
          rounded-2xl
          bg-[#d96c52]
          text-white
        "
        >
          Start
        </button>

        <button
          onClick={() => setRunning(false)}
          className="
          flex-1
          py-3
          rounded-2xl
          bg-white/30
        "
        >
          Pause
        </button>

      </div>

    </div>
  );
}