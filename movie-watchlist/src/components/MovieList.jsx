import { useMovies } from "../hooks/useMovies";
import MovieItem from "./MovieItem";

export default function MovieList({ className }) {
  const { movies } = useMovies();

  return (
    <ul className={`list ${className}`}>
      {movies?.map((movie) => (
        <MovieItem movie={movie} />
      ))}
    </ul>
  );
}
