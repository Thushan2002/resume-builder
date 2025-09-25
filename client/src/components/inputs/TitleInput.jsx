import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

const TitleInput = ({ title, setTitle }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="flex items-center gap-3 w-full">
      {showInput ? (
        <div className="flex items-center gap-2 w-full">
          <input
            className="flex-1 px-4 py-2 text-lg font-semibold text-white bg-gray-700 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            type="text"
            placeholder="Enter resume title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setShowInput((prev) => !prev)}>
            <FiCheck className="text-lg" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 w-full">
          <h2 className="text-xl font-bold text-white truncate">
            {title || "Untitled Resume"}
          </h2>
          <button
            className="p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setShowInput((prev) => !prev)}>
            <FaPencilAlt className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TitleInput;
