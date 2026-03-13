import { useEffect } from "react";
import CityList from "./CityList";
import useTrip from "../hooks/useTrip";
import styles from "./Trip.module.css";
import { Link, useParams } from "react-router-dom";
// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

export default function Trip() {
  const { id } = useParams();
  const { trip, getCurrentTrip } = useTrip();
  const { tripName, startDate, endDate } = trip;

  useEffect(() => {
    getCurrentTrip(id);
  }, [id]);

  return (
    <div className={styles.trip}>
      <header className={styles.tripHeader}>
        <h1>{tripName}</h1>
        <p className={styles.tripDates}>
          <span>📅</span> {startDate} – {endDate}
        </p>
        <p className={styles.tripCurrency}>
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
