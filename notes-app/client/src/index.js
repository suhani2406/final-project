import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { TimerProvider } from "./context/TimerContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </ThemeProvider>
  </BrowserRouter>
);