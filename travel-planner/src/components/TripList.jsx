import TripItem from "./TripItem";
import styles from "./TripList.module.css";

export default function TripList() {
  return (
    <div className={styles.tripList}>
      <TripItem />
    </div>
  );
}
