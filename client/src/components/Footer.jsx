import React from "react";

const Footer = () => {
  return (
    <div>
      <p className="text-center p-4 text-slate-400 text-xs mt-4">
        © {new Date().getFullYear()} Resume Builder
      </p>
    </div>
  );
};

export default Footer;
