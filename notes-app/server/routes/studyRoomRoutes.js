const express = require("express");
const router = express.Router();

const StudyRoom = require("../models/StudyRoom");
const authMiddleware = require("../middleware/authMiddleware");

const createRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { name, subject, goal } = req.body;

//     const room = await StudyRoom.create({
//       name,
//       subject,
//       goal,
//       roomCode: createRoomCode(),
//       createdBy: req.user.id || req.user._id || req.user,
//       members: [req.user.id || req.user._id || req.user],
//     });

//     res.json(room);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Failed to create room" });
//   }
// });

// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const rooms = await StudyRoom.find()
//       .populate("members", "name email avatar role")
//       .populate("createdBy", "name avatar")
//       .populate("messages.user", "name avatar")
//       .sort({ createdAt: -1 });

//     res.json(rooms);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Failed to fetch rooms" });
//   }
// });

// router.post("/:id/join", authMiddleware, async (req, res) => {
//   try {
//     const room = await StudyRoom.findById(req.params.id);

//     if (!room) {
//       return res.status(404).json({ msg: "Room not found" });
//     }

//     const alreadyMember = room.members.some(
//       (memberId) => memberId.toString() === req.user.id || req.user._id || req.user
//     );

//     if (!alreadyMember) {
//       room.members.push(req.user.id || req.user._id || req.user);
//       await room.save();
//     }

//     res.json({ msg: "Joined room" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Join failed" });
//   }
// });
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, subject, goal } = req.body;

    const userId =
      req.user.id || req.user._id || req.user;

    if (!name || !subject) {
      return res.status(400).json({
        msg: "Name and subject required",
      });
    }

    const room = await StudyRoom.create({
      name,
      subject,
      goal: goal || "Study together",
      roomCode: createRoomCode(),
      createdBy: userId,
      members: [userId],
    });

    const populatedRoom =
      await StudyRoom.findById(room._id)
        .populate("members", "name email avatar role")
        .populate("createdBy", "name avatar")
        .populate("messages.user", "name avatar");

    res.json(populatedRoom);
  } catch (err) {
    console.log("ROOM CREATE ERROR:", err);

    res.status(500).json({
      msg: "Failed to create room",
      error: err.message,
    });
  }
});

router.post("/join/code", authMiddleware, async (req, res) => {
  try {
    const { roomCode } = req.body;

    const room = await StudyRoom.findOne({
      roomCode: roomCode.toUpperCase(),
    });

    if (!room) {
      return res.status(404).json({ msg: "Invalid room code" });
    }

    const alreadyMember = room.members.some(
      (memberId) => memberId.toString() === req.user.id || req.user._id || req.user
    );

    if (!alreadyMember) {
      room.members.push(req.user.id || req.user._id || req.user);
      await room.save();
    }

    res.json({ msg: "Joined room" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Join failed" });
  }
});

router.post("/:id/messages", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    const userId = req.user.id || req.user._id || req.user;

    const room = await StudyRoom.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    room.messages.push({
      user: userId,
      text,
    });

    await room.save();

    const updatedRoom = await StudyRoom.findById(room._id)
      .populate("members", "name email avatar role")
      .populate("createdBy", "name avatar")
      .populate("messages.user", "name avatar");

    res.json(updatedRoom);
  } catch (err) {
    console.log("MESSAGE ERROR:", err);
    res.status(500).json({ msg: "Message failed" });
  }
});

module.exports = router;