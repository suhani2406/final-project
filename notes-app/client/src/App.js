// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Login from "./pages/Login";
// // import Notes from "./pages/Notes";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Login />} />
// //         <Route path="/notes" element={<Notes />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// import "./styles/layout.css";

// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import Editor from "./components/Editor";
// import RightPanel from "./components/RightPanel";

// function App() {
//   return (
//     <div className="app">
//       <Sidebar />

//       <div className="main">
//         <Header />

//         <div className="content">
//           <Editor />
//           <RightPanel />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;