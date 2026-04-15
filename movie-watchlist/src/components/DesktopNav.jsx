import Logo from "./Logo";
import ResultsCount from "./ResultsCount";
import SearchBar from "./SearchBar";

export default function DesktopNav() {
  return (
    <nav className="navBarDesktop">
      <Logo />
      <SearchBar />
      <ResultsCount />
    </nav>
  );
}
