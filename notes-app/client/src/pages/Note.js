// import React, { useEffect, useState } from "react";
// import API from "../api/axios";

// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid
// } from "@mui/material";

// const Notes = () => {
//   const [notes, setNotes] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const fetchNotes = async () => {
//     try {
//       // const res = await API.get("/notes");
//       // setNotes(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const addNote = async () => {
//     if (!title || !content) return;

//     try {
//       await API.post("/notes", { title, content });

//       setTitle("");
//       setContent("");
//       fetchNotes();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteNote = async (id) => {
//     try {
//       await API.delete(`/notes/${id}`);
//       fetchNotes();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // useEffect(() => {
//   //   fetchNotes();
//   // }, []);

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         minHeight: "100vh",
//         background: "linear-gradient(to bottom right, #f8f5f0, #efe7dc)",
//         fontFamily: "Inter"
//       }}
//     >
//       {/* 🌸 SIDEBAR */}
//       <Box
//         sx={{
//           width: "240px",
//           background: "#fffaf5",
//           padding: "30px",
//           borderRight: "1px solid #ece7df",
//           display: "flex",
//           flexDirection: "column",
//           gap: "25px"
//         }}
//       >
//         <Box
//   sx={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "30px"
//   }}
// >
//   <Typography
//     variant="h4"
//     sx={{
//       fontWeight: "800",
//       color: "#2f2f2f"
//     }}
//   >
//     My Creative Space ✨
//   </Typography>

//   <Paper
//     elevation={0}
//     sx={{
//       padding: "10px 18px",
//       borderRadius: "16px",
//       background: "rgba(255,255,255,0.5)",
//       backdropFilter: "blur(12px)"
//     }}
//   >
//     🌿 Focus Mode
//   </Paper>
// </Box>

//         <Box>
//           <Typography sx={menuStyle}>🏠 Dashboard</Typography>
//           <Typography sx={menuStyle}>📝 Notes</Typography>
//           <Typography sx={menuStyle}>📁 Folders</Typography>
//           <Typography sx={menuStyle}>⭐ Favorites</Typography>
//         </Box>

//         <Paper
//           elevation={0}
//           sx={{
//             background: "#f7efe7",
//             padding: "18px",
//             borderRadius: "18px",
//             marginTop: "auto"
//           }}
//         >
//           <Typography fontWeight="600">
//             Daily Inspiration ✨
//           </Typography>

//           <Typography
//             sx={{
//               fontSize: "14px",
//               marginTop: "10px",
//               color: "#666"
//             }}
//           >
//             "Small progress is still progress."
//           </Typography>
//         </Paper>
//       </Box>

//       {/* 🌸 MAIN CONTENT */}
//       <Box
//         sx={{
//           flex: 1,
//           padding: "40px",
//           overflowY: "auto"
//         }}
//       >
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: "700",
//             color: "#2f2f2f",
//             marginBottom: "30px"
//           }}
//         >
//           My Creative Space ✨
//         </Typography>

//         {/* NOTE CREATOR */}
//         <Paper
//           elevation={0}
//           sx={{
//             padding: "30px",
//             borderRadius: "28px",
//             background: "#fffaf5",
//             marginBottom: "35px",
//             boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
//           }}
//         >
//           <TextField
//             fullWidth
//             placeholder="Note title..."
//             variant="outlined"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             sx={{
//               marginBottom: "20px",
//               background: "white",
//               borderRadius: "14px"
//             }}
//           />

//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             placeholder="Write your thoughts..."
//             variant="outlined"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             sx={{
//               marginBottom: "20px",
//               background: "white",
//               borderRadius: "14px"
//             }}
//           />

//           <Button
//             variant="contained"
//             onClick={addNote}
//             sx={{
//               background: "#d97757",
//               padding: "12px 24px",
//               borderRadius: "14px",
//               textTransform: "none",
//               fontWeight: "600",
//               fontSize: "15px"
//             }}
//           >
//             Save Note
//           </Button>
//         </Paper>

//         {/* NOTES GRID */}
//         <Grid container spacing={3}>
//           {notes.map((note) => (
//             <Grid item xs={12} md={6} lg={4} key={note._id}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   padding: "24px",
//                   borderRadius: "24px",
//                   background: "#fffaf5",
//                   minHeight: "220px",
//                   boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "translateY(-5px)"
//                   }
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: "700",
//                     marginBottom: "12px",
//                     color: "#2f2f2f"
//                   }}
//                 >
//                   {note.title}
//                 </Typography>

//                 <Typography
//                   sx={{
//                     color: "#666",
//                     lineHeight: "1.7",
//                     marginBottom: "20px"
//                   }}
//                 >
//                   {note.content}
//                 </Typography>

//                 <Button
//                   onClick={() => deleteNote(note._id)}
//                   sx={{
//                     color: "#d97757",
//                     textTransform: "none",
//                     fontWeight: "600"
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>

//       {/* 🌸 RIGHT PANEL */}
//       <Box
//         sx={{
//           width: "260px",
//           padding: "30px",
//           background: "#fffaf5",
//           borderLeft: "1px solid #ece7df"
//         }}
//       >
//         <Typography
//           variant="h6"
//           sx={{
//             marginBottom: "20px",
//             fontWeight: "700"
//           }}
//         >
//           Focus Mode 🌿
//         </Typography>

//         <Paper
//           elevation={0}
//           sx={{
//             padding: "20px",
//             borderRadius: "20px",
//             background: "#f7efe7",
//             marginBottom: "20px"
//           }}
//         >
//           <Typography fontWeight="600">
//             Today's Goal
//           </Typography>

//           <Typography
//             sx={{
//               marginTop: "10px",
//               color: "#666",
//               fontSize: "14px"
//             }}
//           >
//             Finish your full stack project UI ✨
//           </Typography>
//         </Paper>

//         <Paper
//           elevation={0}
//           sx={{
//             padding: "20px",
//             borderRadius: "20px",
//             background: "#f7efe7"
//           }}
//         >
//           <Typography fontWeight="600">
//             Mood Board 🎨
//           </Typography>

//           <Typography
//             sx={{
//               marginTop: "10px",
//               color: "#666",
//               fontSize: "14px"
//             }}
//           >
//             Warm tones, calm productivity, soft design.
//           </Typography>
//         </Paper>
//       </Box>
//     </Box>
//   );
// };

// const menuStyle = {
//   padding: "12px 18px",
//   borderRadius: "14px",
//   cursor: "pointer",
//   fontWeight: "500",
//   color: "#444",
//   transition: "0.3s",
//   "&:hover": {
//     background: "#f7efe7"
//   }
// };

// export default Notes;
export default function Notes() {
  return <div>Notes</div>;
}