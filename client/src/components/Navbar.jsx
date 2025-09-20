import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = ({ state }) => {
  //   const [state, setState] = useState("");
  const { user, navigate, setUser, axios } = useAppContext();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");

      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-5">
      {" "}
      <header className="px-2 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="bg-radial text-3xl from-white to-gray-600 font-bold bg-clip-text text-transparent bg-[length:200%_200%] animate-text-shine cursor-pointer">
          ResumeNow
        </h1>

        {user ? (
          <button
            onClick={handleLogout}
            className="w-fit px-6 py-2 font-semibold text-lg tracking-wide bg-white text-black rounded-xl hover:scale-105 cursor-pointer">
            Logout
          </button>
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
