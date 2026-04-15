import { createContext } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  return <SearchContext.Provider>{children}</SearchContext.Provider>;
}

export { SearchContext, SearchProvider };
