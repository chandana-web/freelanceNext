import axiosClient from "./axiosClient";

export const getFreelancerProfile = (freelancerId) => {
  return axiosClient.get(`/api/public/freelancer/${freelancerId}`);
};

export const addFreelancerReview = (freelancerId, payload) => {
  return axiosClient.post(
    `/api/public/freelancer/${freelancerId}/rate`,
    payload
  );
};

export const markCommentHelpful = (
  freelancerId,
  commentId,
  type // "helpful" | "notHelpful"
) => {
  return axiosClient.post(
    `/api/public/freelancer/${freelancerId}/comment/${commentId}/helpful`,
    { type }
  );
}