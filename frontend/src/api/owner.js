import API from "./axios";

// Get owner's store details
export const getOwnerStore = () => {
  return API.get("/owner/store");
};