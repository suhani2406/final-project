const Note = require("../models/Note");

// ✅ CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ msg: "Error creating note" });
  }
};

// ✅ GET ALL NOTES (ONLY CURRENT USER)
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notes" });
  }
};

// ✅ DELETE NOTE (SECURE VERSION)
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id   // 🔐 ensures user can delete ONLY their notes
    });

    if (!note) {
      return res.status(404).json({ msg: "Note not found or unauthorized" });
    }

    res.json({ msg: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting note" });
  }
};