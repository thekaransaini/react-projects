import styles from "./RoleSwitcher.module.css";

export default function RoleSwitcher() {
  return (
    <select className={styles.roleSwitcher}>
      <option value="">Viewer</option>
      <option value="">Admin</option>
    </select>
  );
}
