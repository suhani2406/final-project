console.log("RUNNING CORRECT SERVER FILE");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Explicit known origins (local dev + your stable/production domain if you have one)
const explicitAllowedOrigins = [
  "http://localhost:3000",
  "https://yumenote-final.vercel.app",
  "https://yumenote-final-k1zoj2yzc-suhani2406s-projects.vercel.app",
  "https://final-project-vxni.vercel.app",
];

// Dynamic check: allow any *.vercel.app domain automatically (covers new preview URLs)
const isOriginAllowed = (origin) => {
  if (!origin) return true; // allow non-browser requests (curl, Postman, server-to-server)
  if (explicitAllowedOrigins.includes(origin)) return true;
  if (/^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin)) return true;
  return false;
};

const corsOptionsDelegate = (req, callback) => {
  const origin = req.header("Origin");
  if (isOriginAllowed(origin)) {
    callback(null, { origin: true, credentials: true });
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// ROUTES
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const studyAiRoutes = require("./routes/studyAiRoutes");
const studyRoomRoutes = require("./routes/studyRoomRoutes");

// MIDDLEWARE
app.use(cors(corsOptionsDelegate));

app.use(express.json());

// TEST ROUTE
app.get("/ping", (req, res) => {
  res.send("pong");
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/study-ai", studyAiRoutes);
app.use("/api/study-rooms", studyRoomRoutes);

// SOCKET.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`Joined room ${roomId}`);
  });

  socket.on("send-message", ({ roomId, message }) => {
    io.to(roomId).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected ✅");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5001;

// SERVER
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});