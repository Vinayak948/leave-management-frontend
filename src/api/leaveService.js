import axiosInstance from "./axiosInstance";

const applyLeave = (data) => 
  axiosInstance.post("/Leave/apply", data);

const getMyLeaves = () => 
  axiosInstance.get("/Leave/my");

const getAllLeaves = () => 
  axiosInstance.get("/Leave/all");

const getSummary = () => 
  axiosInstance.get("/Leave/summary");

const updateStatus = (id, status) =>
  axiosInstance.put(`/Leave/update/${id}`, { status });

export default {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  getSummary,
  updateStatus,
};