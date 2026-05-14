// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// const askGemini = async (prompt) => {
//   const apiKey = process.env.GEMINI_API_KEY;

//   if (!apiKey) {
//     throw new Error("GEMINI_API_KEY missing");
//   }

//   const response = await axios.post(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
//     {
//       contents: [
//         {
//           parts: [{ text: prompt }],
//         },
//       ],
//     }
//   );

//   return (
//     response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//     "No AI response generated."
//   );
// };

// router.get("/test", (req, res) => {
//   res.json({
//     message: "Study AI route working ✅",
//   });
// });

// router.post("/text-summary", async (req, res) => {
//   try {
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({
//         message: "No text provided",
//       });
//     }

//     const result = await askGemini(`
// You are an AI study assistant.

// From the study text below, generate:

// 1. A clean student-friendly summary
// 2. Important key points
// 3. 10 flashcards in Q/A format
// 4. 10 quiz questions with answers
// 5. Weak areas the student should revise

// STUDY TEXT:
// ${text}
// `);

//     res.json({ result });
//   } catch (err) {
//     console.log("TEXT AI ERROR:", err.response?.data || err.message);

//     res.status(500).json({
//       message: "Text AI failed",
//       error: err.response?.data || err.message,
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");

const askGemini = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing on server");
  }

  const response = await axios.post(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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
  },
  {
    timeout: 25000,
    headers: {
      "Content-Type": "application/json",
    },
  }
);
  return (
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response generated."
  );
};

router.get("/test", (req, res) => {
  res.json({
    message: "Study AI route working ✅",
    hasKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

router.post("/text-summary", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "No text provided",
      });
    }

    const safeText = text.slice(0, 3000);

    const result = await askGemini(`
You are an AI study assistant.

Generate:
1. Short summary
2. Key points
3. 10 flashcards
4. 10 quiz questions with answers
5. Weak areas to revise

TEXT:
${safeText}
`);

    res.json({ result });
  } catch (err) {
    console.log(
      "TEXT AI ERROR:",
      err.response?.data || err.message
    );

    res.status(500).json({
      message: "AI generation failed",
      error: err.response?.data || err.message,
    });
  }
});

module.exports = router;