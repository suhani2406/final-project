 //if issue like this happen like server showing running intermnal but in reality we cant get pong so just change the local host number to 5001 or any other number and then try to ping localhost:5001/ping and you will get pong response. This is because sometimes the port 5000 is already occupied by some other process and hence our server is not able to start properly.
 const cors = require("cors");
 console.log("RUNNING CORRECT SERVER FILE");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const noteRoutes = require("./routes/noteRoutes");


const app = express(); // ✅ FIRST create app
app.use(cors({
  origin: "https://final-project-weld-theta.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use("/api/notes", noteRoutes);

// ✅ DEBUG ROUTE
app.get("/ping", (req, res) => {
  res.send("pong");
});

// ✅ PROTECTED ROUTE (NOW app exists)
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    msg: "You accessed protected route",
    user: req.user
  });
});

// ✅ AUTH ROUTES
app.use("/api/auth", authRoutes);

// DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected ✅"))
  .catch(err => console.log(err));

// SERVER
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});