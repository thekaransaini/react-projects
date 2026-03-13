import styles from "./CityList.module.css";
import City from "./City";
import useTrip from "../hooks/useTrip";

export default function CityList() {
  const { cities } = useTrip();

  return (
    <section className={styles.tripSection}>
      <h2>Cities</h2>
      <ul className={styles.cityList}>
        {cities.map((city) => (
          <City city={city} key={city.id} />
        ))}
      </ul>
    </section>
  );
}
