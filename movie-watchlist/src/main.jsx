import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { MoviesProvider } from "./contexts/MoviesContext";
import { SearchProvider } from "./contexts/SearchContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchProvider>
      <MoviesProvider>
        <App />
      </MoviesProvider>
    </SearchProvider>
  </StrictMode>,
);
