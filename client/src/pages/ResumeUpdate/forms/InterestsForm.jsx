import React from "react";
import { MdInterests } from "react-icons/md";
import { FaTrash, FaPlus } from "react-icons/fa";

const InterestsForm = ({
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-600 rounded-lg">
          <MdInterests className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-semibold text-white">Interests</h3>
      </div>
      {interests.map((interest, index) => (
        <div key={index} className="flex items-center gap-3">
          <input
            type="text"
            value={interest}
            onChange={(e) =>
              updateArrayItem("interests", index, null, e.target.value)
            }
            className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Interest"
          />
          <button
            onClick={() => removeArrayItem("interests", index)}
            className="text-red-400 hover:text-red-300">
            <FaTrash />
          </button>
        </div>
      ))}
      <button
        onClick={() => addArrayItem("interests", "")}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <FaPlus /> Add Interest
      </button>
    </div>
  );
};

export default InterestsForm;
