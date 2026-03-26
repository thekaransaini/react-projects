import styles from "./CityItem.module.css";

export default function CityItem({ city, onDeleteCity }) {
  const { cityName, country, countryCode, id } = city;

  return (
    <li className={styles.city}>
      <div>
        <span>
          <p>
            <strong>{cityName}</strong>, {country}
          </p>
        </span>
      </div>
      <img
        src={`https://flagcdn.com/16x12/${countryCode?.toLowerCase()}.png`}
        alt={`Image of ${country} flag`}
      />
      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          e.preventDefault();
          onDeleteCity(id);
        }}
      >
        &times;
      </button>
    </li>
  );
}
