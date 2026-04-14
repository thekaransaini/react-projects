import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
  return (
    <p className={styles.error}>
      <span>⚠️</span>
      {message}
    </p>
  );
}
