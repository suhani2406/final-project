console.log("RUNNING CORRECT SERVER FILE");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const aiRoutes = require("./routes/aiRoutes");

const authMiddleware = require("./middleware/authMiddleware");

const app = express();


// CORS

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://final-project-weld-theta.vercel.app"
    ],
    credentials: true,
  })
);


// MIDDLEWARE

app.use(express.json());


// TEST ROUTE

app.get("/ping", (req, res) => {
  res.send("pong");
});


// ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/notes", noteRoutes);

app.use("/api/ai", aiRoutes);


// PROTECTED TEST

app.get(
  "/api/protected",
  authMiddleware,
  (req, res) => {

    res.json({
      msg: "Protected route working",
      user: req.user,
    });
  }
);


// DB

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected ✅");
  })
  .catch((err) => {
    console.log(err);
  });


// PORT

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});