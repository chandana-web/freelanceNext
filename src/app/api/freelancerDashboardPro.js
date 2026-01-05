import axiosClient from "./axiosClient";

export const getAllFreelancers = ({page=1, limit=8}) => {
  return axiosClient.get("/api/public/freelancers", {
    params: { page, limit }
  });
};



export const getFreelancerProfile = () => {
  return axiosClient.get("/api/dashboard/freelancer/me");
};

// UPDATE profile (later)
export const updateFreelancerProfile = (payload) => {
  return axiosClient.put("/api/dashboard/freelancer/me", payload);
};

export const updateFreelancerAccount = (payload) => {
  return axiosClient.put("/api/dashboard/freelancer/account", payload);
};

// ADD
export const addEducation = (payload) => {
  return axiosClient.post(
    "/api/dashboard/freelancer/education",
    payload
  );
};

// UPDATE
export const updateEducation = (educationId, payload) => {
  return axiosClient.put(
    `/api/dashboard/freelancer/education/${educationId}`,
    payload
  );
};

// DELETE
export const deleteEducation = (educationId) => {
  return axiosClient.delete(
    `/api/dashboard/freelancer/education/${educationId}`
  );
};


// ADD
export const addExperience = (payload) => {
  return axiosClient.post(
    "/api/dashboard/freelancer/experience",
    payload
  );
};

// UPDATE
export const updateExperience = (experienceId, payload) => {
  return axiosClient.put(
    `/api/dashboard/freelancer/experience/${experienceId}`,
    payload
  );
};

// DELETE
export const deleteExperience = (experienceId) => {
  return axiosClient.delete(
    `/api/dashboard/freelancer/experience/${experienceId}`
  );
};

// ADD
export const addCertification = (payload) => {
  return axiosClient.post(
    "/api/dashboard/freelancer/certification",
    payload
  );
};

// UPDATE
export const updateCertification = (certificationId, payload) => {
  return axiosClient.put(
    `/api/dashboard/freelancer/certification/${certificationId}`,
    payload
  );
};

// DELETE
export const deleteCertification = (certificationId) => {
  return axiosClient.delete(
    `/api/dashboard/freelancer/certification/${certificationId}`
  );
};

// ADD project
export const addProject = (formData) => {
  return axiosClient.post(
    "/api/dashboard/freelancer/project",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};


// UPDATE project
export const updateProject = (id, formData) => {
  return axiosClient.put(
    `/api/dashboard/freelancer/project/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// DELETE project
export const deleteProject = (projectId) => {
  return axiosClient.delete(
    `/api/dashboard/freelancer/project/${projectId}`
  );
};





export const updateFreelancerSkills = (skills) => {
  return axiosClient.put(
    "/api/dashboard/freelancer/skill",
    {
      skill: skills.join(", "),
    }
  );
};

export const postReviewReply = (commentId, message) => {
  return axiosClient.post(
    `/api/dashboard/freelancer/comment/${commentId}/reply`,
    { message }
  );
};
