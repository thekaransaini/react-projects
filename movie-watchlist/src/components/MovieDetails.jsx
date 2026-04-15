import styles from "./MovieDetails.module.css";
import { useEffect, useState } from "react";
import { useMovieDetails } from "../useMovieDetails";
import { useKeyDown } from "../useKeyDown";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useMovies } from "../useMovies";

export default function MovieDetails() {
  const { watched, selectedId, onAddWatchedMovie, onCloseMovie } = useMovies();
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
    <div className={styles.movieDetails}>
      <header>
        <button className={styles.btnBack} onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className={styles.movieDetailsOverview}>
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
        <div className={styles.rating}>
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
              <button className={styles.btnAdd} onClick={handleAdd}>
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
