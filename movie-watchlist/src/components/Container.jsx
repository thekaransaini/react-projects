import styles from "./Container.module.css";
import { useState } from "react";

export default function Container({ children, className }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`${styles.container} ${className}`}>
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
