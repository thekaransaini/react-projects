import styles from "./NavBar.module.css";

export default function NavBar({ children }) {
  return (
    <nav className={styles.navBar}>
      <Logo />
      {children}
    </nav>
  );
}
