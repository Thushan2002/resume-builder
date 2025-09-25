import React from "react";
import { FaUser } from "react-icons/fa";

const ProfileForm = ({ profileInfo, updateSection }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg">
          <FaUser className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-semibold text-white">
          Profile Information
        </h3>
      </div>

      <div className="flex flex-col items-center mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Profile Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const preview = URL.createObjectURL(file);
              updateSection("profileInfo", "profileImg", file);
              updateSection("profileInfo", "profilePreviewUrl", preview);
            }
          }}
          className="hidden"
          id="profile-img"
        />
        <label htmlFor="profile-img" className="cursor-pointer">
          {profileInfo.profilePreviewUrl ? (
            <img
              src={profileInfo.profilePreviewUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-4xl text-gray-400">
              <FaUser />
            </div>
          )}
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
            value={profileInfo.fullName}
            onChange={(e) =>
              updateSection("profileInfo", "fullName", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Designation
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Software Engineer"
            value={profileInfo.designation}
            onChange={(e) =>
              updateSection("profileInfo", "designation", e.target.value)
            }
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Professional Summary
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description about your professional background..."
            value={profileInfo.summary}
            onChange={(e) =>
              updateSection("profileInfo", "summary", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
