import styles from "./SearchBar.module.css";
import { useKeyDown } from "../useKeyDown";
import { useRef } from "react";
import { useSearch } from "../useSearch";

export default function SearchBar() {
  const { query, setQuery } = useSearch();
  const inputEl = useRef(null);

  useKeyDown("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className={styles.searchBar}
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
