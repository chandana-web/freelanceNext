import axiosClient from "./axiosClient";


const SIGNIN_ENDPOINTS = {
  customer: "/api/auth/customer/signin",
  freelancer: "/api/auth/freelancer/signin",
  company: "/api/auth/company/signin",
};

export const signInUser = async ({ email, password, role }) => {
  if (!SIGNIN_ENDPOINTS[role]) {
    throw new Error("Invalid role selected");
  }

  const response = await axiosClient.post(
    SIGNIN_ENDPOINTS[role],
    {
      email,
      password,
      role,
    }
  );

  return response.data;
};
