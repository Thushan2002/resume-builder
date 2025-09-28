import React from "react";
import { FaProjectDiagram, FaTrash, FaPlus } from "react-icons/fa";

const ProjectsForm = ({
  projects,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <FaProjectDiagram className="text-white text-lg" />
        </div>
        <h3 className="text-xl font-semibold text-white">Projects</h3>
      </div>
      {projects.map((project, index) => (
        <div
          key={index}
          className="bg-gray-700 p-4 rounded-lg space-y-4 relative">
          <button
            onClick={() => removeArrayItem("projects", index)}
            className="absolute top-2 right-2 text-red-400 hover:text-red-300">
            <FaTrash />
          </button>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={project.title}
              onChange={(e) =>
                updateArrayItem("projects", index, "title", e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Project Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={project.description}
              onChange={(e) =>
                updateArrayItem(
                  "projects",
                  index,
                  "description",
                  e.target.value
                )
              }
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Project Description"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={project.gitHub}
                onChange={(e) =>
                  updateArrayItem("projects", index, "gitHub", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="GitHub Link"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                value={project.liveDemo}
                onChange={(e) =>
                  updateArrayItem("projects", index, "liveDemo", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Live Demo Link"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() =>
          addArrayItem("projects", {
            title: "",
            description: "",
            gitHub: "",
            liveDemo: "",
          })
        }
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        <FaPlus /> Add Project
      </button>
    </div>
  );
};

export default ProjectsForm;
