import { useMovies } from "../hooks/useMovies";
import { useSearch } from "../hooks/useSearch";
import styles from "./ResultsCount.module.css";

export default function ResultsCount() {
  const { query } = useSearch();
  const { movies } = useMovies();
  return (
    query && (
      <p className={styles.resultsCount}>
        Found <strong>{movies.length}</strong> results
      </p>
    )
  );
}
