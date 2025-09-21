import React from "react";

const Spinner = ({ size, color }) => {
  let sizeClass = "w-6 h-6"; // default small
  if (size === "large") sizeClass = "w-16 h-16";
  else if (size === "medium") sizeClass = "w-10 h-10";

  let colorClass = color === "white" ? "border-white" : "border-black";

  return (
    <div
      className={`${sizeClass} ${colorClass} animate-spin border-l-2 border rounded-full`}></div>
  );
};

export default Spinner;
