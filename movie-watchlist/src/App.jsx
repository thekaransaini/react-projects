import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Container from "./components/Container";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedMovieSummary from "./components/WatchedMovieSummary";
import WatchList from "./components/WatchList";
import { useMovies } from "./useMovies";

export default function App() {
  const { isLoading, error, selectedId } = useMovies();

  return (
    <>
      <NavBar />
      <Main>
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
      </Main>
    </>
  );
}
