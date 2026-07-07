import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />
<Route path="/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/notes"
        element={<Dashboard />}
      />
    </Routes>
  );
}

export default App;