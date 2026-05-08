const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

router.post(
  "/summarize",
  upload.single("pdf"),
  async (req, res) => {
    try {
      const dataBuffer = fs.readFileSync(req.file.path);

      const pdfData = await pdfParse(dataBuffer);

      const text = pdfData.text;

      const prompt = `
You are an AI study assistant.

From the following PDF text:

${text}

Generate:

1. Short summary
2. 5 flashcards
3. 10 quiz questions with answers
`;

      const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.AIzaSyC9ZrJz3xxqZSfrJQvNS1zEEdi8gNGIHa8}`,
  {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  }
);

      const aiText =
        response.data.candidates[0].content.parts[0].text;

      fs.unlinkSync(req.file.path);

      res.json({
        result: aiText,
      });

   } catch (err) {

  console.log("FULL AI ERROR:");
  console.log(err.response?.data || err);

  res.status(500).json({
    error: "AI processing failed",
  });
}
  }
);

module.exports = router;