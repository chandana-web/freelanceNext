"use client";

import {
  Box,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
  Avatar,
  IconButton,
  FormControl,
  Divider,
  Chip,
  TextareaAutosize,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SchoolIcon from "@mui/icons-material/School";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { getFreelancerProfile, updateFreelancerProfile, updateFreelancerSkills,addEducation,updateEducation, deleteEducation, addExperience, updateExperience, deleteExperience, addCertification, updateCertification, deleteCertification, addProject, updateProject, deleteProject } from "../../api/freelancerDashboardPro";




// const PROFILE_MOCK = [
//   {
//     collegeName: "Modern College",
//     course: "Bachelor's in Fine Arts",
//     startYear: "2013",
//     endYear: "2016",
//     description:
//       "Studied visual design, illustration, and art history with practical workshops.",
//   },
//   {
//     collegeName: "Harvard University",
//     course: "Computer Science",
//     startYear: "2008",
//     endYear: "2012",
//     description:
//       "Focused on algorithms, data structures, and software engineering principles.",
//   },
// ];

const PROFILE_MOCK = {
  education: [
    {
      collegeName: "Modern College",
      course: "Bachelor of Fine Arts",
      startYear: "2013",
      endYear: "2016",
      description:
        "Studied visual design, illustration, and art history.",
    },
    {
      collegeName: "Harvard University",
      course: "Computer Science",
      startYear: "2008",
      endYear: "2012",
      description:
        "Focused on algorithms and software engineering.",
    },
  ],
};

const EXPERIENCE_MOCK = [
  {
    companyName: "Google",
    designation: "Frontend Engineer",
    startYear: "2020",
    endYear: "2023",
    description:
      "Worked on scalable UI systems, performance optimization, and design systems.",
  },
  {
    companyName: "Startup XYZ",
    designation: "UI Developer",
    startYear: "2018",
    endYear: "2020",
    description:
      "Built responsive dashboards and collaborated with backend teams.",
  },
];

const CERTIFICATION_MOCK = [
  {
    year: "2023",
    courseName: "AWS Certified Frontend Developer",
    description:
      "Validated skills in frontend architecture, performance, and AWS integration.",
  },
  {
    year: "2021",
    courseName: "Google UX Design Professional Certificate",
    description:
      "Learned user-centered design, wireframing, and usability testing.",
  },
];

const PROJECTS_MOCK = [
  {
    projectName: "Portfolio Website",
    projectPhotos: [
      "https://via.placeholder.com/120",
      "https://via.placeholder.com/120",
    ],
    shortDescription:
      "Personal portfolio built using Next.js and MUI.",
    projectLink: "https://myportfolio.com",
    startingPrice: "$500",
  },
  {
    projectName: "E-commerce Dashboard",
    projectPhotos: [
      "https://via.placeholder.com/120",
    ],
    shortDescription:
      "Admin dashboard for managing products and orders.",
    projectLink: "https://dashboard.example.com",
    startingPrice: "$800",
  },
];





export default function Profile() {
  const [skillInput, setSkillInput] = useState("");
const [skills, setSkills] = useState([]);

const [openEduModal, setOpenEduModal] = useState(false);
const [profileImageFile, setProfileImageFile] = useState(null);


const [educationForm, setEducationForm] = useState({
  collegeName: "",
  course: "",
  startYear: "",
  endYear: "",
  description: "",
});

const [educationList, setEducationList] = useState([]);


  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    tagline: "",
    hourlyRate: "",
    currency: "",
    gender: "",
    specialization: "",
    type: "",
    country: "",
    city: "",
    language: "",
    languageLevel: "",
    description: "",
  });

  const [experienceList, setExperienceList] = useState([]);
const [openExpModal, setOpenExpModal] = useState(false);

const [experienceForm, setExperienceForm] = useState({
  companyName: "",
  designation: "",
  startYear: "",
  endYear: "",
  description: "",
});

const [certificationList, setCertificationList] =
  useState([]);

const [openCertModal, setOpenCertModal] = useState(false);

const [certificationForm, setCertificationForm] = useState({
  year: "",
  courseName: "",
  description: "",
});

const [projectList, setProjectList] = useState([]);
const [openProjectModal, setOpenProjectModal] = useState(false);
const [isEditingProject, setIsEditingProject] = useState(false);
const [editingProjectId, setEditingProjectId] = useState(null);


const [projectForm, setProjectForm] = useState({
  projectName: "",
  projectPhotos: [],
  shortDescription: "",
  projectLink: "",
  startingPrice: "",
});
const [profileImage, setProfileImage] = useState("");
const [isEditingEdu, setIsEditingEdu] = useState(false);
const [editingEduId, setEditingEduId] = useState(null);
const [isPresent, setIsPresent] = useState(false);

const [isEditingExp, setIsEditingExp] = useState(false);
const [editingExpId, setEditingExpId] = useState(null);
const [isExpPresent, setIsExpPresent] = useState(false);

const [isEditingCert, setIsEditingCert] = useState(false);
const [editingCertId, setEditingCertId] = useState(null);
const [isCertPresent, setIsCertPresent] = useState(false);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getFreelancerProfile();
      const data = res.data.profile;
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

const rawPath = data.freelancerId.selfiePhoto;

const normalizedPath = rawPath
  ? rawPath.replace(/\\/g, "/")
  : "";

const profileImageUrl = normalizedPath
  ? `${baseUrl}/${normalizedPath}`
  : "";

console.log("FINAL AVATAR URL:", profileImageUrl);

setProfileImage(profileImageUrl);


        

      setProfile({
        username: `${data.freelancerId.firstName} ${data.freelancerId.lastName}`,
        email: data.freelancerId.email,
        phone: data.freelancerId.phoneNumber,
        tagline: data.shortDescription || "",
        hourlyRate: data.hourlyRate || "",
        currency: data.currency || "",
        gender: data.gender || "",
        specialization: "",
        type: "",
        country: data.country || "",
        city: data.city || "",
        language: "",
        languageLevel: "",
        description: data.fullDescription || "",
      });

      setSkills(
        data.freelancerId.skill
          ? data.freelancerId.skill.split(",").map((s) => s.trim())
          : []
      );

      setProfileImage(profileImageUrl);

      setEducationList(data.education || []);
      setExperienceList(data.workExperience || []);
      setCertificationList(data.certifications || []);
      setProjectList(data.projects || []);
    } catch (err) {
      console.error("Error fetching profile", err);
    }
  };

  fetchProfile();
}, []);


const handleSaveProfile = async () => {
  try {
    const [firstName, ...lastNameArr] = profile.username.split(" ");
    const lastName = lastNameArr.join(" ");

    const payload = {
      firstName: firstName || "",
      lastName: lastName || "",
      phoneNumber: profile.phone,
      shortDescription: profile.tagline,
      fullDescription: profile.description,
      gender: profile.gender,
      country: profile.country,
      city: profile.city,
      hourlyRate: Number(profile.hourlyRate),
      currency: profile.currency,
    };

    await updateFreelancerProfile(payload);

    alert("Profile updated successfully ✅");
  } catch (error) {
    console.error("Failed to update profile", error);
    alert("Failed to update profile ❌");
  }
};
const refreshEducation = async () => {
  const res = await getFreelancerProfile();
  setEducationList(res.data.profile.education || []);
};


const handleSaveEducation = async () => {
  try {
    if (isEditingEdu) {
      await updateEducation(editingEduId, educationForm);
    } else {
      await addEducation(educationForm);
    }

    await refreshEducation(); // 🔥 THIS fixes undefined

    setEducationForm({
      collegeName: "",
      course: "",
      startYear: "",
      endYear: "",
      description: "",
    });

    setIsEditingEdu(false);
    setEditingEduId(null);
    setOpenEduModal(false);
  } catch (err) {
    console.error("Education save failed", err);
    alert("Failed to save education");
  }
};



const handleCloseEduModal = () => {
  setOpenEduModal(false);
  setIsEditingEdu(false);
  setEditingEduId(null);
  setEducationForm({
    collegeName: "",
    course: "",
    startYear: "",
    endYear: "",
    description: "",
  });
};




const handleProjectChange = (e) => {
  setProjectForm({
    ...projectForm,
    [e.target.name]: e.target.value,
  });
};


const handleProjectPhotos = (e) => {
  const files = Array.from(e.target.files);

  setProjectForm({
    ...projectForm,
    projectPhotos: files, // store File[]
  });
};

const buildProjectFormData = () => {
  const formData = new FormData();

  formData.append("projectName", projectForm.projectName);
  formData.append("shortDescription", projectForm.shortDescription);
  formData.append("projectLink", projectForm.projectLink);
  formData.append("startingPrice", projectForm.startingPrice);

  projectForm.projectPhotos.forEach((file) => {
    formData.append("projectPhotos", file); // backend should expect array
  });

  return formData;
};


const handleSaveProject = async () => {
  try {
    const formData = buildProjectFormData();

    if (isEditingProject) {
      await updateProject(editingProjectId, formData);
    } else {
      await addProject(formData);
    }

    // 🔥 refresh from backend
    const res = await getFreelancerProfile();
    setProjectList(res.data.profile.projects || []);

    setProjectForm({
      projectName: "",
      projectPhotos: [],
      shortDescription: "",
      projectLink: "",
      startingPrice: "",
    });

    setIsEditingProject(false);
    setEditingProjectId(null);
    setOpenProjectModal(false);
  } catch (err) {
    console.error("Project save failed", err);
    alert("Failed to save project");
  }
};


const handleDeleteProject = (index) => {
  setProjectList((prev) =>
    prev.filter((_, i) => i !== index)
  );
};



const handleCertChange = (e) => {
  setCertificationForm({
    ...certificationForm,
    [e.target.name]: e.target.value,
  });
};

const handleSaveCertification = async () => {
  try {
    if (isEditingCert) {
      await updateCertification(
        editingCertId,
        certificationForm
      );
    } else {
      await addCertification(certificationForm);
    }

    // 🔥 refresh from backend (safe)
    const res = await getFreelancerProfile();
    setCertificationList(res.data.profile.certifications || []);

    setCertificationForm({
      year: null,
      courseName: "",
      description: "",
    });

    setIsEditingCert(false);
    setEditingCertId(null);
    setIsCertPresent(false);
    setOpenCertModal(false);
  } catch (err) {
    console.error("Certification save failed", err);
    alert("Failed to save certification");
  }
};


const handleDeleteCertification = (index) => {
  setCertificationList((prev) =>
    prev.filter((_, i) => i !== index)
  );
};


const handleExpChange = (e) => {
  setExperienceForm({
    ...experienceForm,
    [e.target.name]: e.target.value,
  });
};

const handleAddExperience = () => {
  setExperienceList((prev) => [...prev, experienceForm]);

  setExperienceForm({
    companyName: "",
    designation: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  setOpenExpModal(false);
};

const handleSaveExperience = async () => {
  try {
    if (isEditingExp) {
      await updateExperience(editingExpId, experienceForm);
    } else {
      await addExperience(experienceForm);
    }

    // 🔥 Always refresh from server
    const res = await getFreelancerProfile();
    setExperienceList(res.data.profile.workExperience || []);

    setExperienceForm({
      companyName: "",
      designation: "",
      startYear: "",
      endYear: null,
      description: "",
    });

    setIsEditingExp(false);
    setEditingExpId(null);
    setIsExpPresent(false);
    setOpenExpModal(false);
  } catch (err) {
    console.error("Experience save failed", err);
    alert("Failed to save experience");
  }
};


const handleDeleteExperience = (index) => {
  setExperienceList((prev) =>
    prev.filter((_, i) => i !== index)
  );
};


  const handleEduChange = (e) => {
  setEducationForm({
    ...educationForm,
    [e.target.name]: e.target.value,
  });
};

// const handleAddEducation = () => {
//   setEducationList([...educationList, educationForm]);

//   setEducationForm({
//     collegeName: "",
//     course: "",
//     startYear: "",
//     endYear: "",
//     description: "",
//   });

//   setOpenEduModal(false);
// };

// const handleDeleteEducation = (index) => {
//   setEducationList(educationList.filter((_, i) => i !== index));
// };


 const handleAddSkill = () => {
  const trimmed = skillInput.trim();
  if (!trimmed) return;

  if (
    skills.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase()
    )
  ) {
    setSkillInput("");
    return;
  }

  setSkills([...skills, trimmed]);
  setSkillInput("");
};


const handleRemoveSkill = (skillToDelete) => {
  setSkills(skills.filter((s) => s !== skillToDelete));
};

const handleEditSkill = (skill) => {
  setSkillInput(skill);
  setSkills(skills.filter((s) => s !== skill));
};



  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveSkills = async () => {
  try {
    if (skills.length === 0) {
      alert("Please add at least one skill");
      return;
    }

    await updateFreelancerSkills(skills);

    alert("Skills updated successfully ✅");
  } catch (error) {
    console.error("Failed to update skills", error);
    alert("Failed to update skills ❌");
  }
};

const handleUploadProfileImage = async () => {
  if (!profileImageFile) {
    alert("Please select an image");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("selfiePhoto", profileImageFile);

    const res = await uploadProfilePhoto(formData);

    const imagePath = res.data.selfiePhoto.replace(/\\/g, "/");

    const finalUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${imagePath}`;

    setProfileImage(finalUrl);

    alert("Profile photo uploaded successfully ✅");
  } catch (err) {
    console.error("Upload failed", err);
    alert("Failed to upload profile photo ❌");
  }
};






  
  return (
    <Box sx={{ p: 1, minHeight: "100vh" }}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        My Profile
      </Typography>
      <Typography fontSize={13} color="text.secondary" mb={3}>
        Lorem ipsum dolor sit amet, consectetur.
      </Typography>

      <Box
        sx={{
          background: "#fff",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <Box mb={3}>
  <Typography fontSize={14} fontWeight={600} mb={1}>
    Profile Details
  </Typography>
  <Divider color="black" />
</Box>
        {/* ---------- Avatar + Actions ---------- */}
        
<Box display="flex" alignItems="center" gap={2} mb={4}>
  
  {/* Avatar with delete icon */}
  <Box position="relative">
    <Avatar
  src={profileImage}
  alt={profile.username}
  sx={{ width: 80, height: 80 }}
>
  {profile.username
    ?.split(" ")
    .map((n) => n[0])
    .join("")}
</Avatar>


    
  </Box>

  {/* Upload button + info */}
  <Box>
    <IconButton
      size="15px"
      sx={{
        mr: 2,
        
        bgcolor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        "&:hover": { bgcolor: "#f5f5f5" },
      }}
      onClick={() => {
        // handle delete profile image
        console.log("Delete profile image");
      }}
    >
      <DeleteOutlineIcon fontSize="small" />
    </IconButton>
    <Button
  variant="outlined"
  size="small"
  startIcon={<UploadIcon />}
  component="label"
>
  Upload Image
  <input
    hidden
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;

      setProfileImageFile(file);

      // instant preview (optional but recommended)
      setProfileImage(URL.createObjectURL(file));
    }}
  />
</Button>


    <Typography fontSize={12} color="text.secondary" mt={0.5}>
      Max file size is 1MB, Minimum dimension: 330×300 and suitable files are
      jpg & png
    </Typography>
  </Box>
</Box>

        {/* ---------- Form ---------- */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }} >
            <TextField
              label="Username"
              name="username"
              fullWidth
              size="small"
              value={profile.username}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Email Address"
              name="email"
              fullWidth
              size="small"
              value={profile.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Phone Number"
              name="phone"
              fullWidth
              size="small"
              value={profile.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
  <Box>
    {/* <Typography fontSize={12} mb={0.5}>
      Tagline
    </Typography> */}

    <TextareaAutosize
      minRows={2}
      placeholder="Enter your tagline"
      value={profile.tagline}
      onChange={(e) =>
        setProfile({ ...profile, tagline: e.target.value })
      }
      style={{
        width: "100%",
        fontSize: "14px",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #c4c4c4",
        resize: "both", // 👈 shows resize icon
        outline:"none"
      }}
    />
  </Box>
</Grid>


          <Grid size={{ xs: 12, md: 6 }}>
  <Box>
    {/* <Typography fontSize={12} mb={0.5}>
      Hourly Rate
    </Typography> */}

    <Box display="flex" gap={1}>
      {/* Currency */}
      <TextField
        label="Currency"
        size="small"
        fullWidth
        value={profile.currency}
        onChange={(e) =>
          setProfile({ ...profile, currency: e.target.value })
        }
      />

      {/* Rate */}
      <TextField
        label="Rate"
        size="small"
        fullWidth
        value={profile.hourlyRate}
        onChange={(e) =>
          setProfile({ ...profile, hourlyRate: e.target.value })
        }
      />
    </Box>
  </Box>
</Grid>


          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small">
              <Select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">Gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small">
              <Select
                name="specialization"
                value={profile.specialization}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">Specialization</MenuItem>
                <MenuItem value="frontend">Frontend</MenuItem>
                <MenuItem value="backend">Backend</MenuItem>
                <MenuItem value="design">Design</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small">
              <Select
                name="type"
                value={profile.type}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">Type</MenuItem>
                <MenuItem value="freelancer">Freelancer</MenuItem>
                <MenuItem value="agency">Agency</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Country"
    size="small"
    fullWidth
    value={profile.country}
    onChange={(e) =>
      setProfile({ ...profile, country: e.target.value })
    }
  />
</Grid>


          <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="City"
    size="small"
    fullWidth
    value={profile.city}
    onChange={(e) =>
      setProfile({ ...profile, city: e.target.value })
    }
  />
</Grid>


          <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    label="Language"
    size="small"
    fullWidth
    value={profile.language}
    onChange={(e) =>
      setProfile({ ...profile, language: e.target.value })
    }
  />
</Grid>


          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth size="small">
              <Select
                name="languageLevel"
                value={profile.languageLevel}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="">Language Level</MenuItem>
                <MenuItem value="basic">Basic</MenuItem>
                <MenuItem value="fluent">Fluent</MenuItem>
                <MenuItem value="native">Native</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
  <Box>
    <Typography fontSize={12} mb={0.5}>
      Introduce Yourself
    </Typography>

    <TextareaAutosize
      minRows={4}
      placeholder="Write something about yourself..."
      value={profile.description}
      onChange={(e) =>
        setProfile({ ...profile, description: e.target.value })
      }
      style={{
        width: "100%",
        fontSize: "14px",
        padding: "10px",
        borderRadius: "4px",
        border: "1px solid #c4c4c4",
        resize: "both", // 👈 drag handle appears
        outline:"none"
      }}
    />
  </Box>
</Grid>


          <Grid item xs={12}>
            <Button   variant="contained"
  color="success"
  onClick={handleSaveProfile}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* ---------- Skills Section ---------- */}
<Box mt={4}>
  

  <Box
    sx={{
      border: "1px solid #e0e0e0",
      borderRadius: "6px",
      p: 2,
      backgroundColor: "#fafafa",
    }}
  >
    <Typography fontSize={14} fontWeight={600} mb={1}>
    Skills
  </Typography>
  <Divider color="black" />
    {/* Input + Add */}
    <Box display="flex" gap={2} mb={2} mt={3} width={550}>
      <TextField
        placeholder="Add a skill (e.g. React, Node.js)"
        size="small"
        fullWidth
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddSkill();
          }
        }}
      />

      <IconButton
        onClick={handleAddSkill}
        sx={{
          border: "1px solid #1976d2",
          borderRadius: "6px",
          px: 1.5,
        }}
      >
        <AddIcon color="primary" />
      </IconButton>
    </Box>

    {/* Skill chips */}
    <Box display="flex" gap={1} flexWrap="wrap">
      {skills.map((skill, index) => (
        <Chip
           key={index}
  label={skill}
  onClick={() => handleEditSkill(skill)}
  onDelete={() => handleRemoveSkill(skill)}
  sx={{
    backgroundColor: "#e3f2fd",
    fontWeight: 500,
    cursor: "pointer",
    "& .MuiChip-deleteIcon": {
      color: "#1976d2",
    },
  }}
        />
      ))}
    </Box>
    <Box mt={3}>
  <Button
    variant="contained"
    color="primary"
    onClick={handleSaveSkills}
  >
    Save Skills
  </Button>
</Box>

  </Box>
</Box>

{/* ---------- Education Section ---------- */}
<Box
  sx={{
    background: "#fff",
    borderRadius: 2,
    p: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    mt: 4,
  }}
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mb={1}
  >
    <Typography fontSize={14} fontWeight={600}>
      Education
    </Typography>

    <Button size="small" startIcon={<AddIcon />} onClick={() => setOpenEduModal(true)}>
      Add Education
    </Button>
  </Box>

  <Divider />

  <Box mt={3}>
    {[...educationList]
  .sort((a, b) => {
    const yearA =
      a.endYear === null
        ? new Date().getFullYear() + 1
        : a.endYear;

    const yearB =
      b.endYear === null
        ? new Date().getFullYear() + 1
        : b.endYear;

    return yearB - yearA; // descending
  })
  .map((edu, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          gap: 2,
          position: "relative",
          mb: 4,
        }}
      >
        {/* LEFT TIMELINE */}
        <Box
          sx={{
            position: "relative",
            width: 32,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#f3fffb",
              color: "#20b486",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <SchoolIcon fontSize="small" />
          </Box>

          {index !== educationList.length - 1 && (
            <Box
              sx={{
                position: "absolute",
                top: 36,
                bottom: -36,
                left: "50%",
                transform: "translateX(-50%)",
                borderLeft: "2px dashed #20b486",
              }}
            />
          )}
        </Box>

        {/* RIGHT CONTENT */}
        <Box flex={1} position="relative">
          <Box sx={{
      position: "absolute",
      top: 0,
      right: 0,
      display: "flex",
      gap: 1,
    }}>
            <IconButton
      size="small"
      sx={{
        bgcolor: "#f5f5f5",
        "&:hover": { bgcolor: "#e0e0e0" },
      }}
      onClick={() => {
  setEducationForm({
    collegeName: edu.collegeName,
    course: edu.course,
    startYear: edu.startYear,
    endYear: edu.endYear,
    description: edu.description,
  });

  setEditingEduId(edu._id);
  setIsEditingEdu(true);
  setOpenEduModal(true);
}}

    >
      <EditIcon fontSize="small" />
    </IconButton>

    <IconButton
      size="small"
      sx={{
        bgcolor: "#f5f5f5",
        "&:hover": { bgcolor: "#ffd6d6" },
      }}
      onClick={async () => {
  if (!confirm("Delete this education?")) return;

  try {
    await deleteEducation(edu._id);
    setEducationList((prev) =>
      prev.filter((e) => e._id !== edu._id)
    );
  } catch (err) {
    console.error("Delete failed", err);
    alert("Failed to delete education");
  }
}}

    >
      <DeleteIcon fontSize="small" />
    </IconButton>
          </Box>
          <Chip
            label={`${edu.startYear} – ${edu.endYear ?? "Present"}`}
            sx={{
              backgroundColor: "#ffe7dd",
              fontSize: 13,
              mb: 1,
            }}
          />

          <Typography fontSize={18} fontWeight={600}>
            {edu.course}
          </Typography>

          <Typography fontSize={14} color="#18a561" mb={0.5}>
            {edu.collegeName}
          </Typography>

          <Typography fontSize={14} color="text.secondary">
            {edu.description}
          </Typography>

          
        </Box>
      </Box>
    ))}
  </Box>
</Box>
<Dialog
  open={openEduModal} onClose={handleCloseEduModal}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>{isEditingEdu ? "Edit Education" : "Add Education"}</DialogTitle>

  <DialogContent dividers>
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="College Name"
        name="collegeName"
        size="small"
        value={educationForm.collegeName}
        onChange={handleEduChange}
      />

      <TextField
        label="Course"
        name="course"
        size="small"
        value={educationForm.course}
        onChange={handleEduChange}
      />

      <Box display="flex" gap={2}>
  <DatePicker
    views={["year"]}
    label="Start Year"
    value={
      educationForm.startYear
        ? dayjs().year(educationForm.startYear)
        : null
    }
    onChange={(value) =>
      setEducationForm({
        ...educationForm,
        startYear: value ? value.year() : "",
      })
    }
    slotProps={{
      textField: { size: "small", fullWidth: true },
    }}
  />

  <DatePicker
  views={["year"]}
  label="End Year"
  disabled={isPresent}
  value={
    educationForm.endYear
      ? dayjs().year(educationForm.endYear)
      : null
  }
  onChange={(value) =>
    setEducationForm({
      ...educationForm,
      endYear: value ? value.year() : null,
    })
  }
  slotProps={{
    textField: { size: "small", fullWidth: true },
  }}
/>

</Box>
<FormControlLabel
  control={
    <Checkbox
      checked={isPresent}
      onChange={(e) => {
        const checked = e.target.checked;
        setIsPresent(checked);

        if (checked) {
          setEducationForm({
            ...educationForm,
            endYear: null,
          });
        }
      }}
    />
  }
  label="Present"
/>



      <TextField
        label="Description"
        name="description"
        multiline
        rows={3}
        value={educationForm.description}
        onChange={handleEduChange}
      />
    </Box>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenEduModal(false)}>Cancel</Button>
    <Button variant="contained" onClick={handleSaveEducation}>
      {isEditingEdu ? "Update" : "Save"}
    </Button>
  </DialogActions>
</Dialog>

<Box
  sx={{
    background: "#fff",
    borderRadius: 2,
    p: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    mt: 4,
  }}
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mb={1}
  >
    <Typography fontSize={14} fontWeight={600}>
      Experience
    </Typography>

    <Button
      size="small"
      startIcon={<AddIcon />}
      onClick={() => setOpenExpModal(true)}
    >
      Add Experience
    </Button>
  </Box>

  <Divider />

  <Box mt={3}>
    {[...experienceList]
  .sort((a, b) => {
    const yearA =
      a.endYear === null
        ? new Date().getFullYear() + 1
        : a.endYear;

    const yearB =
      b.endYear === null
        ? new Date().getFullYear() + 1
        : b.endYear;

    return yearB - yearA;
  })
  .map((exp, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          gap: 2,
          position: "relative",
          mb: 4,
        }}
      >
        {/* LEFT TIMELINE */}
        <Box
          sx={{
            position: "relative",
            width: 32,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "#eef6ff",
              color: "#1976d2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            💼
          </Box>

          {index !== experienceList.length - 1 && (
            <Box
              sx={{
                position: "absolute",
                top: 36,
                bottom: -36,
                left: "50%",
                transform: "translateX(-50%)",
                borderLeft: "2px dashed #1976d2",
              }}
            />
          )}
        </Box>

        {/* RIGHT CONTENT */}
        <Box flex={1} position="relative">
          {/* Actions */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton
              size="small"
              sx={{ bgcolor: "#f5f5f5" }}
              onClick={() => {
  setExperienceForm({
    companyName: exp.companyName,
    designation: exp.designation,
    startYear: exp.startYear,
    endYear: exp.endYear,
    description: exp.description,
  });

  setIsExpPresent(exp.endYear === null);
  setEditingExpId(exp._id);
  setIsEditingExp(true);
  setOpenExpModal(true);
}}

            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              sx={{
                bgcolor: "#f5f5f5",
                "&:hover": { bgcolor: "#ffd6d6" },
              }}
              onClick={async () => {
  if (!confirm("Delete this experience?")) return;

  try {
    await deleteExperience(exp._id);

    setExperienceList((prev) =>
      prev.filter((e) => e._id !== exp._id)
    );
  } catch (err) {
    console.error("Delete experience failed", err);
    alert("Failed to delete experience");
  }
}}

            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>

          <Chip
            label={`${exp.startYear} – ${exp.endYear ?? "Present"}`}
            sx={{
              backgroundColor: "#e3f2fd",
              fontSize: 13,
              mb: 1,
            }}
          />

          <Typography fontSize={18} fontWeight={600}>
            {exp.designation}
          </Typography>

          <Typography fontSize={14} color="#1976d2" mb={0.5}>
            {exp.companyName}
          </Typography>

          <Typography fontSize={14} color="text.secondary">
            {exp.description}
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
</Box>
<Dialog
  open={openExpModal}
  onClose={() => setOpenExpModal(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Add Experience</DialogTitle>

  <DialogContent dividers>
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Company Name"
        name="companyName"
        size="small"
        value={experienceForm.companyName}
        onChange={handleExpChange}
      />

      <TextField
        label="Designation"
        name="designation"
        size="small"
        value={experienceForm.designation}
        onChange={handleExpChange}
      />

      <Box display="flex" gap={2}>
  <DatePicker
    views={["year"]}
    label="Start Year"
    value={
      experienceForm.startYear
        ? dayjs().year(experienceForm.startYear)
        : null
    }
    onChange={(value) =>
      setExperienceForm({
        ...experienceForm,
        startYear: value ? value.year() : "",
      })
    }
    slotProps={{
      textField: { size: "small", fullWidth: true },
    }}
  />

 <DatePicker
  views={["year"]}
  label="End Year"
  disabled={isExpPresent}
  value={
    experienceForm.endYear
      ? dayjs().year(experienceForm.endYear)
      : null
  }
  onChange={(value) =>
    setExperienceForm({
      ...experienceForm,
      endYear: value ? value.year() : null,
    })
  }
  slotProps={{
    textField: { size: "small", fullWidth: true },
  }}
/>


</Box>

      <FormControlLabel
  control={
    <Checkbox
      checked={isExpPresent}
      onChange={(e) => {
        const checked = e.target.checked;
        setIsExpPresent(checked);

        if (checked) {
          setExperienceForm({
            ...experienceForm,
            endYear: null,
          });
        }
      }}
    />
  }
  label="Present"
/>


      <TextField
        label="Description"
        name="description"
        multiline
        rows={3}
        value={experienceForm.description}
        onChange={handleExpChange}
      />
    </Box>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenExpModal(false)}>
      Cancel
    </Button>
    <Button variant="contained" onClick={handleSaveExperience}>
      Save
    </Button>
  </DialogActions>
</Dialog>

<Box
  sx={{
    background: "#fff",
    borderRadius: 2,
    p: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    mt: 4,
  }}
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mb={1}
  >
    <Typography fontSize={14} fontWeight={600}>
      Certifications
    </Typography>

    <Button
      size="small"
      startIcon={<AddIcon />}
      onClick={() => setOpenCertModal(true)}
    >
      Add Certification
    </Button>
  </Box>

  <Divider />

  <Box mt={3}>
    {[...certificationList]
  .sort((a, b) => {
    const yearA =
      a.year === null
        ? new Date().getFullYear() + 1
        : a.year;

    const yearB =
      b.year === null
        ? new Date().getFullYear() + 1
        : b.year;

    return yearB - yearA;
  })
  .map((cert, index) => (
      <Box
        key={index}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          p: 2,
          mb: 2,
          position: "relative",
          backgroundColor: "#fafafa",
        }}
      >
        {/* Actions */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton size="small" sx={{ bgcolor: "#f5f5f5" }} onClick={() => {
  setCertificationForm({
    year: cert.year,
    courseName: cert.courseName,
    description: cert.description,
  });

  setIsCertPresent(cert.year === null);
  setEditingCertId(cert._id);
  setIsEditingCert(true);
  setOpenCertModal(true);
}}
>
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              bgcolor: "#f5f5f5",
              "&:hover": { bgcolor: "#ffd6d6" },
            }}
            onClick={async () => {
  if (!confirm("Delete this certification?")) return;

  try {
    await deleteCertification(cert._id);
    setCertificationList((prev) =>
      prev.filter((c) => c._id !== cert._id)
    );
  } catch (err) {
    console.error("Delete certification failed", err);
    alert("Failed to delete certification");
  }
}}

          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Year */}
        <Chip
          label={cert.year ?? "Present"}
          sx={{
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            fontSize: 12,
            mb: 1,
          }}
        />

        <Typography fontSize={16} fontWeight={600}>
          {cert.courseName}
        </Typography>

        <Typography fontSize={14} color="text.secondary">
          {cert.description}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>
<Dialog
  open={openCertModal}
  onClose={() => setOpenCertModal(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Add Certification</DialogTitle>

  <DialogContent dividers>
    <Box display="flex" flexDirection="column" gap={2}>
      <DatePicker
  views={["year"]}
  label="Year"
  disabled={isCertPresent}
  value={
    certificationForm.year
      ? dayjs().year(certificationForm.year)
      : null
  }
  onChange={(value) =>
    setCertificationForm({
      ...certificationForm,
      year: value ? value.year() : null,
    })
  }
  slotProps={{
    textField: { size: "small", fullWidth: true },
  }}
/>
<FormControlLabel
  control={
    <Checkbox
      checked={isCertPresent}
      onChange={(e) => {
        const checked = e.target.checked;
        setIsCertPresent(checked);

        if (checked) {
          setCertificationForm({
            ...certificationForm,
            year: null,
          });
        }
      }}
    />
  }
  label="Present"
 />


      <TextField
        label="Course Name"
        name="courseName"
        size="small"
        value={certificationForm.courseName}
        onChange={handleCertChange}
      />

      <TextField
        label="Description"
        name="description"
        multiline
        rows={3}
        value={certificationForm.description}
        onChange={handleCertChange}
      />
    </Box>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenCertModal(false)}>
      Cancel
    </Button>
    <Button
      variant="contained"
      onClick={handleSaveCertification}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

<Box
  sx={{
    background: "#fff",
    borderRadius: 2,
    p: 3,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    mt: 4,
  }}
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mb={1}
  >
    <Typography fontSize={14} fontWeight={600}>
      Projects
    </Typography>

    <Button
      size="small"
      startIcon={<AddIcon />}
      onClick={() => setOpenProjectModal(true)}
    >
      Add Project
    </Button>
  </Box>

  <Divider />

  <Box mt={3}>
    {projectList.map((project, index) => (
      <Box
        key={index}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          p: 2,
          mb: 2,
          position: "relative",
          backgroundColor: "#fafafa",
        }}
      >
        {/* Actions */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton size="small" sx={{ bgcolor: "#f5f5f5" }} onClick={() => {
  setProjectForm({
    projectName: project.projectName,
    projectPhotos: [], // empty by default
    shortDescription: project.shortDescription,
    projectLink: project.projectLink,
    startingPrice: project.startingPrice,
  });

  setEditingProjectId(project._id);
  setIsEditingProject(true);
  setOpenProjectModal(true);
}}
 >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            sx={{
              bgcolor: "#f5f5f5",
              "&:hover": { bgcolor: "#ffd6d6" },
            }}
            onClick={async () => {
  if (!confirm("Delete this project?")) return;

  try {
    await deleteProject(project._id);
    setProjectList((prev) =>
      prev.filter((p) => p._id !== project._id)
    );
  } catch (err) {
    console.error("Delete project failed", err);
    alert("Failed to delete project");
  }
}}

          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Photos */}
        <Box display="flex" gap={1} mb={1}>
  {project.projectPhotos.map((photo, i) => (
    <Box
      key={i}
      component="img"
      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${photo.replace(/\\/g, "/")}`}
      sx={{
        width: 80,
        height: 60,
        objectFit: "cover",
        borderRadius: 1,
        border: "1px solid #ddd",
      }}
    />
  ))}
</Box>


        <Typography fontSize={16} fontWeight={600}>
          {project.projectName}
        </Typography>

        <Typography fontSize={14} color="text.secondary" mb={0.5}>
          {project.shortDescription}
        </Typography>

        <Typography fontSize={13} color="primary">
          {project.projectLink}
        </Typography>

        <Typography fontSize={13} fontWeight={600} mt={0.5}>
          Starting at {project.startingPrice}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>
<Dialog
  open={openProjectModal}
  onClose={() => setOpenProjectModal(false)}
  fullWidth
  maxWidth="sm"
>
  <DialogTitle>Add Project</DialogTitle>

  <DialogContent dividers>
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Project Name"
        name="projectName"
        size="small"
        value={projectForm.projectName}
        onChange={handleProjectChange}
      />

      <Button variant="outlined" component="label">
        Upload Project Photos
        <input
          hidden
          multiple
          type="file"
          accept="image/*"
          onChange={handleProjectPhotos}
        />
      </Button>

      <TextField
        label="Short Description"
        name="shortDescription"
        multiline
        rows={3}
        value={projectForm.shortDescription}
        onChange={handleProjectChange}
      />

      <TextField
        label="Project Link"
        name="projectLink"
        size="small"
        value={projectForm.projectLink}
        onChange={handleProjectChange}
      />

      <TextField
        label="Starting Price"
        name="startingPrice"
        size="small"
        value={projectForm.startingPrice}
        onChange={handleProjectChange}
      />
    </Box>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenProjectModal(false)}>
      Cancel
    </Button>
    <Button variant="contained" onClick={handleSaveProject}>
      Save
    </Button>
  </DialogActions>
</Dialog>






    </Box>
  );
}
