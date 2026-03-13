import useTrip from "../hooks/useTrip";
import TripItem from "./TripItem";
import styles from "./TripList.module.css";

export default function TripList() {
  const { trips } = useTrip();

  return (
    <div className={styles.tripList}>
      {trips.map((trip) => (
        <TripItem trip={trip} key={trip.id} />
      ))}
    </div>
  );
}
