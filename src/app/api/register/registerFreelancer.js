import axiosClient from "../axiosClient"; 


export const registerFreelancer = (formData) => {
  return axiosClient.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const registerFreelancerBase = async (payload) => {
  const fd = new FormData();

  fd.append("type", "freelancer");

  Object.entries(payload).forEach(([key, value]) => {
    fd.append(key, value ?? "");
  });

  return axiosClient.post("/register", fd, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

export const registerFreelancerFinal = async (formData) => {
  return axiosClient.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};


