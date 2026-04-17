import { useMovies } from "../hooks/useMovies";
import Container from "./Container";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import WatchedMovieSummary from "./WatchedMovieSummary";
import WatchList from "./WatchList";

export default function MobileLayout() {
  const { isLoading, error, selectedId, isWatchListOpen } = useMovies();

  return (
    <Container>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isWatchListOpen && !selectedId && <MovieList />}
      {!isWatchListOpen && selectedId && <MovieDetails />}
      {isWatchListOpen && (
        <>
          <WatchedMovieSummary />
          <WatchList />
        </>
      )}
    </Container>
  );
}
