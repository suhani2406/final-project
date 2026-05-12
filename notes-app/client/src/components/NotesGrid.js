import { useState } from "react";

import NoteCard from "./NoteCard";
import CreateNoteModal from "./CreateNoteModal";
import FoldersPanel from "./FoldersPanel";

export default function NotesGrid() {

  const [showModal, setShowModal] =
    useState(false);

  const [activeFolder, setActiveFolder] =
    useState("All");

  const [search, setSearch] =
    useState("");

  // LOCAL STORAGE NOTES

  const [notes, setNotes] = useState(() => {

    const savedNotes =
      localStorage.getItem("notes");

    return savedNotes
      ? JSON.parse(savedNotes)
      : [];

  });

  // FOLDERS

  const folders = [
    "Study",
    "Work",
    "Personal",
  ];

  // FILTER NOTES

  const filteredNotes = notes.filter((note) => {

    const matchesFolder =
      activeFolder === "All"
        ? true
        : note.folder === activeFolder;

    const matchesSearch =
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      note.content
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      note.tags
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesFolder && matchesSearch;
  });

  // ADD NOTE

  const addNote = (newNote) => {

    const noteWithId = {
      ...newNote,
      id: Date.now(),
    };

    const updatedNotes = [
      noteWithId,
      ...notes,
    ];

    setNotes(updatedNotes);

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );
  };

  // FAVORITE

  const toggleFavorite = (id) => {

    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            favorite: !note.favorite,
          }
        : note
    );

    setNotes(updatedNotes);

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );
  };

  return (

    <div className="max-w-7xl mx-auto p-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-[#3d2b25]">
          My Notes
        </h1>

        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-[300px]
            px-5
            py-3
            rounded-2xl
            bg-white/30
            bg-[#1e293b]
            outline-none
            border border-white/10
          "
        />

        <button
          onClick={() => setShowModal(true)}
          className="
            px-6
            py-3
            rounded-2xl
            bg-[#9d5c4d]
            text-white
            font-semibold
            hover:scale-105
            transition
          "
        >
          + New Note
        </button>

      </div>

      {/* MAIN */}

      <div className="flex gap-6">

        {/* SIDEBAR */}

        <FoldersPanel
          folders={folders}
          activeFolder={activeFolder}
          setActiveFolder={setActiveFolder}
        />

        {/* NOTES */}

        <div className="flex-1">

          {filteredNotes.length === 0 ? (

            <div
              className="
                h-[400px]
                flex
                items-center
                justify-center
                text-2xl
                font-semibold
                opacity-50
              "
            >
              No notes yet ✨
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >

              {filteredNotes.map((note) => (

                <NoteCard
                  key={note.id}
                  note={note}
                  toggleFavorite={toggleFavorite}
                />

              ))}

            </div>

          )}

        </div>

      </div>

      {/* MODAL */}

      {showModal && (

        <CreateNoteModal
          setShowModal={setShowModal}
          addNote={addNote}
        />

      )}

    </div>
  );
}