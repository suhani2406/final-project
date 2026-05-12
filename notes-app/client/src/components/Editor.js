// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function Editor() {
//   const [notes, setNotes] = useState([]);
//   const [text, setText] = useState("");

// //   useEffect(() => {
// //     fetchNotes();
// //   }, []);

//   const fetchNotes = async () => {
//     // const res = await API.get("/notes");
//     // setNotes(res.data);
//   };

//   const createNote = async () => {
//     await API.post("/notes", {
//       title: "New Note",
//       content: text,
//     });

//     setText("");
//     fetchNotes();
//   };

//   return (
//     <div className="editor">
//       <h2>Notes</h2>

//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Write something..."
//         style={{ width: "100%", height: "100px" }}
//       />

//       <button onClick={createNote}>Save</button>

//       {notes.map((note) => (
//         <div key={note._id}>
//           <h4>{note.title}</h4>
//           <p>{note.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
export default function Editor() {
  return (
    <div
      className="
      flex-1
      bg-white/28
bg-[#1e293b]
      rounded-[40px]
      border border-white/20
      shadow-[0_8px_40px_rgba(0,0,0,0.12)]
      p-10
      relative
      overflow-hidden
    "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10">
        <h1 className="text-6xl font-bold text-[#34231d] leading-tight">
          Today’s Focus ✨
        </h1>

        <p className="text-[#6f5c55] mt-5 text-lg leading-8 max-w-3xl">
          Build something beautiful today. Every small effort
          compounds into something extraordinary over time.
        </p>

        <div className="mt-14 space-y-8">
          <div className="bg-white/20 rounded-[30px] p-6 bg-[#1e293b] border border-white/10">
            <h2 className="text-2xl font-semibold text-[#3f2b24] mb-4">
              Goals
            </h2>

            <div className="space-y-3 text-[#5b4b45] text-lg">
              <p>☑ Finish dashboard UI</p>
              <p>☑ Add anime aesthetic</p>
              <p>☐ Add sakura animations</p>
            </div>
          </div>

          <div className="bg-white/20 rounded-[30px] p-6bg-[#1e293b] border border-white/10">
            <h2 className="text-2xl font-semibold text-[#3f2b24] mb-4">
              Thoughts
            </h2>

            <p className="text-[#5f514b] leading-9 text-lg">
              Consistency creates elegance. Keep showing up,
              even when progress feels slow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}