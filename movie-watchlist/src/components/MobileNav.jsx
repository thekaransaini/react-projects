import { useState } from "react";
import styles from "./MobileNav.module.css";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Button from "./Button";
import { FaRegTimesCircle, FaSearch } from "react-icons/fa";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { useMovies } from "../hooks/useMovies";

export default function MobileNav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isWatchListOpen, toggleWatchList, closedWatchList } = useMovies();

  function toggleSearch() {
    setIsSearchOpen((curr) => !curr);
    closedWatchList();
  }

  return (
    <nav className="navBarMobile">
      {!isSearchOpen && <Logo />}
      {isSearchOpen && <SearchBar />}
      <div className={styles.navBtns}>
        <Button className="toggleBtn" onClick={toggleSearch}>
          {isSearchOpen ? (
            <FaRegTimesCircle className={styles.icon} />
          ) : (
            <FaSearch className={styles.icon} />
          )}
        </Button>
        {!isSearchOpen && (
          <Button className="toggleBtn" onClick={toggleWatchList}>
            {isWatchListOpen ? (
              <FaChevronCircleUp className={styles.icon} />
            ) : (
              <FaChevronCircleDown className={styles.icon} />
            )}
          </Button>
        )}
      </div>
    </nav>
  );
}
