// import { useEffect, useState } from "react";
// import ProgressChart from "../components/ProgressChart";
// import StreakCalendar from "../components/StreakCalendar";

// export default function ProgressPage() {
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const progressKey = `progress_${user.id || "guest"}`;
//   const scoreKey = `quizScores_${user.id || "guest"}`;

//   const defaultProgress = {
//     quizzes: 4,
//     averageScore: 78,
//     studyHours: 12,
//     weakAreas: ["Thermodynamics", "Organic Chemistry", "Integration"],
//   };

//   const [progress, setProgress] = useState(
//     JSON.parse(localStorage.getItem(progressKey)) || defaultProgress
//   );

//   const addDemoQuiz = () => {
//     const newScore = Math.floor(Math.random() * 30) + 70;

//     const scores =
//       JSON.parse(localStorage.getItem(scoreKey)) || [
//         { day: "Mon", score: 55 },
//         { day: "Tue", score: 68 },
//         { day: "Wed", score: 62 },
//         { day: "Thu", score: 76 },
//         { day: "Fri", score: 74 },
//         { day: "Sat", score: 88 },
//         { day: "Sun", score: 92 },
//       ];

//     const updatedScores = [
//       ...scores.slice(1),
//       {
//         day: "New",
//         score: newScore,
//       },
//     ];

//     localStorage.setItem(scoreKey, JSON.stringify(updatedScores));

//     const updatedProgress = {
//       ...progress,
//       quizzes: progress.quizzes + 1,
//       averageScore: Math.round(
//         (progress.averageScore * progress.quizzes + newScore) /
//           (progress.quizzes + 1)
//       ),
//       studyHours: progress.studyHours + 1,
//     };

//     setProgress(updatedProgress);
//     localStorage.setItem(progressKey, JSON.stringify(updatedProgress));

//     window.location.reload();
//   };

//   useEffect(() => {
//     localStorage.setItem(progressKey, JSON.stringify(progress));
//   }, [progress]);

//   return (
//     <div className="space-y-6">
//       <div className="bg-[#1e293b] border border-white/10 rounded-[35px] p-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-5xl font-black text-white mb-3">
//             Progress Analytics 📊
//           </h1>
//           <p className="text-white/70">
//             Track quiz scores, streaks, study hours and weak topics.
//           </p>
//         </div>

//         <button onClick={addDemoQuiz} className="main-btn">
//           + Add Quiz Result
//         </button>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="bg-[#1e293b] border border-white/10 rounded-[35px] p-6 text-white">
//           <h2 className="text-xl font-bold">Quizzes</h2>
//           <p className="text-5xl font-black mt-4">{progress.quizzes}</p>
//         </div>

//         <div className="bg-[#1e293b] border border-white/10 rounded-[35px] p-6 text-white">
//           <h2 className="text-xl font-bold">Average Score</h2>
//           <p className="text-5xl font-black mt-4">{progress.averageScore}%</p>
//         </div>

//         <div className="bg-[#1e293b] border border-white/10 rounded-[35px] p-6 text-white">
//           <h2 className="text-xl font-bold">Study Hours</h2>
//           <p className="text-5xl font-black mt-4">{progress.studyHours}h</p>
//         </div>
//       </div>

//       <div className="bg-[#1e293b] border border-white/10 rounded-[35px] p-8">
//         <h2 className="text-3xl font-bold text-white mb-6">
//           Quiz Performance
//         </h2>
//         <ProgressChart />
//       </div>

//       <StreakCalendar />

//       <div className="bg-[#1e293b] border border-white/10 rounded-[35px] p-8">
//         <h2 className="text-3xl font-bold text-white mb-6">
//           Strengths & Weaknesses
//         </h2>

//         <div className="space-y-4 text-white">
//           {progress.weakAreas.map((area, index) => (
//             <div
//               key={index}
//               className="bg-white/10 rounded-2xl p-4 flex justify-between"
//             >
//               <span>{area}</span>
//               <span className="text-red-300">Needs Revision</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function ProgressChart() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user.id || "guest";

  const key = `quizScores_${userId}`;

  const defaultScores = [
    { day: "Mon", score: 0 },
    { day: "Tue", score: 0 },
    { day: "Wed", score: 0 },
    { day: "Thu", score: 0 },
    { day: "Fri", score: 0 },
    { day: "Sat", score: 0 },
    { day: "Sun", score: 0 },
  ];

  const scores =
    JSON.parse(localStorage.getItem(key)) || defaultScores;

  return (
    <div className="w-full">
      <div className="flex items-end gap-4 h-[260px]">
        {scores.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-3">
            <div className="text-white text-sm font-bold">
              {item.score}%
            </div>

            <div className="w-full h-[210px] bg-white/10 rounded-2xl flex items-end overflow-hidden">
              <div
                className="w-full bg-[#d96c52] rounded-2xl"
                style={{
                  height: `${item.score}%`,
                }}
              />
            </div>

            <div className="text-white/70 text-sm">
              {item.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}