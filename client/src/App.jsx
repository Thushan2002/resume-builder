import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <div className="container mx-auto min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
