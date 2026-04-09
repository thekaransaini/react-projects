import styles from "./Header.module.css";
import Logo from "./Logo";
import Dropdown from "./Dropdown";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Dropdown options={["Viewer", "Admin"]} />
    </header>
  );
}
