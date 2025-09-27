import React from "react";
import { MdWork } from "react-icons/md";
import { FaTrash, FaPlus } from "react-icons/fa";

const ExperienceForm = ({
  workExperience,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-600 rounded-lg">
          <MdWork className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-semibold text-white">Work Experience</h3>
      </div>
      {workExperience.map((exp, index) => (
        <div
          key={index}
          className="bg-gray-700 p-4 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeArrayItem("workExperience", index)}
            className="absolute top-2 right-2 text-red-400 hover:text-red-300">
            <FaTrash />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  updateArrayItem(
                    "workExperience",
                    index,
                    "company",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role
              </label>
              <input
                type="text"
                value={exp.role}
                onChange={(e) =>
                  updateArrayItem(
                    "workExperience",
                    index,
                    "role",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Job Role"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) =>
                  updateArrayItem(
                    "workExperience",
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
                value={exp.endDate}
                onChange={(e) =>
                  updateArrayItem(
                    "workExperience",
                    index,
                    "endDate",
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={exp.description}
              onChange={(e) =>
                updateArrayItem(
                  "workExperience",
                  index,
                  "description",
                  e.target.value
                )
              }
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          addArrayItem("workExperience", {
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <FaPlus /> Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
