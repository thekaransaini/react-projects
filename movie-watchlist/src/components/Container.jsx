import styles from "./Container.module.css";
import { useState } from "react";

export default function Container({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.container}>
      <button
        className={styles.btnToggle}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
