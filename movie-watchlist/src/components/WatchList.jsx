import { useMovies } from "../hooks/useMovies";
import WatchedMovieItem from "./WatchedMovieItem";

export default function WatchList() {
  const { watched } = useMovies();
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem movie={movie} />
      ))}
    </ul>
  );
}
