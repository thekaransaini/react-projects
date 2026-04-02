import styles from "./Logo.module.css";
import { FaWallet } from "react-icons/fa";

export default function Logo() {
  return (
    <h1 className={styles.logo}>
      <FaWallet className={styles.logoIcon} />
      <span className={styles.logoText}>SpendWise</span>
    </h1>
  );
}
