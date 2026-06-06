import API from "./axios";

// Get all stores (with optional search)
export const getStores = (search = "") => {
  return API.get(`/user/stores?search=${search}`);
};

// Submit or update rating
export const submitRating = (storeId, rating) => {
  return API.post(`/user/rating`, {
    storeId,
    rating,
  });
};