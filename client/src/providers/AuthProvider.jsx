import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, signUp } from "../services/AuthService";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const toast = useToast();

  /* Display toast message */
  const showToast = (message, status) => {
    setTimeout(() => {
      toast({
        title: message,
        status: status,
        duration: 4000,
        isClosable: true,
      });
    }, 700);
  };

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleSignUp = async (username, password, role) => {
    try {
      await signUp(username, password, role);

      showToast("Account created successfully", "success");
      return "Success";
    } catch (error) {
      console.error(error);
      return error.response.data.message || "Something went wrong";
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const { accessToken, user } = await login(username, password);

      setToken(accessToken);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);

      showToast("Login successful", "success");
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

    showToast("Logout successful", "success");
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
