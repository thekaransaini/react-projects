import styles from "./CityList.module.css";

export default function CityList() {
  return (
    <section class={styles.tripSection}>
      <h2>Cities</h2>
      <ul>
        <li>
          <span>
            <strong>Kathmandu</strong>, Nepal <span>🏳️‍🌈</span>
          </span>
          <button className={styles.deleteBtn}>&times;</button>
        </li>
        <li>
          <span>
            <strong>Kathmandu</strong>, Nepal <span>🏳️‍🌈</span>
          </span>
          <button className={styles.deleteBtn}>&times;</button>
        </li>
        <li>
          <span>
            <strong>Kathmandu</strong>, Nepal <span>🏳️‍🌈</span>
          </span>
          <button className={styles.deleteBtn}>&times;</button>
        </li>
        <li>
          <span>
            <strong>Kathmandu</strong>, Nepal <span>🏳️‍🌈</span>
          </span>
          <button className={styles.deleteBtn}>&times;</button>
        </li>
        <li>
          <span>
            <strong>Kathmandu</strong>, Nepal <span>🏳️‍🌈</span>
          </span>
          <button className={styles.deleteBtn}>&times;</button>
        </li>
        <li>
          <span>
            <strong>Kathmandu</strong>, Nepal <span>🏳️‍🌈</span>
          </span>
          <button className={styles.deleteBtn}>&times;</button>
        </li>
      </ul>
    </section>
  );
}
