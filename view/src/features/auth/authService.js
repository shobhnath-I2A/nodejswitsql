// src/features/auth/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users/";

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData, {
    headers: { "Content-Type": "application/json" },
  });

  if (response.data) {
    // store token + user info
    const { userId, token } = response.data;

    // 1. Get user details immediately after login
    const userDetails = await getUserById(userId, token);

    // 2. Save token + user info in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({ ...userDetails.user, token })
    );

    return { ...userDetails.user, token };
  }

  return null;
};

// get user by ID
const getUserById = async (id, token) => {
  const response = await axios.get(API_URL + `get-user-details/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
};

// logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = { login, logout, getUserById, register };
export default authService;
