import api from "../utils/api";

/* Login existing user */
export const login = async (username, password) => {
  const response = await api.post("/auth/signin", {
    login: username,
    password,
  });

  return response.data;
};

/* Sign up new user */
export const signup = async (username, password) => {
  const response = await api.post("/auth/signup", { username, password });
  return response.data;
};
