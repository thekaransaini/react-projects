import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import { useLocation } from "react-router-dom";
import PackingList from "./PackingList";
import Expenses from "./Expenses";

export default function AppLayout() {
  const location = useLocation();
  const isPackingPage = location.pathname.includes("packing");
  const isExpensesPage = location.pathname.includes("expenses");

  return (
    <div className={styles.app}>
      {isPackingPage ? (
        <PackingList />
      ) : isExpensesPage ? (
        <Expenses />
      ) : (
        <>
          <Sidebar />
          <Map />
        </>
      )}
    </div>
  );
}
