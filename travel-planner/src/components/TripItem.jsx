import styles from "./TripItem.module.css";
import { Link } from "react-router-dom";

export default function TripItem({ trip }) {
  const { tripName, startDate, id } = trip;

  return (
    <Link to={`${id}`} className={styles.tripItem}>
      <h3 className={styles.name}>{tripName}</h3>
      <time className={styles.date}>{`(${startDate})`}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  );
}
