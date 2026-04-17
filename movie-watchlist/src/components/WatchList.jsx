import { useMovies } from "../hooks/useMovies";
import ErrorMessage from "./ErrorMessage";
import WatchedMovieItem from "./WatchedMovieItem";

export default function WatchList() {
  const { watched } = useMovies();
  const hasWatchedMovies = watched.length > 0;

  return hasWatchedMovies ? (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem movie={movie} />
      ))}
    </ul>
  ) : (
    <ErrorMessage message=" No movies added yet. Start searching!" />
  );
}
