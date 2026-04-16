import styles from "./WatchedMovieItem.module.css";
import { useMovies } from "../hooks/useMovies";
import Button from "./Button";

export default function WatchedMovieItem({ movie }) {
  const { onDeleteWatchedMovie } = useMovies();
  const { imdbID, poster, title, imdbRating, userRating, runtime } = movie;

  return (
    <li key={imdbID} className={styles.WatchedMovieItem}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <Button
        className="btnDelete"
        onClick={() => onDeleteWatchedMovie(imdbID)}
      >
        X
      </Button>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime === 0 ? "N/A" : `${runtime} min`}</span>
        </p>
      </div>
    </li>
  );
}
