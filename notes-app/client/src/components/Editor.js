import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Editor() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const createNote = async () => {
    await API.post("/notes", {
      title: "New Note",
      content: text,
    });

    setText("");
    fetchNotes();
  };

  return (
    <div className="editor">
      <h2>Notes</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        style={{ width: "100%", height: "100px" }}
      />

      <button onClick={createNote}>Save</button>

      {notes.map((note) => (
        <div key={note._id}>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}