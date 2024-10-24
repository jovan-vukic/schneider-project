import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, signUp } from "../services/AuthService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleSignUp = async (username, password, role) => {
    try {
      await signUp(username, password, role);
      return "Success";
    } catch (error) {
      console.error(error);
      return error.response.data.message || "Something went wrong";
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const { accessToken } = await login(username, password);

      setToken(accessToken);
      setUser({ username, password });
      localStorage.setItem("user", JSON.stringify({ username, password }));
      localStorage.setItem("token", accessToken);

      return "Success";
    } catch (error) {
      console.error(error);
      return error.response.data.message || "Something went wrong";
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* Provide auth context to children components */
  return (
    <AuthContext.Provider
      value={{ token, user, handleSignUp, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* Custom hook for accessing auth context */
export const useAuth = () => {
  return useContext(AuthContext);
};

/* Export auth provider */
export default AuthProvider;
