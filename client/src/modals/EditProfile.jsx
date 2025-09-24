import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const isOpen = ({ isOpen, onclose }) => {
  const [profile, setProfile] = React.useState({
    picture: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (typeof isOpen === "object" && isOpen !== null) {
      setProfile({
        picture: isOpen.picture || "",
        name: isOpen.name || "",
        email: isOpen.email || "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files && files[0]) {
      setProfile((prev) => ({
        ...prev,
        picture: URL.createObjectURL(files[0]),
        pictureFile: files[0],
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle update logic (API call or parent callback)
    onclose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-96 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-semibold">Edit Your Profile</p>
              <button
                onClick={() => onclose()}
                className="text-gray-500 hover:text-gray-800">
                <FiX size={20} />
              </button>
            </div>

            {/* Example form (expand later) */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default isOpen;
