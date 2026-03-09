import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <span class="material-symbols-outlined">travel_luggage_and_bags</span>
      <p>Travel Planner</p>
    </div>
  );
}
