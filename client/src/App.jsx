import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/auth/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="mx-auto md:px-6 lg:px-12 min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
