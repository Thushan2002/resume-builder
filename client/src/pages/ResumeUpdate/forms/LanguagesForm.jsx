import React from "react";
import { MdTranslate } from "react-icons/md";
import { FaTrash, FaPlus } from "react-icons/fa";

const LanguagesForm = ({
  languages,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-pink-600 rounded-lg">
          <MdTranslate className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-semibold text-white">Languages</h3>
      </div>
      {languages.map((lang, index) => (
        <div
          key={index}
          className="bg-gray-700 p-4 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeArrayItem("languages", index)}
            className="absolute top-2 right-2 text-red-400 hover:text-red-300">
            <FaTrash />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Language Name
              </label>
              <input
                type="text"
                value={lang.name}
                onChange={(e) =>
                  updateArrayItem("languages", index, "name", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Language Name"
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
                value={lang.progress}
                onChange={(e) =>
                  updateArrayItem(
                    "languages",
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
          addArrayItem("languages", {
            name: "",
            progress: 0,
          })
        }
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <FaPlus /> Add Language
      </button>
    </div>
  );
};

export default LanguagesForm;
