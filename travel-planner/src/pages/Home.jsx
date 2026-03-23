import styles from "./Home.module.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import useTrip from "../hooks/useTrip";

export default function Home() {
  const { isAuthenticated } = useTrip();

  return (
    <main className={styles.home}>
      <Navbar />
      <section>
        <h1>
          You travel the world.
          <br />
          Travel Planner keeps track of your adventures.
        </h1>
        <h2>
          Create trips, map out the cities you want to visit, and follow the
          perfect route. Keep track of your expenses, packing list, and every
          day of your journey—all in one place. Never miss a detail of your
          travels and share your adventures with friends.
        </h2>
        <Link to={`${isAuthenticated ? "/app" : "/login"}`} className="cta">
          Start tracking now
        </Link>
      </section>
    </main>
  );
}
