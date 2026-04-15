import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoviesProvider } from "./contexts/MoviesContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </StrictMode>,
);
