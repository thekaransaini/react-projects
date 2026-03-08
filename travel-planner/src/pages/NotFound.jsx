import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.notfound}>
      <h1>This page doesn’t exist 😢</h1>
      <p>Please check your URL or return to home.</p>
    </main>
  );
}
