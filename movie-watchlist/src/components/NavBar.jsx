import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ResultsCount from "./ResultsCount";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function NavBar() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}
