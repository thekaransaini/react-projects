import { useState } from "react";
import styles from "./MobileNav.module.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Button from "./Button";
import { FaRegTimesCircle, FaSearch } from "react-icons/fa";

export default function MobileNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function toggleSearch() {
    setIsSearchOpen((curr) => !curr);
  }

  return (
    <nav className="navBarMobile">
      {!isSearchOpen && <Logo />}
      {isSearchOpen && <SearchBar />}
      <Button className="toggleBtn" onClick={toggleSearch}>
        {isSearchOpen ? (
          <FaRegTimesCircle className={styles.icon} />
        ) : (
          <FaSearch className={styles.icon} />
        )}
      </Button>
    </nav>
  );
}
