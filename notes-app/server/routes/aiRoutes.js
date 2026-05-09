const express = require("express");
const router = express.Router();

const multer = require("multer");
const pdfParse = require("pdf-parse");
const axios = require("axios");

const upload = multer();

router.post("/summarize", upload.single("pdf"), async (req, res) => {
  try {
    // ✅ 1. CHECK FILE
    if (!req.file) {
      return res.status(400).json({
        error: "No PDF uploaded",
      });
    }

    // ✅ 2. PARSE PDF
    const data = await pdfParse(req.file.buffer);

    // ✅ 3. LIMIT TEXT (VERY IMPORTANT)
    const pdfText = data.text.slice(0, 12000);

    // ✅ 4. PROMPT
    const prompt = `
Summarize this PDF in simple notes.

Also create:
1. Important flashcards
2. 10 quiz questions

PDF Content:
${pdfText}
`;

    // ✅ 5. CALL GEMINI (FIXED KEY USAGE)
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ 6. SAFE RESPONSE
    const result =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No AI response generated.";

    res.json({ result });

  } catch (err) {
  console.log("FULL ERROR:");
  console.log(err); // 🔥 THIS IS KEY

  if (err.response) {
    console.log("RESPONSE DATA:", err.response.data);
  }

  res.status(500).json({
    error: "AI generation failed",
  });
}
});

module.exports = router;