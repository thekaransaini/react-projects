import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <img src="/logo.png" alt="travel planner logo" className={styles.logo} />
  );
}
