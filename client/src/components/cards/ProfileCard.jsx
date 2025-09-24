import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import avatar from "../../assets/images/avatar.png";
import { Link } from "react-router-dom";
import EditProfile from "../../modals/EditProfile";
import toast from "react-hot-toast";

const ProfileCard = () => {
  const { user, axios, navigate, setUser } = useAppContext();
  const [profileMenu, setProfileMenu] = useState(null);
  const [editProfile, setEditProfile] = useState(null);

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
    <div>
      <div
        onClick={() => setProfileMenu((prev) => !prev)}
        className="flex justify-center items-center cursor-pointer gap-2 relative">
        <img
          className="rounded-full w-10 h-10"
          src={user.profileImage || avatar}
          alt=""
        />
        <p className="text-white">{user.username || "Karan"}</p>
        {/* Toggle profile menu */}
        {profileMenu && (
          <div className="bg-gray-200 w-[110px] flex flex-col items-start justify-between p-1 rounded-sm mt-2 absolute top-10 right-10 z-10">
            <p
              onClick={() => setEditProfile(true)}
              className="text-black font-semibold hover:bg-black/20 cursor-pointer m-1 p-1 rounded-sm ">
              Edit Profile
            </p>
            <EditProfile
              isOpen={editProfile}
              onclose={() => setEditProfile(false)}
            />
            <hr className="w-full border my-1 border-black h-0.25" />
            <button
              onClick={() => handleLogout()}
              className="text-black font-semibold hover:bg-black/20 cursor-pointer m-1 p-1 rounded-sm">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
