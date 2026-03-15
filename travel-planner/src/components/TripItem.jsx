import styles from "./TripItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function TripItem({ trip }) {
  const { tripName, startDate, id } = trip;

  return (
    <Link to={`${id}`} className={styles.tripItem}>
      <h3 className={styles.name}>{tripName}</h3>
      <time className={styles.date}>{`(${formatDate(startDate)})`}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  );
}
