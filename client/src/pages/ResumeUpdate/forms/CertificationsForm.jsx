import React from "react";
import { FaCertificate, FaTrash, FaPlus } from "react-icons/fa";

const CertificationsForm = ({
  certifications,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-teal-600 rounded-lg">
          <FaCertificate className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-semibold text-white">Certifications</h3>
      </div>
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="bg-gray-700 p-4 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeArrayItem("certifications", index)}
            className="absolute top-2 right-2 text-red-400 hover:text-red-300">
            <FaTrash />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={cert.title}
                onChange={(e) =>
                  updateArrayItem(
                    "certifications",
                    index,
                    "title",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Certification Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Issuer
              </label>
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) =>
                  updateArrayItem(
                    "certifications",
                    index,
                    "issuer",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Issuer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Year
              </label>
              <input
                type="text"
                value={cert.year}
                onChange={(e) =>
                  updateArrayItem(
                    "certifications",
                    index,
                    "year",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Year"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          addArrayItem("certifications", {
            title: "",
            issuer: "",
            year: "",
          })
        }
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <FaPlus /> Add Certification
      </button>
    </div>
  );
};

export default CertificationsForm;
