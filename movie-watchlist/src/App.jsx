import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useMovieDetails } from "./useMovieDetails";
import { useLocalStorage } from "./useLocalStorage";
import { useKeyDown } from "./useKeyDown";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ResultsCount from "./components/ResultsCount";
import Main from "./components/Main";
import Container from "./components/Container";
import MovieList from "./components/MovieList";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { isLoading, error, movies } = useMovies(query);
  const [watched, setWatched] = useLocalStorage([], "watched");

  function handleSelectedId(id) {
    setSelectedId((currId) => (currId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(watchedMovie) {
    setWatched([...watched, watchedMovie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <ResultsCount movies={movies} query={query} />
      </NavBar>
      <Main>
        <Container>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectId={handleSelectedId} />
          )}
        </Container>
        <Container>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleAddWatchedMovie}
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Container>
      </Main>
    </>
  );
}

function MovieDetails({
  watched,
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
}) {
  const [userRating, setUserRating] = useState("");
  const [ratingChangeCount, setRatingChangeCount] = useState(0);
  const { isLoading, error, movie } = useMovieDetails(selectedId);

  const isWatchedMovie = watched.some((movie) => movie.imdbID === selectedId);
  const watchedMovieUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  const {
    Title: title,
    Runtime: runtime,
    Released: released,
    Genre: genre,
    imdbRating,
    Actors: actors,
    Director: director,
    Poster: poster,
    Plot: plot,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      title,
      poster,
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      runtime: runtime === "N/A" ? 0 : Number(runtime.split(" ").at(0)),
      userRating,
      ratingChangeCount,
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      document.title = `Movie | ${title}`;

      return () => {
        document.title = "movie-watchlist";
      };
    },
    [title],
  );

  useKeyDown("Escape", onCloseMovie);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {isWatchedMovie ? (
            `You rated this movie with ${watchedMovieUserRating} ⭐`
          ) : (
            <>
              <StarRating
                maxRating={10}
                size={24}
                defaultRating={3}
                onSetRating={setUserRating}
                onRatingChangeCount={setRatingChangeCount}
              />
              <button className="btn-add" onClick={handleAdd}>
                + Add to list
              </button>
            </>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

function WatchedMovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatchedMovie }) {
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
