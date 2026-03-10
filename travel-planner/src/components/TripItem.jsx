import styles from "./TripItem.module.css";
import { NavLink } from "react-router-dom";

export default function TripItem() {
  return (
    <NavLink className={styles.tripItem}>
      <h3 className={styles.name}>Asia Trip</h3>
      <time className={styles.date}>(March 9 2026)</time>
      <button className={styles.deleteBtn}>&times;</button>
    </NavLink>
  );
}
