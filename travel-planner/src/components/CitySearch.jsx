import { useEffect, useState } from "react";
import styles from "./CitySearch.module.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.geoapify.com/v1/geocode/search";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function CitySearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    async function fetchCities() {
      try {
        if (query.length <= 3) return;

        const res = await fetch(`${BASE_URL}?text=${query}&apiKey=${API_KEY}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (!data.features[0]?.properties.lat) return;

        navigate(
          `form?lat=${data.features[0].properties.lat}&lng=${data.features[0].properties.lon}`,
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    }
    fetchCities();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div className={styles.citySearch}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="🔍 Search city..."
      />
      <span className={styles.hamburger}>
        <i className="fa-solid fa-bars"></i>
      </span>
    </div>
  );
}
