import axiosInstance from "./axiosInstance";

const login = (data) => {
  console.log("Attempting login with:", { email: data.email, password: "***" });
  return axiosInstance.post("/Auth/login", data);
};

const register = (data) => {
  console.log("Registering user", { email: data.email, role: data.role });
  return axiosInstance.post("/Auth/register", data);
};

export default { login, register };