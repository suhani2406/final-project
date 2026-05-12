import { useState } from "react";

export default function CreateNoteModal({
  setShowModal,
  addNote,
}) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSave = () => {

    const newNote = {
      title,
      content,
      favorite: false,
      tags: tags.split(","),
    };

    addNote(newNote);

    setShowModal(false);
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/40
bg-[#1e293b]
      flex
      items-center
      justify-center
      z-50
    "
    >

      <div
        className="
        w-[500px]
        bg-[#f7ece6]
        rounded-3xl
        p-8
        shadow-2xl
      "
      >

        <h2 className="text-3xl font-bold mb-6">
          Create Note ✨
        </h2>

        <input
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
          w-full
          p-4
          rounded-2xl
          mb-4
          bg-white/70
          outline-none
        "
        />

        <textarea
          placeholder="Write your thoughts..."
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="
          w-full
          p-4
          rounded-2xl
          mb-4
          bg-white/70
          outline-none
        "
        />

        <input
          placeholder="Tags separated by commas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="
          w-full
          p-4
          rounded-2xl
          bg-white/70
          outline-none
        "
        />

        <div className="flex gap-4 mt-6">

          <button
            onClick={handleSave}
            className="
            flex-1
            py-3
            rounded-2xl
            bg-[#9d5c4d]
            text-white
            font-semibold
          "
          >
            Save
          </button>

          <button
            onClick={() => setShowModal(false)}
            className="
            flex-1
            py-3
            rounded-2xl
            bg-gray-300
          "
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}