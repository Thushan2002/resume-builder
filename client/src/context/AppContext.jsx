import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchAuthUser = async () => {
    try {
      const { data } = await axios.get("/api/user/authMe", {
        withCredentials: true,
      });
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  const value = {
    axios,
    user,
    setUser,
    navigate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
