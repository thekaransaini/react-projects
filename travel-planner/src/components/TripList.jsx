import useTrip from "../hooks/useTrip";
import ErrorMsg from "./ErrorMsg";
import Loader from "./Loader";
import TripItem from "./TripItem";
import styles from "./TripList.module.css";

export default function TripList() {
  const { trips, isLoading } = useTrip();

  if (isLoading) return <Loader />;
  if (!trips.length)
    return <ErrorMsg message="Add your first trip by clicking on the map" />;

  return (
    <div className={styles.tripList}>
      {trips.map((trip) => (
        <TripItem trip={trip} key={trip.id} />
      ))}
    </div>
  );
}
