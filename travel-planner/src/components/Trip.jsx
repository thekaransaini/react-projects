import { useEffect } from "react";
import CityList from "./CityList";
import useTrip from "../hooks/useTrip";
import styles from "./Trip.module.css";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import ErrorMsg from "./ErrorMsg";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function Trip() {
  const { tripId } = useParams();
  const { trip, getCurrentTrip, isLoading, error } = useTrip();

  useEffect(() => {
    getCurrentTrip(tripId);
  }, [tripId]);

  if (isLoading) return <Loader />;
  if (!trip) return <ErrorMsg message={error} />;
  const { tripName, startDate, endDate } = trip;

  return (
    <div className={styles.trip}>
      <header className={styles.tripHeader}>
        <h1>{tripName}</h1>
        <p className={styles.tripDates}>
          <span>📅</span> {formatDate(startDate)} – {formatDate(endDate)}
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
