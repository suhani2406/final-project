// const express = require("express");
// const router = express.Router();

// const { signup, login } = require("../controllers/authController");

// router.get("/test", (req, res) => {
//   res.send("Auth route working");
// });

// router.post("/signup", signup);
// router.post("/login", login);

// module.exports = router;
const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getMe,
  updateProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/test", (req, res) => {
  res.send("Auth route working");
});

router.post("/signup", signup);
router.post("/login", login);

// logged-in user profile
router.get("/me", authMiddleware, getMe);

// update avatar/name/role
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;