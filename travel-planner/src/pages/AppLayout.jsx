import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import { Outlet, useLocation } from "react-router-dom";
import PackingList from "./PackingList";

export default function AppLayout() {
  const location = useLocation();
  const isPackingPage = location.pathname.includes("packing");
  return (
    <div className={styles.app}>
      {isPackingPage ? (
        <PackingList />
      ) : (
        <>
          <Sidebar />
          <Map />
        </>
      )}
    </div>
  );
}
