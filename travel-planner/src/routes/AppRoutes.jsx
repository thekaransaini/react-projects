import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import AppLayout from "../pages/AppLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="about" element={<About />} />
      <Route path="app" element={<AppLayout />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
