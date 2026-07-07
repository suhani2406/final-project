const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const { sendOtpEmail } = require("../utils/mailer");

/* =========================================================
   RANDOM ANIME AVATARS
========================================================= */

const avatars = [
  "https://wallpapers.com/images/hd/cute-anime-profile-pictures-ocsp6rlknshumiuw.jpg",
  "https://i.pinimg.com/736x/37/9e/30/379e305874e6f65d1f6a8f5d0df2715d.jpg",
  "https://i.pinimg.com/736x/5f/73/ff/5f73ff8f6b6a8d18fd4a7f4d3b1d0d13.jpg",
  "https://img.freepik.com/premium-photo/cute-anime-girl-reading-book-studying_1186913-6025.jpg",
];

/* =========================================================
   SIGNUP
========================================================= */

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const randomAvatar =
      avatars[Math.floor(Math.random() * avatars.length)];

    user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: randomAvatar,
    });

    await user.save();

    res.json({ msg: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =========================================================
   LOGIN
========================================================= */

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLogin = new Date();
    await user.save();

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        streak: user.streak,
        quizzesCompleted: user.quizzesCompleted,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =========================================================
   GET LOGGED-IN USER
========================================================= */

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id || req.user._id || req.user
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =========================================================
   UPDATE PROFILE
========================================================= */

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id || req.user._id || req.user
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { name, avatar, role } = req.body;

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (role) user.role = role;

    await user.save();

    res.json({ msg: "Profile updated", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =========================================================
   FORGOT PASSWORD — send OTP
========================================================= */

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "No account found with that email" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    await sendOtpEmail(email, otp);

    res.json({ msg: "OTP sent to your email" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =========================================================
   VERIFY OTP
========================================================= */

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.otp || !user.otpExpires) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Incorrect OTP" });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ msg: "OTP has expired" });
    }

    res.json({ msg: "OTP verified" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =========================================================
   RESET PASSWORD
========================================================= */

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.otp || !user.otpExpires) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ msg: "Incorrect OTP" });
    }

    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ msg: "OTP has expired" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};