import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import { useLocation } from "react-router-dom";
import PackingList from "./PackingList";
import Expenses from "./Expenses";
import CitySearch from "../components/CitySearch";
import { useState } from "react";

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isPackingPage = location.pathname.includes("packing");
  const isExpensesPage = location.pathname.includes("expenses");

  function handleSidebar() {
    setIsOpen((curr) => !curr);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <div className={styles.app}>
      {isPackingPage ? (
        <PackingList />
      ) : isExpensesPage ? (
        <Expenses />
      ) : (
        <>
          <Sidebar isOpen={isOpen} />
          <Map>
            <CitySearch
              handleSidebar={handleSidebar}
              handleOpen={handleOpen}
              isOpen={isOpen}
            />
          </Map>
        </>
      )}
    </div>
  );
}
