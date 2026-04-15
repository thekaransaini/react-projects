import { useMovies } from "../useMovies";

export default function WatchedMovieItem({ movie }) {
  const { onDeleteWatchedMovie } = useMovies();
  const { imdbID, poster, title, imdbRating, userRating, runtime } = movie;

  return (
    <li key={imdbID}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
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
        <button
          className="btn-delete"
          onClick={() => onDeleteWatchedMovie(imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
