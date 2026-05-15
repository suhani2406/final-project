import API from "../api/axios";
import { useState } from "react";

export default function AIPdfTool() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const generateFromText = async () => {
    if (!text.trim()) {
      alert("Paste some study text first");
      return;
    }

    if (text.length > 12000) {
      alert("Text too large. Please paste smaller notes.");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await API.post("/study-ai/text-summary", {
        text,
      });

      setResult(res.data.result || "No result received.");
    } catch (err) {
      console.log("AI ERROR FULL:", err.response?.data || err);

      alert("AI daily limit reached. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-black mb-3">AI Study Assistant ✨</h1>

      <p className="opacity-70 mb-6">
        Paste text from your PDF/notes and generate summary, flashcards, quiz
        questions, and weak areas.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your PDF text or notes here..."
        className="w-full min-h-[240px] rounded-3xl bg-white/70 p-5 outline-none leading-7"
      />

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <button onClick={generateFromText} className="main-btn">
          {loading ? "Generating..." : "📄 Generate Summary"}
        </button>

        <button onClick={generateFromText} className="secondary-btn">
          {loading ? "Generating..." : "🧠 Create Flashcards"}
        </button>

        <button onClick={generateFromText} className="secondary-btn">
          {loading ? "Generating..." : "❓ Generate Quiz"}
        </button>
      </div>

      {result && (
        <div className="mt-8 bg-white/70 rounded-3xl p-6 whitespace-pre-wrap max-h-[600px] overflow-y-auto leading-7">
          {result}
        </div>
      )}
    </div>
  );
}