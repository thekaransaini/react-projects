import MovieItem from "./MovieItem";

export default function MovieList({ movies, onSelectId }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieItem movie={movie} onSelectId={onSelectId} />
      ))}
    </ul>
  );
}
