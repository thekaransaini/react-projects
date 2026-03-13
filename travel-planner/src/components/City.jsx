import styles from "./City.module.css";

export default function City({ city }) {
  const { cityName, country, countryCode } = city;

  return (
    <li className={styles.city}>
      <div>
        <span>
          <strong>{cityName}</strong>, {country}
        </span>
        <img
          src={`https://flagcdn.com/16x12/${countryCode?.toLowerCase()}.png`}
          alt={`Image of ${country} flag`}
        />
      </div>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}
