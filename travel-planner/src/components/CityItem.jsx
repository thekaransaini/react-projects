import styles from "./CityItem.module.css";

export default function CityItem({ city }) {
  const { cityName, country, countryCode } = city;
  return (
    <li className={styles.city}>
      <div>
        <span>
          <p>
            <strong>{cityName}</strong>, {country}
          </p>
        </span>
        <img
          src={`https://flagcdn.com/16x12/${countryCode?.toLowerCase()}.png`}
          alt={`Image of ${country} flag`}
        />
      </div>
      <button className={styles.deleteBtn} onClick={(e) => e.preventDefault()}>
        &times;
      </button>
    </li>
  );
}
