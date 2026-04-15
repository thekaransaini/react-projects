import styles from "./NavBar.module.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ResultsCount from "./ResultsCount";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegTimesCircle } from "react-icons/fa";
import Button from "./Button";

export default function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = window.innerWidth <= 800;

  function toggleSearch() {
    setIsSearchOpen((curr) => !curr);
  }

  return (
    <nav className={styles.navBar}>
      {!isMobile ? (
        <>
          <Logo />
          <SearchBar />
          <ResultsCount />
        </>
      ) : (
        <>
          {!isSearchOpen && <Logo />}
          {isSearchOpen && <SearchBar />}
          <Button className="toggleBtn" handleToggle={toggleSearch}>
            {isSearchOpen ? (
              <FaRegTimesCircle className={styles.icon} />
            ) : (
              <FaSearch className={styles.icon} />
            )}
          </Button>
        </>
      )}
    </nav>
  );
}
