import styles from "./NavBar.module.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ResultsCount from "./ResultsCount";

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Logo />
      <SearchBar />
      <ResultsCount />
    </nav>
  );
}
