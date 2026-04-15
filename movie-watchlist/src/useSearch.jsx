import { useContext } from "react";
import { SearchContext } from "./contexts/SearchContext";

export function useMovies() {
  const context = useContext(SearchContext);

  if (context === undefined)
    throw new Error("SearchContext is used outside the SearchProvider");
  return context;
}
