const express = require("express");
const router = express.Router();
const axios = require("axios");

const askAI = async (prompt) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY missing on server");
  }

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return (
    response.data?.choices?.[0]?.message?.content ||
    "No AI response generated."
  );
};

router.get("/test", (req, res) => {
  res.json({
    message: "Study AI route working ✅",
    hasOpenRouterKey: Boolean(
      process.env.OPENROUTER_API_KEY
    ),
  });
});

router.get("/stats", async (req, res) => {
  try {
    const User = require("../models/User");

    const totalUsers =
      await User.countDocuments();

    const activeUsers =
      await User.countDocuments({
        lastLogin: {
          $gte: new Date(
            Date.now() -
              7 * 24 * 60 * 60 * 1000
          ),
        },
      });

    res.json({
      totalUsers,
      activeUsers,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Stats failed",
    });
  }
});

router.post(
  "/text-summary",
  async (req, res) => {
    try {
      const { text } = req.body;

      if (!text || !text.trim()) {
        return res.status(400).json({
          message: "No text provided",
        });
      }

      const safeText =
        text.slice(0, 3000);

      const result = await askAI(`
You are an AI study assistant.

Generate:
1. Short summary
2. Key points
3. 10 flashcards in Q/A format
4. 10 quiz questions with answers
5. Weak areas to revise

TEXT:
${safeText}
`);

      return res.json({
        result,
      });

    } catch (err) {
      console.log(
        "TEXT AI ERROR:",
        err.response?.data ||
        err.message
      );

      return res.status(200).json({
        result: `
Summary:
The AI model is temporarily busy, but your text was received.

Quick Notes:
${req.body.text.slice(0,500)}

What to revise:
• Main definition
• Important terms
• Examples
• Working/process
• Short answer practice

Try again after a few seconds for the full AI-generated summary.
`,
      });
    }
  }
);

module.exports = router;