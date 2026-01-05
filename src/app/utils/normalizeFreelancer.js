// utils/normalizeFreelancer.js
export const normalizeFreelancer = (profile) => {
  if (!profile) return null;

  return {
    id: profile._id || profile.freelancerId?._id || null,
    name:
      profile.name ||
      `${profile.freelancerId?.firstName || ""} ${profile.freelancerId?.lastName || ""}`,
    avatar:
      profile.selfiePhoto || profile.freelancerId?.selfiePhoto || null,
    raw: profile, // keep original if needed
  };
};
