import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Container from "./components/Container";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedMovieSummary from "./components/WatchedMovieSummary";
import WatchList from "./components/WatchList";
import { useMovies } from "./hooks/useMovies";

export default function App() {
  const { isLoading, error, selectedId, isWatchListOpen } = useMovies();
  const isMobile = window.innerWidth < 800;

  return (
    <>
      <NavBar />
      <Main>
        <Container>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList className="hideOnMobile" />}
          {!isWatchListOpen && !isLoading && !error && !selectedId && (
            <MovieList className="hideOnDesktop" />
          )}
          {!isWatchListOpen && selectedId && isMobile && (
            <MovieDetails className="hideOnDesktop" />
          )}
          {isWatchListOpen && (
            <>
              <WatchedMovieSummary />
              <WatchList />
            </>
          )}
        </Container>
        <Container className="hideOnMobile">
          {selectedId ? (
            <MovieDetails />
          ) : (
            <>
              <WatchedMovieSummary />
              <WatchList />
            </>
          )}
        </Container>
      </Main>
    </>
  );
}
