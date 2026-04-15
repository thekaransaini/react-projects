export default function MovieList({ movies, onSelectId }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectId={onSelectId} />
      ))}
    </ul>
  );
}
