import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
