import api from "../utils/api";

/* Login existing user */
export const login = async (username, password) => {
  const response = await api.post("/auth/signin", {
    login: username,
    password,
  });

  // Check if response contains accessToken
  if (response.data && response.data.accessToken) {
    return response.data;
  } else {
    throw new Error("Invalid login response");
  }
};

/* Sign up new user */
export const signup = async (username, password) => {
  const response = await api.post("/auth/signup", { username, password });
  return response.data;
};
