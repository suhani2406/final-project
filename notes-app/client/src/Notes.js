import React, { useEffect, useState } from "react";
import API from "../api/axios";

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
const [notes, setNotes] = useState(() => {

  const savedNotes = localStorage.getItem("notes");

  return savedNotes
    ? JSON.parse(savedNotes)
    : [];

});;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    try {
      // const res = await API.get("/notes");
      // setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addNote = async () => {
    if (!title || !content) return;

    try {
      await API.post("/notes", { title, content });

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 3 }}>
        📝 My Notes
      </Typography>

      <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, mb: 4 }}>
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

        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={addNote}>
          Add Note
        </Button>
      </Box>

      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} key={note._id}>
            <Card>
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