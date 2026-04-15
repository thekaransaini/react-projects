import { createContext } from "react";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  return <MoviesContext.Provider>{children}</MoviesContext.Provider>;
}

export { MoviesContext, MoviesProvider };
