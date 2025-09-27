import React from "react";
import { MdSchool } from "react-icons/md";
import { FaTrash, FaPlus } from "react-icons/fa";

const EducationForm = ({
  education,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-600 rounded-lg">
          <MdSchool className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-semibold text-white">Education</h3>
      </div>
      {education.map((edu, index) => (
        <div
          key={index}
          className="bg-gray-700 p-4 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeArrayItem("education", index)}
            className="absolute top-2 right-2 text-red-400 hover:text-red-300">
            <FaTrash />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Degree
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  updateArrayItem("education", index, "degree", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Degree Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Institution
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  updateArrayItem(
                    "education",
                    index,
                    "institution",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Institution Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) =>
                  updateArrayItem(
                    "education",
                    index,
                    "startDate",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) =>
                  updateArrayItem("education", index, "endDate", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          addArrayItem("education", {
            degree: "",
            institution: "",
            startDate: "",
            endDate: "",
          })
        }
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <FaPlus /> Add Education
      </button>
    </div>
  );
};

export default EducationForm;
