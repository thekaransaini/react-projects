import styles from "./City.module.css";
import { NavLink } from "react-router-dom";

export default function City({ city }) {
  const { cityName, country, countryCode, id, lat, lng } = city;

  return (
    <li className={styles.city}>
      <NavLink
        className={styles.cityLink}
        to={`cities/${id}?lat=${lat}&lng=${lng}`}
      >
        <div>
          <span>
            <strong>{cityName}</strong>, {country}
          </span>
          <img
            src={`https://flagcdn.com/16x12/${countryCode?.toLowerCase()}.png`}
            alt={`Image of ${country} flag`}
          />
        </div>
      </NavLink>
    </li>
  );
}
