import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import gsap from "gsap";
import "./index.css";
import App from "./App.jsx";
import { prefersReducedMotion } from "./lib/motion";

// "reduce motion" visitors: play timed animations ~instantly
if (prefersReducedMotion()) gsap.globalTimeline.timeScale(50);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);