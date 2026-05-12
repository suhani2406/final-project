import { FileText, Brain, CircleHelp } from "lucide-react";

export default function AIAssistant({ setActivePage }) {
  const tools = [
    {
      icon: <FileText />,
      title: "PDF Summary",
      desc: "Summarize up to 200 pages",
    },
    {
      icon: <Brain />,
      title: "Flashcards",
      desc: "Generate flashcards",
    },
    {
      icon: <CircleHelp />,
      title: "Quizzes",
      desc: "Generate 20 MCQs & analyze",
    },
  ];

  return (
    <div className="glass-card p-7">
      <h2 className="section-title">AI Assistant ✨</h2>
      <p className="text-sm opacity-70 mt-1">Your smart study companion</p>

      <div className="space-y-4 mt-6">
        {tools.map((tool, index) => (
          <button
            key={index}
            onClick={() => setActivePage("ai")}
            className="w-full bg-white/70 rounded-2xl p-4 flex items-center gap-4 text-left hover:scale-[1.02] transition"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              {tool.icon}
            </div>

            <div>
              <h3 className="font-black">{tool.title}</h3>
              <p className="text-sm opacity-70">{tool.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}