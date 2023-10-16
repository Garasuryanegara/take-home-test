import { Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";

const routes = [
  <Route path="/login" element={<LoginPage />}></Route>,
  <Route path="/register" element={<RegisterPage />}></Route>,
  <Route path="/" element={<LandingPage />}></Route>,
];

export default routes;
