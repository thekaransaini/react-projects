import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Container from "./components/Container";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchedMovieSummary from "./components/WatchedMovieSummary";
import WatchList from "./components/WatchList";
import MobileLayout from "./components/MobileLayout";
import DesktopLayout from "./components/DesktopLayout";
import { useEffect, useState } from "react";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <NavBar />
      <Main>{isMobile ? <MobileLayout /> : <DesktopLayout />}</Main>
    </>
  );
}
