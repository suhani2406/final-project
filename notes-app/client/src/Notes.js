import React, { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  // ✅ GET NOTES
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ CREATE NOTE
  const handleAddNote = async () => {
    try {
      await axios.post(
        "http://localhost:5001/api/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setContent("");
      fetchNotes(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ DELETE NOTE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Notes</h2>

      {/* Add Note */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />
      <button onClick={handleAddNote}>Add Note</button>

      <hr />

      {/* Notes List */}
      {notes.map((note) => (
        <div key={note._id} style={{ marginBottom: "10px" }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Notes;