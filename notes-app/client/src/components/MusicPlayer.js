import { useRef, useState } from "react";
import { Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

const tracks = [
  { name: "Lofi Beats", src: "/music/f1.mp3" },
  { name: "3AM Silence", src: "/music/f2.mp3" },
  { name: "Soft Study", src: "/music/f3.mp3" },
];

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const playPause = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      await audioRef.current.play();
      setPlaying(true);
    }
  };

  const nextTrack = () => {
    const next = (index + 1) % tracks.length;
    setIndex(next);
    setTimeout(() => {
      audioRef.current.load();
      audioRef.current.play();
      setPlaying(true);
    }, 100);
  };

  return (
    <div className="glass-card p-7">
      <h2 className="section-title">Music Player</h2>

      <div className="flex items-center gap-5 mt-7">
        <div className="w-24 h-24 bg-[#ef6f61] rounded-3xl flex items-center justify-center text-5xl text-white">
          ♫
        </div>

        <div>
          <h3 className="font-black text-lg">{tracks[index].name}</h3>
          <p className="text-sm opacity-70">Chill & Study</p>

          <div className="flex gap-5 mt-5 items-center">
            <SkipBack size={20} />
            <button
              onClick={playPause}
              className="w-12 h-12 rounded-full bg-[#2f2420] text-white flex items-center justify-center"
            >
              <Play size={18} />
            </button>
            <button onClick={nextTrack}>
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-7">
        <Volume2 size={18} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            setVolume(e.target.value);
            audioRef.current.volume = e.target.value;
          }}
          className="w-full"
        />
      </div>

      <audio ref={audioRef} src={tracks[index].src} loop />
    </div>
  );
}