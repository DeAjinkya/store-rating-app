import API from "./axios";

// Get all users
export const getAllUsers = async () => {
  return API.get("/admin/users");
};

// Get all stores
export const getAllStores = async () => {
  return API.get("/admin/stores");
};