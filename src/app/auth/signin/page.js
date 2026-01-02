"use client";

import { useState } from "react";
import Image from "next/image";

import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import {
  Box,
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  Stack,
  
} from "@mui/material";
import "@/app/styles/signin.css";

import { signInUser } from "@/app/api/userSigninApi";
import { signInWithGoogle, signInWithApple } from "@/app/api/socialSignin";
import { useRouter } from "next/navigation";


const SignIn = () => {
      const [formData, setFormData] = useState({
  email: "",
  password: "",
  role: "", // customer | freelancer | company
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const router = useRouter();

const handleSubmit = async () => {
  if (!formData.email || !formData.password || !formData.role) {
    alert("Please fill all fields");
    return;
  }

  try {
    const data = await signInUser(formData);

    console.log("LOGIN SUCCESS:", data);

    // Save token
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/dashboard");

    // Redirect
    // if (formData.role === "customer") {
    //   router.push("/customer/dashboard");
    // } else if (formData.role === "freelancer") {
    //   router.push("/freelancer/dashboard");
    // } else {
    //   router.push("/company/dashboard");
    // }
    // if (formData.role === "customer") {
    //   router.push("/dashboard");
    // } else if (formData.role === "freelancer") {
    //   router.push("/dashboard");
    // } else {
    //   router.push("/dashboard");
    // }
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    );
  }
};

const handleGoogleSignIn = async () => {
  try {
    const userData = await signInWithGoogle();

    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));

    router.push("/dashboard");
  } catch {
    alert("Google sign-in failed");
  }
};


const handleAppleSignIn = async () => {
  try {
    const userData = await signInWithApple();

    localStorage.setItem("authToken", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));

    router.push("/dashboard");
  } catch {
    alert("Apple sign-in failed");
  }
};


const ROLE_OPTIONS = [
  { value: "customer", label: "I am a Customer" },
  { value: "freelancer", label: "I am a Freelancer" },
  { value: "company", label: "I have a Company" },
];





  return (
    <Grid container minHeight="100vh" width="100%">
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient( 135deg, #1b2f74 10%, #FFA6B7 100%)",
          width:"100%",
          gap:"700"
          
        }}
      >
        <Image src="/assets/signin-logo5.png" width={700} height={400} alt=""/>
      
      {/* Header */}
      
      {/* <p className="signin-auth-subtitle">
        Give your visitor a smooth online experience with a solid UX design
      </p> */}

      {/* Login Card */}
      <Box className="signin-auth-card">
        <Typography
    variant="h4"
    className="signin-auth-title text-center"
    gutterBottom
  >
    Sign In
  </Typography>
        
        <Typography
    variant="h10"
    className="signin-auth-welcome text-center"
    gutterBottom
  >
    We&apos;re glad to see you again!
  </Typography>
  
        

  <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" mb={3} mt={2}>
  
        <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    gap: 2,
    flexWrap: "wrap",
  }}
>
  {ROLE_OPTIONS.map((item) => {
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

          "& span": {
            position: "relative",
            zIndex: 2,
            transition: "color 0.4s ease",
          },

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#1b2f74",
            transform: "translateX(-100%)",
            transition: "transform 0.45s ease",
            zIndex: 1,
          },

          "&:hover::before": {
            transform: "translateX(0)",
          },

          "&:hover span": {
            color: "#fff",
          },

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
  {/* {errors.role && (
    <Typography
      color="error"
      fontSize={12}
      mt={3}
      textAlign="center"
    >
      Please select a role
    </Typography>
    
  )} */}

        {/* Email Input */}
        
  <TextField
    label="Email Address"
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    fullWidth
    required
    margin="normal"
    sx={{
    "& input": {
      border: "none",
    },}}
  />

  <TextField
    label="Password"
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    fullWidth
    required
    margin="normal"
     sx={{
    "& input": {
      border: "none",
    },}}
  />


        {/* Remember + Forgot */}
        <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
        
          {/* <label className="signin-checkbox">
            <input
                className="signin-checkbox-input"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label> */}

          <a className="signin-forgot" href="/password-reset/forgot-password">Forgot password?</a>
        

        {/* Login Button */}
        <div className="sign-in-btn">
<button className="cssbuttonsIoButton" onClick={handleSubmit}>
  Sign in
  <div className="icon">
    <svg
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
</button>
</div>
</div>


        <div className="signin-divider">OR</div>

        {/* Social Buttons */}
        <div className="social-box">
  <button onClick={handleGoogleSignIn}>
    <Image src="/assets/google.png" width={20} height={20} alt="" />
    <span>Google</span>
  </button>

  <button onClick={handleAppleSignIn}>
    <Image src="/assets/apple.png" width={20} height={20} alt="" />
    <span>Apple</span>
  </button>
</div>

        <Typography
    variant="body2"
    className="signin-auth-switch text-center"
  >
    Don&apos;t have an account? <a href="/auth/register">Sign Up!</a>
  </Typography>
      </Box>
      
      </Grid>
    </Grid>
  )
}

export default SignIn