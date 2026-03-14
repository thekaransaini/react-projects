import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import AppLayout from "../pages/AppLayout";
import TripList from "../components/TripList";
import Trip from "../components/Trip";
import City from "../components/City";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="about" element={<About />} />
      <Route path="app" element={<AppLayout />}>
        <Route index element={<Navigate replace to="trips" />} />
        <Route path="trips" element={<TripList />} />
        <Route path="trips/:tripId" element={<Trip />}>
          <Route path="cities/:cityId" element={<City />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
