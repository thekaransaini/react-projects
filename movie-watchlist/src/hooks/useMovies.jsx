import { useContext } from "react";
import { MoviesContext } from "../contexts/MoviesContext";

function useMovies() {
  const context = useContext(MoviesContext);

  if (context === undefined)
    throw new Error("MoviesContext is used outside the MoviesProvider");
  return context;
}

export { useMovies };
