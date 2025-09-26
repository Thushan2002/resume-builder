import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";

const ContactForm = ({ contactInfo, updateSection }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-600 rounded-lg">
          <FaEnvelope className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-semibold text-white">
          Contact Information
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-gray-400" />
          <input
            type="email"
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Email address"
            value={contactInfo.email}
            onChange={(e) =>
              updateSection("contactInfo", "email", e.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <FaPhone className="text-gray-400" />
          <input
            type="tel"
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Phone number"
            value={contactInfo.phone}
            onChange={(e) =>
              updateSection("contactInfo", "phone", e.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-gray-400" />
          <input
            type="text"
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Location"
            value={contactInfo.location}
            onChange={(e) =>
              updateSection("contactInfo", "location", e.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <FaLinkedin className="text-gray-400" />
          <input
            type="url"
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="LinkedIn URL"
            value={contactInfo.linkedIn}
            onChange={(e) =>
              updateSection("contactInfo", "linkedIn", e.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <FaGithub className="text-gray-400" />
          <input
            type="url"
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="GitHub URL"
            value={contactInfo.gitHub}
            onChange={(e) =>
              updateSection("contactInfo", "gitHub", e.target.value)
            }
          />
        </div>
        <div className="flex items-center gap-3">
          <FaGlobe className="text-gray-400" />
          <input
            type="url"
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Website"
            value={contactInfo.website}
            onChange={(e) =>
              updateSection("contactInfo", "website", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
