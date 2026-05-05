import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid
} from "@mui/material";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5001/api/notes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!title || !content) return;

    await axios.post(
      "http://localhost:5001/api/notes",
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5001/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="md">
      {/* Header */}
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3 }}>
        📝 My Notes
      </Typography>

      {/* Input Section */}
      <Box
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          mb: 4,
          backgroundColor: "#f9f9f9"
        }}
      >
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          fullWidth
          label="Content"
          multiline
          rows={3}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={addNote}
        >
          Add Note
        </Button>
      </Box>

      {/* Notes Grid */}
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} key={note._id}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {note.content}
                </Typography>

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteNote(note._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Notes;