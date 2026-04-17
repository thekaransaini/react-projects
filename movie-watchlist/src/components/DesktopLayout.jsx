import { useMovies } from "../hooks/useMovies";
import Container from "./Container";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import WatchedMovieSummary from "./WatchedMovieSummary";
import WatchList from "./WatchList";

export default function DesktopLayout() {
  const { isLoading, error, selectedId } = useMovies();

  return (
    <>
      <Container>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && <MovieList />}
      </Container>
      <Container>
        {selectedId ? (
          <MovieDetails />
        ) : (
          <>
            <WatchedMovieSummary />
            <WatchList />
          </>
        )}
      </Container>
    </>
  );
}
