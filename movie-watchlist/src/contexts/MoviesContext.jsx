import { createContext, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { useLocalStorage } from "../hooks/useLocalStorage";

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const { query } = useSearch();
  const [selectedId, setSelectedId] = useState("");
  const { isLoading, error, movies } = useFetchMovies(query);
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [isWatchListOpen, setIsWatchListopen] = useState(false);

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

  function toggleWatchList() {
    setIsWatchListopen((curr) => !curr);
  }

  function closedWatchList() {
    setIsWatchListopen(false);
  }

  return (
    <MoviesContext.Provider
      value={{
        isLoading,
        error,
        movies,
        watched,
        selectedId,
        isWatchListOpen,
        toggleWatchList,
        closedWatchList,
        onSelectId: handleSelectedId,
        onAddWatchedMovie: handleAddWatchedMovie,
        onCloseMovie: handleCloseMovie,
        onDeleteWatchedMovie: handleDeleteWatchedMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export { MoviesContext, MoviesProvider };
