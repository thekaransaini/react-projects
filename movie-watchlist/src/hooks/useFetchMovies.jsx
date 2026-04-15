import { useState, useEffect } from "react";

const KEY = import.meta.env.VITE_OMDB_API_KEY;

export function useFetchMovies(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          if (query.length <= 3) {
            setError("");
            setIsLoading(false);
            setMovies([]);
            return;
          }
          setIsLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal },
          );

          if (!res.ok) throw new Error("Failed to load movies!");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found!");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();

      return () => {
        controller.abort();
      };
    },
    [query],
  );
  return { isLoading, error, movies };
}
