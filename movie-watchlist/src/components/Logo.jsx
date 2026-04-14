import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
