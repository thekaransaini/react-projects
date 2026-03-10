import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import TripList from "./TripList";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <TripList />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
