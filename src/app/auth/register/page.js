"use client";
export const dynamic = "force-dynamic";
import axios from "axios";

import { useState, useEffect } from "react";
import "@/app/styles/register.css";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { auth } from "@/firebase/firebase.js";
import { 
  createUserWithEmailAndPassword,
  sendEmailVerification,
  reload, 
  updateEmail
} from "firebase/auth";
import { registerCustomer, registerFreelancer, getFreelancerCategories, registerCompany, sendEmailOtp, verifyEmailOtp, getFreelancerSubCategories } from "@/app/api/authRegisterApi";
// import { registerCompany } from "@/app/api/registerCompany";

import React from 'react'
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Modal,
  CircularProgress,
} from "@mui/material";
// import Image from "next/image";

import Image from "next/image";
import { googleRegister, appleRegister } from "@/app/authProviders";
// import { registerFreelancer, registerFreelancerBase } from "@/app/api/register/registerFreelancer";


const countryCodes = [
  { code: "+1", country: "USA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "India" },
  { code: "+61", country: "Australia" },
  { code: "+971", country: "UAE" },
];

const Register = () => {


    const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    primaryPhone: "",
    altPhone: "",
    countryPrimary: "+91",
    countryAlt: "+91",
    email: "",
    role: "",
    otp: "",
    password: "",
    confirmPassword:"",
  });
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({});
  const [otpPopup, setOtpPopup] = useState(false);

const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const [otpLoading, setOtpLoading] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("");
const [subCategories, setSubCategories] = useState([]);
const [selectedSubCategory, setSelectedSubCategory] = useState("");

const [freelancerErrors, setFreelancerErrors] = useState({});
const [employerErrors, setEmployerErrors] = useState({});

const [gstFileName, setGstFileName] = useState("");
const [gstUploadProgress, setGstUploadProgress] = useState(0);

const [addrProof1Name, setAddrProof1Name] = useState("");
const [addrProof2Name, setAddrProof2Name] = useState("");
const [addrProof1Progress, setAddrProof1Progress] = useState(0);
const [addrProof2Progress, setAddrProof2Progress] = useState(0);

const [verifiedEmail, setVerifiedEmail] = useState(null);
const isCustomer = formData.role === "I am a Customer";

useEffect(() => {
  const loadCategories = async () => {
    const result = await getFreelancerCategories();

    console.log("CATEGORY API RESULT 👉", result);

    if (result.success) {
      console.log("RAW CATEGORIES 👉", result.data);
      setCategories(result.data.filter(cat => cat.isActive));
    } else {
      alert(result.message);
    }
  };

  loadCategories();
}, []);






function CircularProgressWithLabel({ value }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={value} />
      <Box
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize={12} fontWeight={600}>
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}



  // const [userId, setUserId] = useState(null);


//   const uploadImage = async (file) => {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "kyc_unsigned");

//   const res = await fetch("https://api.cloudinary.com/v1_1/dtttly6es/image/upload", {
//     method: "POST",
//     body: data
//   });

  

//   const json = await res.json();
//   return json.secure_url;
// };

// const uploadFile = async (file) => {
//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", "kyc_unsigned");

//   const res = await fetch(
//     "https://api.cloudinary.com/v1_1/dtttly6es/upload",
//     { method: "POST", body: data }
//   );

//   const json = await res.json();

//   if (!json.secure_url) {
//     console.error("Cloudinary Upload Error:", json);
//     throw new Error("Upload failed");
//   }

//   return json.secure_url;
// };


const submitCustomerRegistration = async () => {
  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.primaryPhone,
    altPhoneNumber: formData.altPhone || "",
    password: formData.password,
  };

  try {
    const result = await registerCustomer(payload);
    return result;
  } catch (error) {
    console.error("Customer registration error:", error);
    return { success: false, message: "Registration failed" };
  }
};




 const submitFreelancerRegistration = async () => {
  const fd = new FormData();

  // -------- BASIC DETAILS --------
  fd.append("firstName", formData.firstName);
  fd.append("lastName", formData.lastName);
  fd.append("email", formData.email);
  fd.append("phoneNumber", formData.primaryPhone);
  fd.append("password", formData.password);


  fd.append("panOrDLType", freelancer.idType1);               // "PAN" | "DL"
fd.append("aadhaarOrPassportType", freelancer.idType2);    // "AADHAAR" | "PASSPORT"


    // -------- ID 1 : PAN or DL --------
  fd.append("panOrDLNumber", freelancer.idNumber1);
  fd.append("panOrDLFront", freelancer.idFront1);
  fd.append("panOrDLBack", freelancer.idBack1);

  // -------- ID 2 : Aadhaar or Passport --------
  fd.append("aadhaarOrPassportNumber", freelancer.idNumber2);
  fd.append("aadhaarOrPassportFront", freelancer.idFront2);
  fd.append("aadhaarOrPassportBack", freelancer.idBack2);


  // -------- DOCUMENT NUMBERS --------
  // fd.append("panOrDLNumber", freelancer.panNumber);
  // fd.append("aadhaarOrPassportNumber", freelancer.aadharNumber);

  // -------- FILES --------
  // fd.append("panOrDLFront", freelancer.panFront);
  // fd.append("panOrDLBack", freelancer.panBack);

  // fd.append("aadhaarOrPassportFront", freelancer.aadharFront);
  // fd.append("aadhaarOrPassportBack", freelancer.aadharBack);

  fd.append("selfiePhoto", freelancer.selfie);
  fd.append("categoryId", selectedCategory);
fd.append("subCategoryId", selectedSubCategory);


  // Multiple experience documents
  freelancer.experienceCertificates.forEach((file) => {
    fd.append("experienceDocs", file);
  });

  // -------- SKILL --------
  fd.append("skill", skill); // "React, Node"

  // OPTIONAL (skip if empty)
  if (freelancer.linkedin) {
    fd.append("linkedin", freelancer.linkedin);
  }

  const result = await registerFreelancer(fd);
  return result;
};



      const formatRole = (role) => {
  switch (role) {
    case "I am a Customer":
      return "client";

    case "I am a Freelancer":
      return "freelancer";

    case "I am an Employer":
      return "organization";

    default:
      return "client";
  }
};

useEffect(() => {
  const loadCategories = async () => {
    const result = await getFreelancerCategories();

    if (result.success) {
      setCategories(result.data.filter(cat => cat.isActive));
    } else {
      alert(result.message);
    }
  };

  loadCategories();
}, []);

useEffect(() => {
  if (
    otpVerified &&
    verifiedEmail &&
    formData.email !== verifiedEmail
  ) {
    setOtpVerified(false);
    setOtpSent(false);
    setVerifiedEmail(null);
  }
}, [formData.email]);






const [freelancer, setFreelancer] = useState({
  // bio: "",
  // experienceYears: "",
  // hourlyRate: "",
  // fullAddress: "",
  linkedin: "",
  // portfolio: "",
  skills: null,
  idType1: "",            // "PAN" | "DL"
  idNumber1: "",
  idFront1: null,
  idBack1: null,

  idType2: "",            // "AADHAAR" | "PASSPORT"
  idNumber2: "",
  idFront2: null,
  idBack2: null, 
  experienceCertificates: [],
  // aadharNumber: "",
  // aadharFront: null,
  // aadharBack: null,
  // panNumber: "",
  // panFront: null,
  // panBack: null,
  selfie: null,
});
const [employer, setEmployer] = useState({
  orgType: "",
  orgName: "",

  idType1: "",
  idNumber1: "",
  directorFront1: null,
  directorBack1: null,
  directorFront1Preview: "",
  directorBack1Preview: "",

  idType2: "",
  idNumber2: "",
  directorFront2: null,
  directorBack2: null,
  directorFront2Preview: "",
  directorBack2Preview: "",

  logo: null,
  logoPreview: "",

  companyPhoto1: null,
  companyPhoto1Preview: "",
  companyPhoto2: null,
  companyPhoto2Preview: "",

  gstNumber: "",
  gstDocument: null,

  fullAddress: "",
  addressProof1: null,
  addressProof2: null,

  businessName: "",
  businessEmail: "",
  businessPhone: "",
  businessWebsite: "",
  experience: "",
  companyRegistrationType: "",
  linkedin: "",
});

const [slide, setSlide] = useState(0);



const updateFreelancer = (key, value) => {
  setFreelancer(prev => ({ ...prev, [key]: value }));
};

const updateEmployer = (key, value) => {
  setEmployer(prev => ({ ...prev, [key]: value }));
};

const getIdLabel = (type) => {
  switch (type) {
    case "PAN":
      return "PAN Card Number";
    case "DL":
      return "Driving License Number";
    case "AADHAAR":
      return "Aadhaar Number";
    case "PASSPORT":
      return "Passport Number";
    default:
      return "ID Number";
  }
};


const handleProviderAuth = async (providerData) => {
  try {
    const user = auth.currentUser;

    setFormData(prev => ({
      ...prev,
      firstName: providerData.name?.split(" ")[0] || "",
      lastName: providerData.name?.split(" ").slice(1).join(" ") || "",
      email: providerData.email,
    }));

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      setOtpPopup(true);
      setOtpSent(true);
      return alert("Verification mail sent. Please check inbox.");
    } 

    setOtpVerified(true);
    alert("Email already verified ✔");

  } catch (error) {
    console.log(error);
    alert("Something went wrong.");
  }
};



const handleFileUpload = (e, field) => {
  const file = e.target.files[0];
  if(file) {
    // Later: upload to Firebase or S3
    console.log(`File stored for ${field}:`, file);
  }
};

const handleFreelancerSubmit = async () => {

  if (!validateFreelancerForm()) {
    // alert("Please fill all required freelancer details");
    return;
  }
  const result = await submitFreelancerRegistration();

  if (!result.success) {
    alert(result.message);
    return;
  }

  alert("Freelancer registered successfully!");
};


const handleGoogleSignUp = async () => {
  try {
    const data = await googleRegister();
    await handleProviderAuth(data);
  } catch (error) {
    alert("Google Sign-Up failed");
  }
};

const handleAppleSignUp = async () => {
  try {
    const data = await appleRegister();
    await handleProviderAuth(data);
  } catch (error) {
    alert("Apple Sign-Up failed");
  }
};




const handleCompanySubmit = async () => {

    if (!validateEmployerForm()) {
    // alert("Please fill all required company details");
    return;
  }
  const result = await submitCompanyRegistration();

  if (!result.success) {
    alert(result.message);
    return;
  }

  alert("Company registered successfully!");
};






const submitCompanyRegistration = async () => {
  const fd = new FormData();

  // -------- BASIC --------
  fd.append("firstName", formData.firstName);
  fd.append("lastName", formData.lastName);
  fd.append("email", formData.email);
  fd.append("phoneNumber", formData.primaryPhone);
  fd.append("altPhoneNumber", formData.altPhone || "");
  fd.append("password", formData.password);

  // -------- COMPANY ID (PAN / DL) --------
  fd.append("companypanOrDLNumber", employer.idNumber1);

  if (employer.directorFront1)
    fd.append("companypanOrDLFront", employer.directorFront1);

  if (employer.directorBack1)
    fd.append("companypanOrDLBack", employer.directorBack1);

  // -------- COMPANY ID (AADHAAR / PASSPORT) --------
  fd.append("companyaadhaarOrPassportNumber", employer.idNumber2);

  if (employer.directorFront2)
    fd.append("companyaadhaarOrPassportFront", employer.directorFront2);

  if (employer.directorBack2)
    fd.append("companyaadhaarOrPassportBack", employer.directorBack2);

  // -------- LOGO & PHOTOS --------
  if (employer.logo)
    fd.append("logoPhoto", employer.logo);

  if (employer.companyPhoto1)
    fd.append("companyPhotos", employer.companyPhoto1);

  if (employer.companyPhoto2)
    fd.append("companyPhotos", employer.companyPhoto2);

  // -------- GST --------
  fd.append("gstNumber", employer.gstNumber);

  if (employer.gstDocument)
    fd.append("gstDocument", employer.gstDocument);

  // -------- ADDRESS --------
  fd.append("fullAddress", employer.fullAddress);

  if (employer.addressProof1)
    fd.append("addressProof1", employer.addressProof1);

  if (employer.addressProof2)
    fd.append("addressProof2", employer.addressProof2);

  // -------- BUSINESS DETAILS --------
  fd.append("businessEmail", employer.businessEmail);
  fd.append("businessPhone", employer.businessPhone);
  fd.append("businessWebsite", employer.businessWebsite);
  fd.append("businessName", employer.orgName);
  fd.append("companyRegistrationType", employer.orgType);
  fd.append("experience", employer.experience);

  // OPTIONAL
  if (employer.linkedin)
    fd.append("companylinkedin", employer.linkedin);

  return await registerCompany(fd);
};



  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
      
    
  };

  const validateForm = () => {
    let e = {};

    if (!formData.firstName) e.firstName = "Required";
    if (!formData.lastName) e.lastName = "Required";
    if (!formData.email) e.email = "Required";
    if (!formData.primaryPhone) e.primaryPhone = "Required";
    if (!formData.role) e.role = "Required";
      if (!formData.password) e.password = "Enter password";
  else if (formData.password.length < 6) e.password = "Password must be at least 6 characters";

  if (!formData.confirmPassword) e.confirmPassword = "Confirm your password";
  else if (formData.confirmPassword !== formData.password)
    e.confirmPassword = "Passwords do not match";
    if (!otpVerified) e.otp = "Verify your email to continue";

    setErrors(e);

    return Object.keys(e).length === 0;
  };


  const validateFreelancerForm = () => {
  let e = {};

   // -------- ID 1 --------
  if (!freelancer.idType1) e.idType1 = "Select ID type";
  if (!freelancer.idNumber1) e.idNumber1 = "Required";
  if (!freelancer.idFront1) e.idFront1 = "Front image required";
  if (!freelancer.idBack1) e.idBack1 = "Back image required";

  // -------- ID 2 --------
  if (!freelancer.idType2) e.idType2 = "Select ID type";
  if (!freelancer.idNumber2) e.idNumber2 = "Required";
  if (!freelancer.idFront2) e.idFront2 = "Front image required";
  if (!freelancer.idBack2) e.idBack2 = "Back image required";

  // -------- Certificates --------
  if (!freelancer.experienceCertificates?.length) {
    e.experienceCertificates = "Upload at least one certificate";
  }

  // -------- Selfie --------
  if (!freelancer.selfie) e.selfie = "Selfie is required";

  // -------- Category --------
  if (!selectedCategory) e.category = "Select category";
  if (!selectedSubCategory) e.subCategory = "Select sub category";

  // -------- Skills --------
  if (!skill.trim()) e.skill = "Enter at least one skill";

  setFreelancerErrors(e);
  return Object.keys(e).length === 0;
};


const validateEmployerForm = () => {
  let e = {};

  // -------- Org --------
  if (!employer.orgType) e.orgType = "Select organization type";
  if (!employer.orgName) e.orgName = "Organization name required";

  // -------- Director ID 1 --------
  if (!employer.idType1) e.idType1 = "Select ID type";
  if (!employer.idNumber1) e.idNumber1 = "ID number required";
  if (!employer.directorFront1) e.directorFront1 = "Front image required";
  if (!employer.directorBack1) e.directorBack1 = "Back image required";

  // -------- Director ID 2 --------
  if (!employer.idType2) e.idType2 = "Select ID type";
  if (!employer.idNumber2) e.idNumber2 = "ID number required";
  if (!employer.directorFront2) e.directorFront2 = "Front image required";
  if (!employer.directorBack2) e.directorBack2 = "Back image required";

  // -------- Logo --------
  if (!employer.logo) e.logo = "Company logo required";

  // -------- GST --------
  if (!employer.gstNumber) e.gstNumber = "GST number required";
  if (!employer.gstDocument) e.gstDocument = "GST document required";

  // -------- Address --------
  if (!employer.fullAddress) e.fullAddress = "Address required";
  if (!employer.addressProof1) e.addressProof1 = "Atleast one Address proof required";

  // -------- Business --------
  if (!employer.businessEmail) e.businessEmail = "Business email required";
  if (!employer.businessWebsite) e.businessWebsite = "Website required";

  setEmployerErrors(e);
  return Object.keys(e).length === 0;
};



const handleSendOtp = async () => {
  if (!formData.email) {
    alert("Enter email first");
    return;
  }

  try {
    const res = await sendEmailOtp(formData.email);

    if (res.data?.success) {
      setOtpPopup(true);
      alert("OTP sent to your email");
    } else {
      alert(res.data?.message || "Failed to send OTP");
    }
  } catch (err) {
    console.error(err);
    alert("Error sending OTP");
  }
};

const handleOtpVerify = async () => {
  const code = otp.join("");

  if (code.length !== 6) {
    alert("Enter 6 digit OTP");
    return;
  }

  try {
    setOtpLoading(true);

    const res = await verifyEmailOtp(formData.email, code);

    if (res.data?.success) {
      setOtpVerified(true);
      setVerifiedEmail(formData.email);
      setOtpPopup(false);
      alert("Email verified successfully ✔");
    } else {
      alert(res.data?.message || "Invalid OTP");
    }
  } catch (err) {
    console.error(err);
    alert("OTP verification failed");
  } finally {
    setOtpLoading(false);
  }
};




const handleContinue = async () => {
  if (!validateForm()) return;

  if (!auth.currentUser?.emailVerified) {
    return alert("Please verify your email first.");
  }

  // const result = await submitCustomerRegistration();  // <-- THIS NOW RETURNS DATA

  // console.log("Step-1 API result:", result);

  // -------- CUSTOMER --------
  if (formData.role === "I am a Customer") {
    const result = await submitCustomerRegistration();

    if (result?.success || result?.status === "success") {
      alert("Customer registered successfully!");
    } else {
      alert(result.message);
    }

    return;
  }

 

  // -------- FREELANCER --------
  if (formData.role === "I am a Freelancer") {

    // console.log("Freelancer selected → skip customer API");
    setStep(2);
    return;
  }

  if (formData.role === "I am an Employer") {
    // console.log("Employer selected → skip customer API");
    setStep(2);
    return;
  }
  // const payload = {
  //   firstName: formData.firstName,
  //   lastName: formData.lastName,
  //   email: formData.email,
  //   mobileNo: formData.primaryPhone,
  //   password: formData.password,
  // };

  // const res = await registerFreelancerBase(payload);
  // console.log("Freelancer Step-1 Response:", res.data);

  // if (res.data.User) {
  //   localStorage.setItem("User", res.data.User);  // save userId
  //   setStep(2);                // go to KYC form
  // } else {
  //   alert("Failed to create freelancer user");
  // }

  // return;
}






  const handleResend = async () => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser, {
  url: "http://localhost:3000/verify", 
  handleCodeInApp: true
});
      alert("Verification link resent.");
    }
  } catch (error) {
    console.log(error);
  }
};

//  const [idType1, setIdType1] = useState(""); 
//   const [idType2, setIdType2] = useState("");
  const [certificateType, setCertificateType] = useState("");
  
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);

  const [frontImage2, setFrontImage2] = useState(null);
  const [backImage2, setBackImage2] = useState(null);
  const [frontImagePreview2, setFrontImagePreview2] = useState(null);
  const [backImagePreview2, setBackImagePreview2] = useState(null);

  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  // Dropdown dynamic label
const idLabel = getIdLabel(freelancer.idType1);
const idLabel1 = getIdLabel(freelancer.idType2);




  // Category example map
  const categoryOptions = {
    "Software Development": {
      sub: ["Frontend", "Backend", "Fullstack"],
      skills: {
        Frontend: ["React", "Angular", "Vue"],
        Backend: ["Node.js", "Django", "Laravel"],
        Fullstack: ["MERN", "MEAN", "Next.js + Django"]
      }
    },
    "Design": {
      sub: ["Graphic Design", "UI/UX", "3D"],
      skills: {
        "Graphic Design": ["Photoshop", "Illustrator", "CorelDraw"],
        "UI/UX": ["Figma", "Adobe XD", "Sketch"],
        "3D": ["Maya", "Blender", "Cinema 4D"]
      }
    }
  };

  // const [category, setCategory] = useState("");
  // const [subCategory, setSubCategory] = useState("");
  const [skill, setSkill] = useState("");

  const handleOtpChange = (e, index) => {
  const value = e.target.value.replace(/\D/, "");
  if (!value) return;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  // auto focus next
  if (index < 5) {
    document.querySelectorAll(".otp-inputs input")[index + 1].focus();
  }
};

const handleOtpBackspace = (e, index) => {
  if (e.key === "Backspace") {
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);

    if (index > 0) {
      document.querySelectorAll(".otp-inputs input")[index - 1].focus();
    }
  }
};



const handleCategoryChange = (e) => {
  const categoryId = e.target.value;
  setSelectedCategory(categoryId);

  const category = categories.find(cat => cat._id === categoryId);
  setSubCategories(category?.subCategories?.filter(sub => sub.isActive) || []);

  setSelectedSubCategory("");
};



  

  return (
     <div className="auth-wrapper">
      

      <Box
  sx={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    height: "100vh",
    overflow: "hidden",
    background: "linear-gradient( 135deg, #1b2f74  10%, #FFA6B7  100%)",
  }}
>

        <Box
  sx={{
    position: "sticky",
    top: 0,
    height: "100vh",
    
    px: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "white",
  }}
>
  <Box sx={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
    <Image src="/assets/go-experts-logo1.png" alt="" width={150} height={70} />
    {[
      {
        img: "/assets/customerRegisterleft.png",
        title: "I am a Customer",
        value: "I am a Customer"
      },
      {
        img: "/assets/freelancerRegisterleft2.png",
        title: "I am Freelancer",
        value: "I am a Freelancer"
      },
      {
        img: "/assets/companyRegisterleft.png",
        title: "I have a Company",
        value: "I am an Employer"
      },
    ].map((item) => {
      const isActive = formData.role === item.value;
      return(
      <Box key={item.value}  className={`info-content ${isActive ? "active" : ""}`}  sx={{ display: "flex", gap: 2, maxWidth: 320 }}>
        <Box
        
          sx={{
            width: 55,
            height: 55,
            borderRadius: 2,
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={item.img} alt="" width={35} height={35} />
        </Box>

        <Box>
          <Typography fontWeight={600}>{item.title}</Typography>
          <Typography fontSize={14} sx={{ opacity: 0.9 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Box>
        
      </Box>
      
    )})}
    <div className="shape circle-sm"></div>
  <div className="shape circle-lg"></div>
  <div className="shape dots"></div>
  </Box>
</Box>




        <Box
  sx={{
    height: "100vh",
    // overflowY: "auto",
    // overflowX: "hidden",
    px: { xs: 3, md: 7 },
    py: 4,
    
  }}
>
  <Box
  sx={{
    width: "100%",
    maxWidth: 1200,
    height: "90vh",       
    background: "#fff",      // 👈 controls visible area
    // background: "", // 👈 white transparent
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",

    borderRadius: "18px",

    border: "1px solid rgba(255, 255, 255, 0.4)",

boxShadow: "2px 10px 30px rgba(255, 255, 255, 0.27)",


    color: "#111",
    // backdropFilter: "blur(10px)",
    borderRadius: 4,
    // boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
 px: 3,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",          // 🔴 IMPORTANT

    "&::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },

    /* Hide scrollbar – Firefox */
    scrollbarWidth: "none",

    /* Hide scrollbar – IE / Edge */
    msOverflowStyle: "none"
  }}
>

          <Box sx={{ textAlign: "center", py: 2, }}>
  
  <Typography fontSize={18} mt={2}>
    Welcome to Go Exports
  </Typography>
  <Typography variant="h6" fontWeight={600}>
    Register your account!
  </Typography>
</Box>


<Box display="flex" justifyContent="center" flexDirection="column">

      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    gap: 2,
    flexWrap: "wrap",
  }}
>
  {[
    { value: "I am a Customer", label: "I am a Customer" },
    { value: "I am a Freelancer", label: "I am a Freelancer" },
    { value: "I am an Employer", label: "I have a Company" },
  ].map((item) => {
    const isActive = formData.role === item.value;

    return (
      <Box
        key={item.value}
        onClick={() =>
          handleChange({
            target: { name: "role", value: item.value },
          })
        }
        sx={{
  position: "relative",
  px: 3,
  py: 1,
  borderRadius: "500px",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  userSelect: "none",
  overflow: "hidden",

  border: "1px solid #1b2f74",
  backgroundColor: "transparent",
  color: "#1b2f74",

  transition: "color 0.4s ease",

  /* TEXT */
  "& span": {
    position: "relative",
    zIndex: 2,
    transition: "color 0.4s ease",
  },

  /* SLIDING BG */
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#1b2f74",

    /* START fully hidden on LEFT */
    transform: "translateX(-100%)",
    transition: "transform 0.45s ease",

    zIndex: 1,
  },

  /* HOVER: BG slides left → right */
  "&:hover::before": {
    transform: "translateX(0)",
  },

  /* HOVER: TEXT COLOR */
  "&:hover span": {
    color: "#fff",
  },

  /* ACTIVE STATE (no animation) */
  ...(isActive && {
    backgroundColor: "#1b2f74",
    color: "#fff",

    "&::before": {
      display: "none",
    },
  }),
}}


      >
        <span>{item.label}</span>
      </Box>
    );
    
  })}
   
 

</Box>
</Box>
{errors.role && (
  <Typography
    color="error"
    fontSize={12}
    mt={3}
    textAlign="center"
  >
    Please select a role
  </Typography>
  
)}






      
      {step === 1 && (
      <div className="auth-card my-4">
        

        



        {/* -------- ROW 1 -------- */}
        <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" gap={8}>
  <Grid item xs={6} >
    <Box>
    <Box
    sx={{
        display: "flex",
        border: "1px solid #1b2f74",
        borderRadius: "8px",
        overflow: "hidden",
        
        
        height: 40,
        width: 230,
        alignItems: "center",
          justifyContent: "center"
        
      }}>
    <TextField
      label="First Name *"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      fullWidth
      
      error={!!errors.firstName }
      helperText={""}
    />
    </Box>
    {errors.firstName && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {errors.firstName}
    </Box>
  )}
  </Box>

  </Grid>

 <Box>
    <Box
    sx={{
        display: "flex",
        border: "1px solid #1b2f74",
        borderRadius: "8px",
        overflow: "hidden",
        height: 40,
        width: 230,
        alignItems: "center",
          justifyContent: "center"
        
      }}>
    <TextField
      label="Last Name *"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      fullWidth
      error={!!errors.lastName}
      helperText={""}
    />

    

    </Box>
    {errors.lastName && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {errors.lastName}
    </Box>
  )}
  </Box>
  
</Grid>


        {/* -------- ROW 2 -------- */}
        <Grid container spacing={2} mt={3}  ml={1}  >
  {/* -------- Primary Phone -------- */}
  <Grid item xs={12} md={6} display="flex" gap={8} justifyContent="center" alignItems="center" >
    {/* <Typography fontSize={14} fontWeight={600} mb={0.5} color="#1b2f74">
      Primary Phone Number *
    </Typography> */}
<Box>
    <Box
      sx={{
        display: "flex",
        border: "1px solid ",
        borderRadius: "8px",
        overflow: "hidden",
        height: 40,
        width: 230,
        alignItems: "center",
          justifyContent: "center"
        
      }}
    >
      <FormControl
        sx={{
          minWidth: 70,
          
          height: 40,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Select
          name="countryPrimary"
          value={formData.countryPrimary}
          onChange={handleChange}
          variant="standard"
          disableUnderline
          sx={{ px: 1.2, fontSize:12,  }}
          
        >
          {countryCodes.map((item, index) => (
            <MenuItem key={index} value={item.code}>
              ({item.code})
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <Box
    sx={{
        display: "flex",
        // border: "1px solid #1b2f74",
        borderRadius: "8px",
        overflow: "hidden",
        height: 40,
        minWidth: 60,
        alignItems: "center",
          justifyContent: "center"
        
      }}>
    <TextField

      label="Phone Number *"
      
      name="primaryPhone"
      
      value={formData.primaryPhone}
        onChange={handleChange}
      
      fullWidth
      error={!!errors.primaryPhone}
      helperText={""}
    />
    </Box>
    


    </Box>
    {errors.primaryPhone && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {errors.primaryPhone}
    </Box>
  )}
  </Box>

    

    
    <Box
      sx={{
        display: "flex",
        border: "1px solid #1b2f74",
        borderRadius: "8px",
        overflow: "hidden",
        height: 40,
        width: 230,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <FormControl
        sx={{
          minWidth: 60,
          // background: "#f5f5f5",
          height: 40,
        alignItems: "center",
          justifyContent: "center"
          
        }}
      >
        <Select
          name="countryAlt"
          value={formData.countryAlt}
          onChange={handleChange}
          variant="standard"
          disableUnderline
          sx={{ px: 1.2, fontSize: 12 }}
        >
          {countryCodes.map((item, index) => (
            <MenuItem key={index} value={item.code}>
              ({item.code})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
    sx={{
        display: "flex",
        // border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        height: 40,
        minWidth: 80,
        alignItems: "center",
          justifyContent: "center"
        
      }}>
    <TextField

      label="Alternate / WhatsApp"
      

      name="altPhone"
        value={formData.altPhone}
        onChange={handleChange}
      
      
      
      fullWidth
      error={!!errors.altPhone}
      helperText={errors.altPhone}
    />
    </Box>

      {/* <TextField
        name="altPhone"
        value={formData.altPhone}
        onChange={handleChange}
        placeholder="Alternate / WhatsApp"
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
          sx: { px: 1.5, fontSize: 14 },
        }}
      /> */}
    </Box>
  </Grid>

  {/* -------- Alternate Phone -------- */}
  
</Grid>

{/* <Grid container spacing={2}>
  <Grid item xs={6}>
  
  </Grid>

 
    <Box
    sx={{
        display: "flex",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        height: 44,
        minWidth: 90,
        alignItems: "center",
          justifyContent: "center"
        
      }}>
    <TextField
      label="Last Name *"
      value={formData.lastName}
      onChange={handleChange}
      fullWidth
      error={!!errors.lastName}
      helperText={errors.lastName}
    />
    </Box>
  
</Grid> */}



        {/* -------- ROW 3 -------- */}
        <Grid container spacing={2} alignItems="flex-start" mt={3} px={1}>
  {/* -------- Email Field -------- */}
  <Grid item xs={12} md={8}>
    {/* <Typography
      fontSize={14}
      fontWeight={600}
      mb={0.5}
      color="#1b2f74"
    >
      Email Address *
    </Typography> */}
<Box>
      <Box
    sx={{
        display: "flex",
        border: "1px solid #1b2f74",
        borderRadius: "8px",
        overflow: "hidden",
        height: 40,
        width: 230,
        alignItems: "center",
          justifyContent: "center"
        
      }}>
    <TextField

      label="Email address *"
      value={formData.email}
      onChange={handleChange}
      
      name="email"
      
      fullWidth
      error={!!errors.email}
      helperText={""}
      disabled={otpVerified}
    />
    </Box>

    

    {errors.email && (
      <Typography fontSize={11} color="error" mt={0.5}>
        {errors.email}
      </Typography>
    )}
    </Box>

    

  </Grid>

  {/* -------- Verify Email -------- */}
  <Grid
    item
    xs={12}
    md={4}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      pt: { md: "10px", xs: 0 },
    }}
  >
    {!otpVerified ? (
      <Typography
        fontSize={13}
        color="#1b2f74"
        fontWeight={500}
        sx={{
          cursor: "pointer",
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={handleSendOtp}
      >
        Verify Email
      </Typography>
    ) : (
      <Typography
        fontSize={13}
        fontWeight={600}
        color="#1b2f74"
      >
        ✔ Verified
      </Typography>
    )}
  </Grid>

  {/* -------- OTP Error -------- */}
  {errors.otp && (
    <Grid item xs={12}>
      <Typography fontSize={11} color="error">
        {errors.otp}
      </Typography>
    </Grid>
  )}
</Grid>

                {/* -------- ROW 4 (Password + Confirm Password) -------- */}
<Grid
  container
  spacing={2}
  mt={3}
>
  {/* -------- Password -------- */}
  <Grid item xs={6} display="flex"
  justifyContent="center"
  alignItems="center"
  gap={8}  px={1}>
    <Box>
    <Box
      sx={{
        display: "flex",
        border: "1px solid #1b2f74",
        borderRadius: "8px",
        overflow: "hidden",
        height: 40,
        width: 230,
        alignItems: "center",
        justifyContent: "center",
        
      }}
    >
      <TextField
        type="password"
        label="Password *"
        name="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        error={!!errors.password}
        helperText={""}
        
      />
    </Box>
    {errors.password && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {errors.password}
    </Box>
  )}
  </Box>
  

  {/* -------- Confirm Password -------- */}
  <Grid item xs={6} >
    <Box>
    <Box
      sx={{
        display: "flex",
        border: "1px solid #1b2f74",
        borderRadius: "8px",
        overflow: "hidden",
        height: 40,
        width: 230,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        type="password"
        label="Confirm Password *"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        fullWidth
        error={!!errors.confirmPassword}
        
        
        
      />
    </Box>
    {errors.confirmPassword && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {errors.confirmPassword}
    </Box>
  )}
  </Box>

  </Grid>
  </Grid>
</Grid>

<div className="continue">
        <button className="cssbuttons-io-button" onClick={handleContinue}>{isCustomer ? "Register" : "Continue"}

          <div className="icon">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
          </div>
        </button>
        </div>

<div className="separator">
  <span>or continue with</span>
</div>

<div className="social-box">
  <button onClick={handleGoogleSignUp}>
    <Image src="/assets/google.png" width={20} height={20} alt=""/> <span>Google</span>
  </button>

  <button onClick={handleAppleSignUp}>
    <Image src="/assets/apple.png" width={20} height={20} alt="" />Apple
  </button>
</div>


        

        {/* -------- CONTINUE -------- */}
        
        {/* SOCIAL */}
        


        <p className="login-text">Already have an account? <a>Sign in</a></p>
  </div>)}



      {/* ---------- OTP POPUP ---------- */}
     {otpPopup && (
  <div className="otp-popup">
    <div className="otp-box">
      <h3>Email Verification</h3>

      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleOtpBackspace(e, index)}
          />
        ))}
      </div>

      <button onClick={handleOtpVerify} disabled={otpLoading}>
        {otpLoading ? "Verifying..." : "Verify OTP"}
      </button>

      <button className="cancel" onClick={() => setOtpPopup(false)}>
        Close
      </button>
    </div>
  </div>
)}


{step === 2 && (
      <div className="role-card">
        <div className="d-flex">
        <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
        <h4 className="almost">Almost there!</h4>
        </div>

        {/* Slider Navigation (Top Right) */}
        <div >
          {slide > 0 && (
            <button onClick={() => setSlide(slide - 1)}>⬅</button>
          )}
          
          {/* <button onClick={() => {
            if (slide === 0) setSlide(1);
            else handleSubmitRole();
          }}>
            {slide === 0 ? "➡" : "Finish"}
          </button> */}
        </div>

        {/* Content */}
        {formData.role === "I am a Freelancer" && (
          <>
            {slide === 0 && (
              <div className="freelancer-form">

<Box
  sx={{
    border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 3,
    mb: 4,
    backgroundColor: "transparent",
  }}
>
      {/* Row 1 */}
      <Typography variant="h6" mb={2} color="#1b2f74" fontSize={17}>
  Freelancer ID Verification 1
</Typography>

<Grid container spacing={3} display="flex" justifyContent="space-between" alignItems="center" gap={8}>
  {/* ---------- ID TYPE ---------- */}
  <Grid item xs={12} md={6} >
    <FormControl fullWidth error={!!freelancerErrors.idType1}>
      {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
        ID Type *
      </Typography> */}

      <Select
      
        value={freelancer.idType1}
        onChange={(e) => updateFreelancer("idType1", e.target.value)}
        displayEmpty
        size="small"
      >
        <MenuItem value="">ID type 1</MenuItem>
        <MenuItem value="PAN">PAN Card</MenuItem>
        <MenuItem value="DL">Driving License</MenuItem>
      </Select>

      
       {freelancerErrors.idType1 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.idType1}
    </Box>
  )}
    </FormControl>
  </Grid>

  {/* ---------- ID NUMBER ---------- */}
  
    {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
      {idLabel} *
    </Typography> */}
<Grid item xs={12} md={6}>
      <Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",

          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label={idLabel}
          value={freelancer.idNumber1}
          onChange={(e) => updateFreelancer("idNumber1", e.target.value)}
          fullWidth
          error={!!freelancerErrors.idNumber1}
      helperText={""}
        />
      </Box>
      {freelancerErrors.idNumber1 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.idNumber1}
    </Box>
  )}
  </Box>

    </Grid>
</Grid>

{/* ---------- FILE UPLOAD ---------- */}

<Box
  sx={{
    display: "flex",
    gap: 3,
    mt: 3,
  }}
>
  {/* FRONT IMAGE */}
  <Box>
  <Box
    sx={{
      width: 100,
      height: 100,
      border: "1px dashed #ccc",
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "&:hover":{
        border: "1px dashed #1b2f74",
        color: "#1b2f74"
      }
    }}
    onClick={() => document.getElementById("frontUpload").click()}
  >
    {frontImagePreview ? (
      <img
        src={frontImagePreview}
        alt="Front ID"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      <Typography>Front +</Typography>
    )}
  </Box>

  <input
    type="file"
    id="frontUpload"
    hidden
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;
      updateFreelancer("idFront1", file);
      setFrontImagePreview(URL.createObjectURL(file));
    }}
  />

  {freelancerErrors.idFront1 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.idFront1}
    </Box>
  )}
  </Box>
  

  {/* BACK IMAGE */}
  <Box>
  <Box
    sx={{
      width: 100,
      height: 100,
      border: "1px dashed #ccc",
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      "&:hover":{
        border: "1px dashed #1b2f74",
        color: "#1b2f74"
      }
    }}
    onClick={() => document.getElementById("backUpload").click()}
  >
    {backImagePreview ? (
      <img
        src={backImagePreview}
        alt="Back ID"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    ) : (
      <Typography>Back +</Typography>
    )}
  </Box>

  <input
    type="file"
    id="backUpload"
    hidden
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;
      updateFreelancer("idBack1", file);
      setBackImagePreview(URL.createObjectURL(file));
    }}
  />
  {freelancerErrors.idBack1 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.idBack1}
    </Box>
  )}
  </Box>
</Box>
</Box>

      {/* Row 2 */}
      

      {/* Row 3 */}
      <Box
  sx={{
    border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 2,
    mb: 3,
    backgroundColor: "#fff",
  }}
>
  {/* Title */}
  <Typography variant="h6" mb={2} color="#1b2f74" fontSize={17}>
    Freelancer ID Verification 2
  </Typography>

  <Grid
    container
    spacing={3}
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    gap={8}
  >
    {/* ---------- ID TYPE ---------- */}
    <Grid item xs={12} md={6}>
      <FormControl fullWidth>
        <Select
          value={freelancer.idType2}
          onChange={(e) => updateFreelancer("idType2", e.target.value)}
          displayEmpty
          size="small"
        >
          <MenuItem value="">ID type 2</MenuItem>
          <MenuItem value="AADHAAR">Aadhaar Card</MenuItem>
          <MenuItem value="PASSPORT">Passport</MenuItem>
        </Select>
        {freelancerErrors.idType2 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.idType2}
    </Box>
  )}
      </FormControl>
    </Grid>

    {/* ---------- ID NUMBER ---------- */}
    <Grid item xs={12} md={6}>
      <Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",

          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label={idLabel1}
          value={freelancer.idNumber2}
          onChange={(e) => updateFreelancer("idNumber2", e.target.value)}
          fullWidth
          error={!!freelancerErrors.idNumber2}
      helperText={""}
        />
      </Box>
      {freelancerErrors.idNumber2 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.idNumber2}
    </Box>
  )}
  </Box>

    </Grid>
  </Grid>

  {/* ---------- FILE UPLOAD ---------- */}
  <Box
    sx={{
      display: "flex",
      gap: 3,
      mt: 3,
    }}
  >
    {/* FRONT IMAGE */}
    <Box>
    <Box
      sx={{
        width: 100,
        height: 100,
        border: "1px dashed #ccc",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "&:hover": {
          border: "1px dashed #1b2f74",
          color: "#1b2f74",
        },
      }}
      onClick={() => document.getElementById("frontUpload2").click()}
    >
      {frontImagePreview2 ? (
        <img
          src={frontImagePreview2}
          alt="Front ID"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Typography>Front +</Typography>
      )}
    </Box>

    <input
      type="file"
      id="frontUpload2"
      hidden
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (!file) return;
        updateFreelancer("idFront2", file);
        setFrontImagePreview2(URL.createObjectURL(file));
      }}
    />
    {freelancerErrors.idFront2 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.idFront2}
    </Box>
  )}
  </Box>

    {/* BACK IMAGE */}
    <Box>
    <Box
      sx={{
        width: 100,
        height: 100,
        border: "1px dashed #ccc",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "&:hover": {
          border: "1px dashed #1b2f74",
          color: "#1b2f74",
        },
      }}
      onClick={() => document.getElementById("backUpload2").click()}
    >
      {backImagePreview2 ? (
        <img
          src={backImagePreview2}
          alt="Back ID"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Typography>Back +</Typography>
      )}
    </Box>

    <input
      type="file"
      id="backUpload2"
      hidden
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (!file) return;
        updateFreelancer("idBack2", file);
        setBackImagePreview2(URL.createObjectURL(file));
      }}
    />
    {freelancerErrors.idBack2 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.idBack2}
    </Box>
  )}
  </Box>
    
  </Box>
  
</Box>

      

      {/* Row 4 - Certificate Upload */}
      <Box
  sx={{
    border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 2,
    mb: 3,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}
>
  {/* ---------- CERTIFICATE TYPE ---------- */}
  <Box>
    {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
      Certificate Type *
    </Typography> */}

    <Select
      value={certificateType}
      onChange={(e) => setCertificateType(e.target.value)}
      displayEmpty
      size="small"
      sx={{ minWidth: 200 }}
    >
      <MenuItem value="">Certificate Type</MenuItem>
      <MenuItem value="Training Certificate">Training Certificate</MenuItem>
      <MenuItem value="Experience Letter">Experience Letter</MenuItem>
    </Select>
    {freelancerErrors.certificateType && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.certificateType}
    </Box>
  )}
  </Box>

  {/* ---------- CIRCULAR PDF UPLOAD ---------- */}
  <Box>
    <Box>
  <Box
    sx={{
      // width: 110,
      // height: 110,
      borderRadius: "50%",
      // border: "2px dashed #ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      textAlign: "center",

      "&:hover": {
        // borderColor: "#1b2f74",
        color: "#1b2f74",
      },
    }}
    onClick={() => document.getElementById("certFile").click()}
  >
    {fileUploadProgress > 0 && fileUploadProgress < 100 ? (
      <CircularProgressWithLabel value={fileUploadProgress} />
    ) : uploadedFileName ? (
      <Typography fontSize={12} fontWeight={600}>
        Uploaded ✓
      </Typography>
    ) : (
      <Typography fontSize={13} fontWeight={500}>
        Upload
        <br />
        PDF
      </Typography>
    )}
  </Box>

  <input
    id="certFile"
    type="file"
    hidden
    accept="application/pdf"
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;

      setUploadedFileName(file.name);

      // Simulated progress (replace with real upload later)
      setFileUploadProgress(10);
      const interval = setInterval(() => {
        setFileUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      updateFreelancer("experienceCertificates", [
        ...(freelancer.experienceCertificates || []),
        file,
      ]);
    }}
  />

  {/* ---------- FILE NAME ---------- */}
  {uploadedFileName && (
    <Typography fontSize={13} maxWidth={100} noWrap>
      {uploadedFileName}
    </Typography>
  )}
  {freelancerErrors.experienceCertificates && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.experienceCertificates}
    </Box>
  )}
  </Box>
</Box>
</Box>


      {/* Row 5 - Profile Upload */}
      <Box
  sx={{
    border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 2,
    mt: 3,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }}
>
  {/* <Typography fontSize={16} fontWeight={600} mb={3} color="#1b2f74">
    Profile Details
  </Typography> */}

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      flexWrap: "wrap",
      justifyContent: "space-between"
    }}
  >
    {/* ---------- SELFIE UPLOAD ---------- */}
    <Box>
      {/* <Typography fontSize={14} fontWeight={600} mb={1}>
        Upload Selfie Photo *
      </Typography> */}

      <Box
        sx={{
          width: 120,
          height: 120,
          border: "1px dashed #ccc",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          overflow: "hidden",

          "&:hover": {
            borderColor: "#1b2f74",
          },
        }}
        onClick={() => document.getElementById("selfie").click()}
      >
        {profilePreview ? (
          <img
            src={profilePreview}
            alt="Selfie"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography fontSize={13} px={1} textAlign="center">  Upload Selfie Photo *  </Typography>
        )}
      </Box>

      <input
        type="file"
        id="selfie"
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          updateFreelancer("selfie", file);
          setProfilePreview(URL.createObjectURL(file));
        }}
      />
      {freelancerErrors.selfie && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.selfie}
    </Box>
  )}
    </Box>

    {/* ---------- LINKEDIN ---------- */}


    

      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",

          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label="Your LinkedIn profile URL"
          value={freelancer.linkedin || ""}
        onChange={(e) => updateFreelancer("linkedin", e.target.value)}
          fullWidth
        />
      </Box>

      {/* <TextField
        fullWidth
        size="small"
        placeholder="Your LinkedIn profile URL"
        value={freelancer.linkedin || ""}
        onChange={(e) => updateFreelancer("linkedin", e.target.value)}
      /> */}
    </Box>
  </Box>



      {/* Row 6 - Categories */}
      {/* Row 6 - Category */}
<Box mt={4} sx={{
    border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 2,
    mt: 3,
    backgroundColor: "#fff",
    
  }}>
  {/* ---------- CATEGORY & SUB CATEGORY (SAME ROW) ---------- */}
  <Grid container spacing={3} display="flex" justifyContent="space-between" alignItems="center">
    {/* CATEGORY */}
    <Grid item xs={12} md={6}>
      {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
        Category *
      </Typography> */}
      <FormControl size="small" width={230} >
      <Select
        
        size="small"
        value={selectedCategory}
        onChange={handleCategoryChange}
        displayEmpty
        
      >
        <MenuItem value="" >Select Category *</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      {freelancerErrors.category && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.category}
    </Box>
  )}
    </Grid>

    {/* SUB CATEGORY */}
    <Grid item xs={12} md={6}>
      {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
        Sub Category *
      </Typography> */}

      <Select
        width={230}
        size="small"
        value={selectedSubCategory}
        onChange={(e) => setSelectedSubCategory(e.target.value)}
        displayEmpty
        disabled={!selectedCategory}
        sx={{
          backgroundColor: !selectedCategory ? "#f1f1f1" : "#fff",
        }}
      >
        <MenuItem value="">Select Sub Category *</MenuItem>
        {subCategories.map((sub) => (
          <MenuItem key={sub._id} value={sub._id}>
            {sub.name}
          </MenuItem>
        ))}
      </Select>

      {freelancerErrors.subCategory && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {freelancerErrors.subCategory}
    </Box>
  )}
    </Grid>
  </Grid>

  {/* ---------- SKILLS (NEXT LINE) ---------- */}
  <Box mt={3}>
    {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
      Skills *
    </Typography> */}

    <TextField
      width={230}
      size="small"
      placeholder="Skills: Python, React.js, AWS..."
      value={skill}
      onChange={(e) => setSkill(e.target.value)}
      disabled={!selectedSubCategory}
      sx={{
        backgroundColor: !selectedSubCategory ? "#f1f1f1" : "#fff",
        cursor: !selectedSubCategory ? "not-allowed" : "text",
      }}
    />
  </Box>
</Box>


  {/* <div>
  <label>LinkedIn </label>
<input
  type="text"
  value={freelancer.linkedin || ""}
  onChange={(e) => updateFreelancer("linkedin", e.target.value)}
  placeholder="Your LinkedIn profile URL"
/>
</div> */}




  <div className="finish">

    {/* <button className="cssbuttons-io-button" onClick={handleContinue}>Continue
          <div className="icon">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
          </div>
        </button> */}

    
        <button className="cssbuttons-io-button my-4"  onClick={handleFreelancerSubmit}>
          Finish Registration
          <div className="icon">
            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
          </div>
        </button>
        </div>


    </div>
            )}
            
          </>
        )}

        {formData.role === "I am an Employer" && (
  <>
    {slide === 0 && (
      <div className="employer-form">
        

        {/* -------------------- Row 1: Organization Type -------------------- */}
        <Box >
  <Grid container spacing={3} display="flex" justifyContent="space-between" alignItems="center">
    {/* ---------- TYPE OF ORGANIZATION ---------- */}
    <Grid item xs={12} md={6}>
      {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
        Type of Organization *
      </Typography> */}

      <Select
        fullWidth
        size="small"
        value={employer.orgType}
        onChange={(e) => updateEmployer("orgType", e.target.value)}
        displayEmpty
      >
        <MenuItem value="">Type of Organization *</MenuItem>
        <MenuItem value="Proprietorship">Proprietorship</MenuItem>
        <MenuItem value="Partnership">Partnership</MenuItem>
        <MenuItem value="LLP">LLP</MenuItem>
        <MenuItem value="Private Limited">Private Limited</MenuItem>
        <MenuItem value="Public Limited">Public Limited</MenuItem>
      </Select>
      {employerErrors.orgType && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.orgType}
    </Box>
  )}
    </Grid>

    {/* ---------- ORGANISATION NAME ---------- */}
    <Grid item xs={12} md={6}>
      {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
        Organisation Name *
      </Typography> */}
  <Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",

          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label="Organization Name *"
          value={employer.orgName}
        onChange={(e) => updateEmployer("orgName", e.target.value)}
          fullWidth
        />

      </Box>
      {employerErrors.orgName && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.orgName}
    </Box>
  )}
  </Box>

      {/* <TextField
        fullWidth
        size="small"
        
        placeholder="Enter organisation name"
      /> */}
    </Grid>
  </Grid>
</Box>


        {/* -------------------- Row 2: Director ID Verification 1 -------------------- */}
        <Box  borderRadius={6} sx={
          {border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 3,
    mb: 1,}
        }>
  {/* ---------- TITLE ---------- */}
  <Typography variant="h6" mb={2} fontSize={17} color="#1b2f74">
    Director ID Verification
  </Typography>

  <Grid container spacing={3} alignItems="center" display="flex" justifyContent="space-between" >
    {/* ---------- ID TYPE ---------- */}
    <Grid item xs={12} md={4}>
      {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
        ID Type *
      </Typography> */}

      <Select
        fullWidth
        size="small"
        value={employer.idType1}
        onChange={(e) => updateEmployer("idType1", e.target.value)}
        displayEmpty
      >
        <MenuItem value="">Select Type</MenuItem>
        <MenuItem value="PAN Card">PAN Card</MenuItem>
        <MenuItem value="Driving License">Driving License</MenuItem>
      </Select>
      {employerErrors.idType1 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.idType1}
    </Box>
  )}
    </Grid>

    {/* ---------- ID NUMBER ---------- */}
    <Grid item xs={12} md={4}>
      {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
        ID Number *
      </Typography> */}
  <Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",

          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label={idLabel1}
          value={employer.idNumber1}
        onChange={(e) => updateEmployer("idNumber1", e.target.value)}
          fullWidth
        />
      </Box>
      {employerErrors.idNumber1 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.idNumber1}
    </Box>
  )}
  </Box>


      {/* <TextField
        fullWidth
        size="small"
        
        placeholder="Enter ID number"
      /> */}
    </Grid>

    {/* ---------- UPLOAD BOX ---------- */}
    <Grid item xs={12} md={4}>
      <Box display="flex" gap={2}>
        {/* FRONT */}
        <Box>
        <Box
          sx={{
            width: 100,
            height: 100,
            border: "1px dashed #ccc",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() =>
            document.getElementById("directorFront1").click()
          }
        >
          {employer.directorFront1Preview ? (
            <img
              src={employer.directorFront1Preview}
              alt="Front"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography fontSize={13}>Front +</Typography>
          )}
        </Box>

        <input
          id="directorFront1"
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            if (!f) return;
            updateEmployer("directorFront1", f);
            updateEmployer(
              "directorFront1Preview",
              URL.createObjectURL(f)
            );
          }}
        />
        {employerErrors.directorFront1 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.directorFront1}
    </Box>
  )}
  </Box>

        {/* BACK */}
        <Box>
        <Box
          sx={{
            width: 100,
            height: 100,
            border: "1px dashed #ccc",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() =>
            document.getElementById("directorBack1").click()
          }
        >
          {employer.directorBack1Preview ? (
            <img
              src={employer.directorBack1Preview}
              alt="Back"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography fontSize={13}>Back +</Typography>
          )}
        </Box>

        <input
          id="directorBack1"
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            if (!f) return;
            updateEmployer("directorBack1", f);
            updateEmployer(
              "directorBack1Preview",
              URL.createObjectURL(f)
            );
          }}
        />
        {employerErrors.directorBack1 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.directorBack1}
    </Box>
  )}
  </Box>
      </Box>
    </Grid>
  </Grid>
</Box>


        

        {/* -------------------- Row 3: Director ID Verification 2 -------------------- */}
       <Box
  sx={{
    border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 3,
    mb: 1,
  }}
>
  {/* ---------- TITLE ---------- */}
  <Typography variant="h6" mb={2} fontSize={17} color="#1b2f74">
    Director Address Verification </Typography>

  <Grid
    container
    spacing={3}
    alignItems="center"
    display="flex"
    justifyContent="space-between"
  >
    {/* ---------- ID TYPE ---------- */}
    <Grid item xs={12} md={4}>
      <Select
        fullWidth
        size="small"
        value={employer.idType2}
        onChange={(e) => updateEmployer("idType2", e.target.value)}
        displayEmpty
      >
        <MenuItem value="">Select Type</MenuItem>
        <MenuItem value="AADHAAR">Aadhaar Card</MenuItem>
        <MenuItem value="PASSPORT">Passport</MenuItem>
      </Select>

      {employerErrors.idType2 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.idType2}
    </Box>
  )}
    </Grid>

    {/* ---------- ID NUMBER ---------- */}
    <Grid item xs={12} md={4}>
      <Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label={idLabel1}
          value={employer.idNumber2}
          onChange={(e) => updateEmployer("idNumber2", e.target.value)}
          fullWidth
        />
      </Box>
      {employerErrors.idNumber2 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.idNumber2}
    </Box>
  )}
  </Box>
    </Grid>

    {/* ---------- UPLOAD BOX ---------- */}
    <Grid item xs={12} md={4}>
      <Box display="flex" gap={2}>
        {/* FRONT */}
        <Box>
        <Box
          sx={{
            width: 100,
            height: 100,
            border: "1px dashed #ccc",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() =>
            document.getElementById("directorFront2").click()
          }
        >
          {employer.directorFront2Preview ? (
            <img
              src={employer.directorFront2Preview}
              alt="Front"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography fontSize={13}>Front +</Typography>
          )}
        </Box>

        <input
          id="directorFront2"
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            if (!f) return;
            updateEmployer("directorFront2", f);
            updateEmployer(
              "directorFront2Preview",
              URL.createObjectURL(f)
            );
          }}
        />
          {employerErrors.directorFront2 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.directorFront2}
    </Box>
  )}
  </Box>
        {/* BACK */}
        <Box>
        <Box
          sx={{
            width: 100,
            height: 100,
            border: "1px dashed #ccc",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() =>
            document.getElementById("directorBack2").click()
          }
        >
          {employer.directorBack2Preview ? (
            <img
              src={employer.directorBack2Preview}
              alt="Back"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Typography fontSize={13}>Back +</Typography>
          )}
        </Box>

        <input
          id="directorBack2"
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            if (!f) return;
            updateEmployer("directorBack2", f);
            updateEmployer(
              "directorBack2Preview",
              URL.createObjectURL(f)
            );
          }}
        />
        {employerErrors.directorBack2 && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.directorBack2}
    </Box>
  )}
  </Box>
      </Box>
    </Grid>
  </Grid>
</Box>


        

        {/* -------------------- Row 4: Logo Upload -------------------- */}
        {/* <h4 >Upload Photos</h4> */}
       <Box 
      sx={{border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 3,
    mb: 1}} >
  <Grid container spacing={4} alignItems="center" justifyContent="space-between">
    {/* ---------- COMPANY LOGO ---------- */}
    <Grid item xs={12} md={4}>
      {/* <Typography fontSize={14} fontWeight={600} mb={1}>
        Company Logo *
      </Typography> */}
  <Box>
      <Box
        sx={{
          width: 110,
          height: 110,
          border: "1px dashed #ccc",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          "&:hover": {
            border: "1px dashed #1b2f74",
          },
        }}
        onClick={() =>
          document.getElementById("companyLogo").click()
        }
      >
        {employer.logoPreview ? (
          <img
            src={employer.logoPreview}
            alt="Company Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Typography fontSize={13} px={2} textAlign="center">Company Logo * </Typography>
        )}
      </Box>

      <input
        id="companyLogo"
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files[0];
          if (!f) return;
          updateEmployer("logo", f);
          updateEmployer(
            "logoPreview",
            URL.createObjectURL(f)
          );
        }}
      />
      {employerErrors.logo && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.logo}
    </Box>
  )}
  </Box>
    </Grid>

    {/* ---------- COMPANY PHOTOS ---------- */}
    <Grid item xs={12} md={8}>
      {/* <Typography fontSize={14} fontWeight={600} mb={1}>
        Company Photos
      </Typography> */}

      <Box display="flex" gap={2}>
        {[1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 110,
              height: 110,
              border: "1px dashed #ccc",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                border: "1px dashed #1b2f74",
              },
            }}
            onClick={() =>
              document
                .getElementById(`companyPhoto${i}`)
                .click()
            }
          >
            {employer[`companyPhoto${i}Preview`] ? (
              <img
                src={employer[`companyPhoto${i}Preview`]}
                alt={`Company ${i}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Typography fontSize={13} px={1} textAlign="center">Company photos</Typography>
            )}

            <input
              id={`companyPhoto${i}`}
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files[0];
                if (!f) return;
                updateEmployer(`companyPhoto${i}`, f);
                updateEmployer(
                  `companyPhoto${i}Preview`,
                  URL.createObjectURL(f)
                );
              }}
            />
            {/* {employerErrors. && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.idType2}
    </Box>
  )} */}
          </Box>
        ))}
      </Box>
    </Grid>
  </Grid>
</Box>


        {/* -------------------- Row 6: GST License -------------------- */}
        <Box sx={{
          border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 3,
    
        }}>
  <Grid container spacing={3} alignItems="center" justifyContent="space-between">
    {/* ---------- GST NUMBER ---------- */}
    <Grid item xs={12} md={6}>
      {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
        GST / Other License *
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label="GST/Other Liscence number *"
          value={employer.gstNumber}
        onChange={(e) => updateEmployer("gstNumber", e.target.value)}
          fullWidth
        />
      </Box>

      {employerErrors.gstNumber && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.gstNumber}
    </Box>
  )}

      {/* <TextField
        fullWidth
        size="small"
        placeholder="License Number"
        
      /> */}
    </Grid>

    {/* ---------- GST PDF UPLOAD ---------- */}
    <Grid item xs={12} md={6}>
      <Box display="flex" alignItems="center">
        <Box>
        <Box
          sx={{
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            textAlign: "center",
            width: 80,
            height: 80,

            "&:hover": {
              color: "#1b2f74",
            },
          }}
          onClick={() =>
            document.getElementById("gstUpload").click()
          }
        >
          {gstUploadProgress > 0 && gstUploadProgress < 100 ? (
            <CircularProgressWithLabel
              value={gstUploadProgress}
            />
          ) : gstFileName ? (
            <Typography fontSize={12} fontWeight={600}>
              Uploaded ✓
            </Typography>
          ) : (
            <Typography fontSize={13} fontWeight={500}>
              Upload
              <br />
              PDF
            </Typography>
          )}
        </Box>

        <input
          id="gstUpload"
          type="file"
          hidden
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            setGstFileName(file.name);
            updateEmployer("gstDocument", file);

            // Simulated progress
            setGstUploadProgress(10);
            const interval = setInterval(() => {
              setGstUploadProgress((prev) => {
                if (prev >= 100) {
                  clearInterval(interval);
                  return 100;
                }
                return prev + 10;
              });
            }, 200);
          }}
        />

        {/* ---------- FILE NAME ---------- */}
        {gstFileName && (
          <Typography fontSize={13} maxWidth={100} noWrap>
            {gstFileName}
          </Typography>
        )}
      </Box>
      {employerErrors.gstDocument && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.gstDocument}
    </Box>
  )}
  </Box>
    </Grid>
  </Grid>
</Box>


        {/* -------------------- Row 7: Employer Address -------------------- */}
        
          {/* <h4>Employer Address</h4> */}
          
        {/* -------------------- Row 8: Full Address + PDFs -------------------- */}
        <Box sx={{
          border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 3,
    mb: 1,
        }}>
  <Grid container spacing={3} alignItems="center" justifyContent="space-between">
    {/* ---------- FULL ADDRESS ---------- */}
    <Grid item xs={12} md={6}>
      {/* <Typography fontSize={14} fontWeight={600} mb={0.5}>
        Full Address *
      </Typography> */}
      <Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label="Full Address *"
          value={employer.fullAddress}
        onChange={(e) => updateEmployer("fullAddress", e.target.value)}
          fullWidth
        />
      </Box>
      {employerErrors.fullAddress && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.fullAddress}
    </Box>
  )}
  </Box>

      {/* <TextField
        fullWidth
        size="small"
        
        placeholder="Enter full address"
      /> */}
    </Grid>

    {/* ---------- ADDRESS PROOF UPLOADS ---------- */}
    <Grid item xs={12} md={6}>
      <Box display="flex" gap={3} alignItems="center">
        {/* -------- Address Proof 1 -------- */}
        <Box textAlign="center">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": { color: "#1b2f74" },
            }}
            onClick={() =>
              document.getElementById("addrProof1").click()
            }
          >
            {addrProof1Progress > 0 &&
            addrProof1Progress < 100 ? (
              <CircularProgressWithLabel
                value={addrProof1Progress}
              />
            ) : addrProof1Name ? (
              <Typography fontSize={12} fontWeight={600}>
                Uploaded ✓
              </Typography>
            ) : (
              <Typography fontSize={12}>
                Upload
                <br />
                Proof 1*
              </Typography>
            )}
          </Box>

          <input
            id="addrProof1"
            hidden
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              setAddrProof1Name(file.name);
              updateEmployer("addressProof1", file);

              setAddrProof1Progress(10);
              const interval = setInterval(() => {
                setAddrProof1Progress((prev) => {
                  if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                  }
                  return prev + 10;
                });
              }, 200);
            }}
          />

          {addrProof1Name && (
            <Typography fontSize={12} maxWidth={100} noWrap>
              {addrProof1Name}
            </Typography>
          )}
        </Box>

        {/* -------- Address Proof 2 -------- */}
        <Box textAlign="center">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": { color: "#1b2f74" },
            }}
            onClick={() =>
              document.getElementById("addrProof2").click()
            }
          >
            {addrProof2Progress > 0 &&
            addrProof2Progress < 100 ? (
              <CircularProgressWithLabel
                value={addrProof2Progress}
              />
            ) : addrProof2Name ? (
              <Typography fontSize={12} fontWeight={600}>
                Uploaded ✓
              </Typography>
            ) : (
              <Typography fontSize={12}>
                Upload
                <br />
                Proof 2
              </Typography>
            )}
          </Box>

          <input
            id="addrProof2"
            hidden
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              setAddrProof2Name(file.name);
              updateEmployer("addressProof2", file);

              setAddrProof2Progress(10);
              const interval = setInterval(() => {
                setAddrProof2Progress((prev) => {
                  if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                  }
                  return prev + 10;
                });
              }, 200);
            }}
          />

          {addrProof2Name && (
            <Typography fontSize={12} maxWidth={90} noWrap>
              {addrProof2Name}
            </Typography>
          )}
        </Box>
      </Box>
    </Grid>
  </Grid>
</Box>

        {/* -------------------- Row 9: Business Details -------------------- */}
<Box sx={{
  border: "1px solid #e0e0e0",
    borderRadius: 3,
    p: 3,
    }}>
  {/* ---------- TITLE ---------- */}
  <Typography variant="h6" mb={2} fontSize={17} color="#1b2f74">
    Business Details
  </Typography>

  {/* ---------- ROW 1 ---------- */}
  <Grid container spacing={3}>
    {/* Business Email */}
    <Grid item xs={12} md={4}>
      <Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="email"
          label="Business Email Address *"
          value={employer.businessEmail}
          onChange={(e) =>
            updateEmployer("businessEmail", e.target.value)
          }
          fullWidth
        />
      </Box>
      {employerErrors.businessEmail && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.businessEmail}
    </Box>
  )}
  </Box>
    </Grid>

    {/* Business Phone */}
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label="Business Phone (Optional)"
          value={employer.businessPhone}
          onChange={(e) =>
            updateEmployer("businessPhone", e.target.value)
          }
          fullWidth
        />
      </Box>
    </Grid>

    {/* Website / Portfolio */}
    <Grid item xs={12} md={4}>
      <Box>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label="Website / Portfolio URL *"
          value={employer.businessWebsite}
          onChange={(e) =>
            updateEmployer("businessWebsite", e.target.value)
          }
          fullWidth
        />
      </Box>
      {employerErrors.businessWebsite && (
    <Box sx={{ color: "#d32f2f", fontSize: "12px", mt: "4px" }}>
      {employerErrors.businessWebsite}
    </Box>
  )}
  </Box>
    </Grid>
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          height: 40,
          width: 230,
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            border: "1px solid #1b2f74",
          },
        }}
      >
        <TextField
          type="text"
          label="LinkedIn (Optional)"
          value={employer.linkedin}
          onChange={(e) =>
            updateEmployer("linkedin", e.target.value)
          }
          fullWidth
        />
      </Box>
    </Grid>
  </Grid>

  {/* ---------- ROW 2 ---------- */}
  {/* <Grid container spacing={3} mt={1}>
    
  </Grid> */}
</Box>



        <div className="finish">
        <button className="finish-btn" onClick={handleCompanySubmit}>
          Finish Registration
        </button>
        </div>
      </div>
    )}
  </>
)}


        {/* Back to Step 1 button */}
        

      </div>
    )}




        </Box>

      </Box>
      </Box>
    </div>
  )
}

export default Register