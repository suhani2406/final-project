const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    text: String,
  },
  {
    timestamps: true,
  }
);

const studyRoomSchema = new mongoose.Schema(
  {
    name: String,

    subject: String,

    goal: String,

    roomCode: {
      type: String,
      unique: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "StudyRoom",
  studyRoomSchema
);