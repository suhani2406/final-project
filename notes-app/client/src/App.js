import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Notes from "./pages/Notes";

// 🔒 Protected Route
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Protected Notes Page */}
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <Notes />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;