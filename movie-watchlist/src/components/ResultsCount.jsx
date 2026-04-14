import styles from "./ResultsCount.module.css";

export default function ResultsCount({ movies, query }) {
  return (
    query && (
      <p className={styles.resultsCount}>
        Found <strong>{movies.length}</strong> results
      </p>
    )
  );
}
