import { useMovies } from "../hooks/useMovies";
import MovieItem from "./MovieItem";

export default function MovieList() {
  const { movies } = useMovies();

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieItem movie={movie} />
      ))}
    </ul>
  );
}
