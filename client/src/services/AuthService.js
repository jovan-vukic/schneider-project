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
export const signUp = async (username, password, role) => {
  const response = await api.post("/auth/signup", {
    login: username,
    password,
    role,
  });

  if (response.status === 201) {
    return "Success";
  } else {
    throw new Error("Invalid signup response");
  }
};
