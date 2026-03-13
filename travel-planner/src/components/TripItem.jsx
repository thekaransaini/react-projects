import styles from "./TripItem.module.css";
import { NavLink } from "react-router-dom";

export default function TripItem({ trip }) {
  const { tripName, startDate, id } = trip;

  return (
    <NavLink
      to={`${id}`}
      className={({ isActive }) =>
        `${styles.tripItem} ${isActive ? styles["tripItem--active"] : ""}`
      }
    >
      <h3 className={styles.name}>{tripName}</h3>
      <time className={styles.date}>{`(${startDate})`}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </NavLink>
  );
}
