import { Star } from "lucide-react";

export default function NoteCard({
  note,
  toggleFavorite,
}) {

  return (
    <div
      className="
      bg-white/20
      bg-[#1e293b]
      border border-white/10
      rounded-3xl
      p-5
      shadow-lg
      hover:scale-[1.02]
      transition
      duration-300
    "
    >

      <div className="flex justify-between items-start mb-3">

        <h2 className="text-xl font-bold text-[#3d2b25]">
          {note.title}
        </h2>

        <button onClick={() => toggleFavorite(note.id)}>

          <Star
            size={20}
            className={
              note.favorite
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400"
            }
          />

        </button>

      </div>

      <p className="text-[#6d5c55] text-sm line-clamp-4">
        {note.content}
      </p>

      <div className="mt-4 flex gap-2 flex-wrap">

        {note.tags?.map((tag, i) => (
          <span
            key={i}
            className="
            px-3
            py-1
            rounded-full
            text-xs
            bg-white/30
          "
          >
            {tag}
          </span>
        ))}

      </div>

    </div>
  );
}