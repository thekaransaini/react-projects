import { useMovies } from "../hooks/useMovies";

export default function MovieItem({ movie }) {
  const { onSelectId } = useMovies();
  const { imdbID, Poster: poster, Title: title, Year: year } = movie;

  return (
    <li key={imdbID} onClick={() => onSelectId(imdbID)}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{year}</span>
        </p>
      </div>
    </li>
  );
}
