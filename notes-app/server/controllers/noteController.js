const Note = require("../models/Note");

const getUserId = (req) => {
  return req.user.id || req.user._id || req.user;
};

// CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const userId = getUserId(req);

    const note = await Note.create({
      user: userId,
      title: req.body.title,
      content: req.body.content,
    });

    res.status(201).json(note);
  } catch (err) {
    console.log("CREATE NOTE ERROR:", err);
    res.status(500).json({ msg: "Error creating note" });
  }
};

// GET ONLY LOGGED-IN USER NOTES
exports.getNotes = async (req, res) => {
  try {
    const userId = getUserId(req);

    const notes = await Note.find({
      user: userId,
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    console.log("GET NOTES ERROR:", err);
    res.status(500).json({ msg: "Error fetching notes" });
  }
};

// DELETE ONLY OWN NOTE
exports.deleteNote = async (req, res) => {
  try {
    const userId = getUserId(req);

    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!note) {
      return res.status(404).json({
        msg: "Note not found or unauthorized",
      });
    }

    res.json({
      msg: "Note deleted successfully",
    });
  } catch (err) {
    console.log("DELETE NOTE ERROR:", err);
    res.status(500).json({ msg: "Error deleting note" });
  }
};