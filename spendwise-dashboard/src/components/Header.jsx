import styles from "./Header.module.css";
import Logo from "./Logo";
import RoleSwitcher from "./RoleSwitcher";

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <RoleSwitcher />
    </header>
  );
}
