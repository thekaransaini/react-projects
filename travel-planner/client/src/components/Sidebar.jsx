import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  return (
    <>
      {isOpen && <div className={styles.overlay}></div>}
      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        <Logo />
        <Outlet />
      </div>
    </>
  );
}
