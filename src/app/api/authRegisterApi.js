import axiosClient from "./axiosClient";

export const registerCustomer = async (formData) => {
  try {
    const res = await axiosClient.post(
      "/api/auth/register/client",
      formData
    );
    return { success: true, data: res.data };

  } catch (error) {
    if (error.response) {
      // Backend responded with 4xx/5xx
      return {
        success: false,
        message: error.response.data?.message || "Request failed",
        status: error.response.status,
      };
    }

    // Network / unexpected error
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export const registerFreelancer = async (formData) => {
  try {
    const res = await axiosClient.post(
      "/api/auth/register/freelancer",
      formData
    );

    return {
      success: true,
      data: res.data,
    };

  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Registration failed",
        status: error.response.status,
      };
    }

    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export const getFreelancerCategories = async () => {
  try {
    const res = await axiosClient.get("/api/freelancer/categories");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to load categories",
    };
  }
};

export const getFreelancerSubCategories = async () => {
  try {
    const res = await axiosClient.get("/api/freelancer/subcategories");
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to load categories",
    };
  }
};

export const registerCompany = async (formData) => {
  try {
    const res = await axiosClient.post(
      "/api/auth/register/company",
      formData
    );

    return {
      success: true,
      data: res.data,
    };

  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Company registration failed",
        status: error.response.status,
      };
    }

    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export const sendEmailOtp = (email) => {
  return axiosClient.post("/api/auth/send-code", {
    email,
  });
};

export const verifyEmailOtp = (email, code) => {
  return axiosClient.post("/api/auth/verify-code", {
    email,
    code, // 6 digit OTP
  });
};

