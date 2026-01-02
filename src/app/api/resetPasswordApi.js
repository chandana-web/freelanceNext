import axiosClient from "./axiosClient";

export const resetPassword = async ({
  email,
  tempCode,
  newPassword,
  confirmPassword,
}) => {
  const response = await axiosClient.post(
    "/api/auth/reset-password",
    {
      email,
      tempCode,
      newPassword,
      confirmPassword,
    }
  );

  return response.data;
};
