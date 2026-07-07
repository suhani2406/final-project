const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getMe,
  updateProfile,
  forgotPassword,
  verifyOtp,
  resetPassword,
  syncStreak,
  getLeaderboard,
    deleteAccount,

} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// test route
router.get("/test", (req, res) => {
  res.send("Auth route working");
});
router.delete("/delete-account", authMiddleware, deleteAccount);


router.put("/sync-streak", authMiddleware, syncStreak);
router.get("/leaderboard", getLeaderboard); // public — no auth needed to view rankings

// signup/login
router.post("/signup", signup);
router.post("/login", login);
//pass
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

// logged in user
router.get("/me", authMiddleware, getMe);

// update profile
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

// update avatar
router.put(
  "/avatar",
  authMiddleware,
  async (req, res) => {
    try {
      const { avatar } = req.body;

      const user =
        await User.findByIdAndUpdate(
          req.user.id,
          { avatar },
          { new: true }
        ).select("-password");

      res.json(user);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        msg: "Avatar update failed",
      });
    }
  }
);

module.exports = router;