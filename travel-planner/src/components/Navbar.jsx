import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/about" className={styles.aboutLink}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={styles.ctaLink}>
            Sign up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
