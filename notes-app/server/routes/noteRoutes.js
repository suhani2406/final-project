const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  createNote,
  getNotes,
  deleteNote
} = require("../controllers/noteController");

// ALL ROUTES PROTECTED 🔐
router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;