import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const register = (userId, password, confirmPassword) => {
  return axios.post(API_URL + "signup", {
    userId,
    password,
    confirmPassword,
  });
};

const login = (userId, password) => {
  return axios
    .post(API_URL + "signin", {
      userId,
      password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = { register, login, logout, getCurrentUser };

export default AuthService
