import { useState } from "react";
import styles from "./CitySearch.module.css";

export default function CitySearch() {
  const [query, setQuery] = useState("");
  return (
    <div className={styles.citySearch}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="🔍 Search city..."
      />
    </div>
  );
}
