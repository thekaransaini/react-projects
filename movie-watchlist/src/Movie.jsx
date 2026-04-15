export default function Movie({ movie, onSelectId }) {
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
