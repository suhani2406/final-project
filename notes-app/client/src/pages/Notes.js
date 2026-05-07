import React, { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid
} from "@mui/material";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addNote = async () => {
    if (!title || !content) return;

    await API.post("/notes", { title, content });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "#f4f1ec" }}>

      {/* 🔥 SIDEBAR */}
      <Box sx={{
        width: 250,
        p: 3,
        background: "#fff",
        borderRight: "1px solid #eee"
      }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          📒 YumeNote
        </Typography>

        <Typography sx={{ mb: 2 }}>Dashboard</Typography>
        <Typography sx={{ mb: 2 }}>Notes</Typography>
        <Typography sx={{ mb: 2 }}>Folders</Typography>
        <Typography sx={{ mb: 2 }}>Favorites</Typography>
      </Box>

      {/* 🔥 MAIN AREA */}
      <Box sx={{ flex: 1, p: 4 }}>

        {/* HEADER */}
        <Typography variant="h4" sx={{ mb: 2 }}>
          ✨ My Notes
        </Typography>

        {/* INPUT */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={addNote}>
            Add Note
          </Button>
        </Paper>

        {/* NOTES */}
        <Grid container spacing={2}>
          {notes.map((note) => (
            <Grid item xs={12} md={6} key={note._id}>
              <Paper sx={{ p: 2, borderRadius: 3 }}>
                <Typography variant="h6">{note.title}</Typography>
                <Typography sx={{ mb: 2 }}>{note.content}</Typography>

                <Button
                  color="error"
                  onClick={() => deleteNote(note._id)}
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🔥 RIGHT PANEL */}
      <Box sx={{
        width: 250,
        p: 3,
        background: "#fff",
        borderLeft: "1px solid #eee"
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Tags
        </Typography>

        <Typography>Work</Typography>
        <Typography>Personal</Typography>
        <Typography>Ideas</Typography>
      </Box>
    </Box>
  );
};

export default Notes;