import React, { useState } from "react";
import hero_img from "../assets/images/hero.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentModal, setCurrentModal] = useState("login");
  return (
    <div className="w-full min-h-full text-white">
      <div className="mx-auto px-4 py-6">
        {/* header */}
        <header className=" px-2 flex justify-between items-center">
          <h1 className="bg-radial text-3xl from-white to-gray-600 font-bold bg-clip-text text-transparent bg-[length:200%_200%] animate-text-shine">
            ResumeNow
          </h1>
          <button className="w-fit px-6 py-2 font-semibold text-lg tracking-wide bg-white text-black rounded-xl hover:scale-105 cursor-pointer">
            <Link to={"/login"}>Login</Link>
          </button>
        </header>

        {/* Hero  */}
        <div className="w-full min-h-full flex flex-col sm:flex-row justify-between gap-5 items-center mb-8">
          <div className="min-h-screen flex flex-col items-start justify-center px-6 w-2/3 ">
            <p className="text-5xl font-bold text-white leading-snug">
              Create Your <br />
              <span
                className="bg-radial flex-1 text-7xl
                     from-purple-400 via-pink-500 to-yellow-500 
                     bg-[length:200%_200%] bg-clip-text text-transparent 
                     animate-text-shine">
                Resume Now
              </span>
            </p>

            <p className="mt-6 text-gray-400 max-w-xl text-lg">
              Build a professional resume in minutes — fast, easy, and designed
              to land your dream job.
            </p>
          </div>

          <div className="w-2/3 h-full relative group px-8">
            <img
              src={hero_img}
              alt=""
              className="rounded-xl shadow-gray-700 transition duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl group-hover:blur-[1px]"
            />

            <p
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                text-3xl text-white px-6 py-3 rounded-xl font-semibold 
                bg-gray/30 backdrop-blur-md shadow-lg 
                opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer hover:scale-105">
              Generate Now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
