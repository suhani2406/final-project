const express = require("express");
const router = express.Router();

const StudyRoom = require("../models/StudyRoom");
const authMiddleware = require("../middleware/authMiddleware");

const getUserId = (req) => {
  return req.user.id || req.user._id || req.user;
};

const createRoomCode = () => {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
};

const populateRoom = async (roomId) => {
  return await StudyRoom.findById(roomId)
    .populate("members", "name email avatar role")
    .populate("createdBy", "name avatar")
    .populate("messages.user", "name avatar");
};

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, subject, goal } = req.body;
    const userId = getUserId(req);

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

    const populated = await populateRoom(room._id);

    res.json(populated);
  } catch (err) {
    console.log("ROOM CREATE ERROR:", err);

    res.status(500).json({
      msg: "Failed to create room",
      error: err.message,
    });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = getUserId(req);

    const rooms = await StudyRoom.find({
      members: userId,
    })
      .populate("members", "name email avatar role")
.populate("createdBy", "name email avatar role")
.populate("messages.user", "name email avatar role")
      .sort({ createdAt: -1 });

    res.json(rooms);
  } catch (err) {
    console.log("FETCH ROOMS ERROR:", err);

    res.status(500).json({
      msg: "Failed to fetch rooms",
    });
  }
});

router.post("/join/code", authMiddleware, async (req, res) => {
  try {
    const { roomCode } = req.body;
    const userId = getUserId(req);

    if (!roomCode) {
      return res.status(400).json({
        msg: "Room code required",
      });
    }

    const room = await StudyRoom.findOne({
      roomCode: roomCode.trim().toUpperCase(),
    });

    if (!room) {
      return res.status(404).json({
        msg: "Invalid room code",
      });
    }

    const alreadyMember = room.members.some(
      (id) => id.toString() === userId.toString()
    );

    if (!alreadyMember) {
      room.members.push(userId);
      await room.save();
    }

    const populated = await populateRoom(room._id);

    res.json(populated);
  } catch (err) {
    console.log("JOIN CODE ERROR:", err);

    res.status(500).json({
      msg: "Join failed",
      error: err.message,
    });
  }
});

router.post("/:id/join", authMiddleware, async (req, res) => {
  try {
    const userId = getUserId(req);

    const room = await StudyRoom.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        msg: "Room not found",
      });
    }

    const alreadyMember = room.members.some(
      (id) => id.toString() === userId.toString()
    );

    if (!alreadyMember) {
      room.members.push(userId);
      await room.save();
    }

    const populated = await populateRoom(room._id);

    res.json(populated);
  } catch (err) {
    console.log("JOIN ROOM ERROR:", err);

    res.status(500).json({
      msg: "Join failed",
      error: err.message,
    });
  }
});

router.post("/:id/messages", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const userId = getUserId(req);

    if (!text || !text.trim()) {
      return res.status(400).json({
        msg: "Message cannot be empty",
      });
    }

    const room = await StudyRoom.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        msg: "Room not found",
      });
    }

    const isMember = room.members.some(
      (id) => id.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({
        msg: "Join room before messaging",
      });
    }

    room.messages.push({
      user: userId,
      text,
    });

    await room.save();

    const populated = await populateRoom(room._id);

    res.json(populated);
  } catch (err) {
    console.log("MESSAGE ERROR:", err);

    res.status(500).json({
      msg: "Message failed",
      error: err.message,
    });
  }
});

module.exports = router;