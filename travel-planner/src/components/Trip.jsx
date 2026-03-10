import CityList from "./CityList";
import styles from "./Trip.module.css";
import { Link } from "react-router-dom";
// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

export default function Trip() {
  return (
    <div class={styles.trip}>
      <header class={styles.tripHeader}>
        <h1>Asia Trip</h1>
        <p class={styles.tripDates}>
          <span>📅</span> Oct 1, 2027 – Oct 3, 2027
        </p>
        <p class={styles.tripCurrency}>
          <span>💸</span> Expense: 10000 INR
        </p>
      </header>
      <CityList />
      <footer className={styles.tripFooter}>
        <Link className={styles.link}>Track Expense</Link>
        <Link className={styles.link}>Journal</Link>
      </footer>
    </div>
  );
}
