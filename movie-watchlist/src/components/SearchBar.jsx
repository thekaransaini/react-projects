import styles from "./SearchBar.module.css";
import { useKeyDown } from "../useKeyDown";
import { useRef } from "react";

export default function SearchBar({ query, setQuery }) {
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
