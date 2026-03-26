import styles from "./ErrorMsg.module.css";

export default function ErrorMsg({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}
