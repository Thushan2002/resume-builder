import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import ProfileCard from "./cards/ProfileCard";
import { MdDashboard } from "react-icons/md";

const Navbar = ({ state }) => {
  //   const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, navigate, setUser, axios } = useAppContext();

  return (
    <div className="p-5">
      <header className="px-2 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="bg-radial text-3xl from-white to-gray-600 font-bold bg-clip-text text-transparent bg-[length:200%_200%] animate-text-shine cursor-pointer">
          ResumeNow
        </h1>
        {user ? (
          <div className="flex justify-center items-center gap-6">
            <Link
              to={"/dashboard"}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium group">
              <MdDashboard />
              Dashboard
            </Link>
            <ProfileCard />
          </div>
        ) : (
          <button className="w-fit px-6 py-2 font-semibold text-lg tracking-wide bg-white text-black rounded-xl hover:scale-105 cursor-pointer">
            <Link to={state === "login" ? "/signup" : "/login"}>
              {state === "login" ? "signup" : "login"}
            </Link>
          </button>
        )}
      </header>
    </div>
  );
};

export default Navbar;
