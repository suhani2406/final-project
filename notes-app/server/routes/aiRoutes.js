// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const pdfParse = require("pdf-parse");
// const axios = require("axios");

// const upload = multer({ storage: multer.memoryStorage() });

// async function extractText(file) {
//   const data = await pdfParse(file.buffer);
//   return data.text.slice(0, 30000);
// }

// async function askGemini(prompt) {
//   const res = await axios.post(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     { contents: [{ parts: [{ text: prompt }] }] }
//   );

//   return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
// }

// router.post("/summarize", upload.single("pdf"), async (req, res) => {
//   try {
//     const text = await extractText(req.file);
//     const result = await askGemini(`Summarize this PDF:\n\n${text}`);
//     res.json({ result });
//   } catch (err) {
//     console.log("AI SUMMARY ERROR:", err.response?.data || err.message);
//     res.status(500).json({ message: "Summary failed" });
//   }
// });

// router.post("/flashcards", upload.single("pdf"), async (req, res) => {
//   try {
//     const text = await extractText(req.file);
//     const result = await askGemini(`Create 20 flashcards from this PDF:\n\n${text}`);
//     res.json({ result });
//   } catch (err) {
//     console.log("AI FLASHCARD ERROR:", err.response?.data || err.message);
//     res.status(500).json({ message: "Flashcards failed" });
//   }
// });

// router.post("/quiz", upload.single("pdf"), async (req, res) => {
//   try {
//     const text = await extractText(req.file);
//     const result = await askGemini(`Create 20 MCQ quiz questions with answers and weak areas from this PDF:\n\n${text}`);
//     res.json({ result });
//   } catch (err) {
//     console.log("AI QUIZ ERROR:", err.response?.data || err.message);
//     res.status(500).json({ message: "Quiz failed" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Study AI route working ✅",
  });
});

module.exports = router;