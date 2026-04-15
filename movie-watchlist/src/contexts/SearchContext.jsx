import { createContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
