import { useState } from "react";
import { useFetchMovies } from "./useFetchMovies";
import { useLocalStorage } from "./useLocalStorage";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ResultsCount from "./components/ResultsCount";
import Main from "./components/Main";
import Container from "./components/Container";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedMovieSummary from "./components/WatchedMovieSummary";
import WatchList from "./components/WatchList";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { isLoading, error, movies } = useFetchMovies(query);
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
              <WatchList
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
