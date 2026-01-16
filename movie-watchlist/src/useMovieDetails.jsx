import { useState, useEffect } from "react";

export function useMovieDetails(selectedId) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movie, setMovie] = useState({});

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=83540352&i=${selectedId}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Failed to fetch movie details!");

          const data = await res.json();

          if (data.Response === "False")
            throw new Error("Movie details not found!");

          setMovie(data);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovieDetails();

      return () => {
        controller.abort();
      };
    },
    [selectedId]
  );
  return { isLoading, error, movie };
}
