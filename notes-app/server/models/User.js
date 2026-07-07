// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
otp: {
  type: String,
},
otpExpires: {
  type: Date,
},
streak: {
  type: Number,
  default: 0,
},
longestStreak: {
  type: Number,
  default: 0,
},
    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default:
        "https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg",
    },

    role: {
      type: String,
      default: "Student",
    },

    streak: {
      type: Number,
      default: 0,
    },

    totalStudyHours: {
      type: Number,
      default: 0,
    },

    quizzesCompleted: {
      type: Number,
      default: 0,
    },
    loginCount: {
  type: Number,
  default: 0,
},

lastLogin: {
  type: Date,
},

    weakAreas: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);