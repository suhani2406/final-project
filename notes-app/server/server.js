 //if issue like this happen like server showing running intermnal but in reality we cant get pong so just change the local host number to 5001 or any other number and then try to ping localhost:5001/ping and you will get pong response. This is because sometimes the port 5000 is already occupied by some other process and hence our server is not able to start properly.
 const aiRoutes = require("./routes/aiRoutes");
 console.log("RUNNING CORRECT SERVER FILE");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// ✅ CORS (SAFE VERSION - works everywhere)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://final-project-3-qemw.onrender.com"
    ],
    credentials: true,
  })
);
app.options("*", cors());

// ROUTES
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use("/api/ai", aiRoutes);


// ✅ MIDDLEWARE
app.use(express.json());

// ✅ TEST ROUTE
app.get("/ping", (req, res) => {
  res.send("pong");
});

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// ✅ PROTECTED TEST ROUTE
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "Protected route working",
    user: req.user
  });
});

// ✅ DATABASE CONNECTION (WITH ERROR HANDLING)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected ✅");
  })
  .catch((err) => {
    console.error("DB ERROR ❌", err);
    process.exit(1); // stops app if DB fails
  });

// ✅ PORT FIX FOR RENDER
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});