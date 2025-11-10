import React from "react";
import { MdBuild } from "react-icons/md";
import { FaTrash, FaPlus } from "react-icons/fa";

const SkillsForm = ({
  skills,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-600 rounded-lg">
          <MdBuild className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-semibold text-white">Skills</h3>
      </div>
      {skills.map((skill, index) => (
        <div
          key={index}
          className="bg-gray-700 p-4 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeArrayItem("skills", index)}
            className="absolute top-2 right-2 text-red-400 hover:text-red-300">
            <FaTrash />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skill Name
              </label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) =>
                  updateArrayItem("skills", index, "name", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Skill Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Proficiency (0-100)
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={skill.progress}
                onChange={(e) =>
                  updateArrayItem(
                    "skills",
                    index,
                    "progress",
                    parseInt(e.target.value)
                  )
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          addArrayItem("skills", {
            name: "",
            progress: 0,
          })
        }
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <FaPlus /> Add Skill
      </button>
    </div>
  );
};

export default SkillsForm;
