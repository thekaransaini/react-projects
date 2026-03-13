import useTrip from "../hooks/useTrip";
import Loader from "./Loader";
import TripItem from "./TripItem";
import styles from "./TripList.module.css";

export default function TripList() {
  const { trips, isLoading } = useTrip();

  if (isLoading) return <Loader />;

  return (
    <div className={styles.tripList}>
      {trips.map((trip) => (
        <TripItem trip={trip} key={trip.id} />
      ))}
    </div>
  );
}
