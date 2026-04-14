import styles from "./NavBar.module.css";
import Logo from "./Logo";

export default function NavBar({ children }) {
  return (
    <nav className={styles.navBar}>
      <Logo />
      {children}
    </nav>
  );
}
