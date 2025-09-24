import React from "react";
import { useAppContext } from "../../context/AppContext";

const DashboardLayout = ({ children }) => {
  const { user } = useAppContext();
  return (
    <div>
      {user && <div className="container mx-auto pt-4 pb-4">{children}</div>}
    </div>
  );
};

export default DashboardLayout;
