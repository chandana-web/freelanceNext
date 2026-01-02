"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Link,
  Paper,
  Fade,
  Avatar,
  Grid
} from "@mui/material";
import { keyframes } from "@mui/system";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import axiosClient from "../../api/axiosClient"

// import { BackgroundContainer } from "../../components/common/BackgroundContainer";
// import { Grid } from "lucide-react";





const ForgotPassword = () => {
  const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;
  // --- STATE MANAGEMENT ---
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  // --- TIMER LOGIC ---
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // --- HANDLERS ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting forgot password for:", email);

    // --- VALIDATIONS ---
    if (!email) {
      alert("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosClient.post("/api/auth/forgot-password", {
        email,
      });
      console.log("FORGOT PASSWORD SUCCESS, EMAIL:", email);

      localStorage.setItem("resetEmail", email);

      console.log(
        "LOCALSTORAGE AFTER SET:",
        localStorage.getItem("resetEmail")
      );
      // Success
      setIsSubmitted(true);
      setTimer(60);
    } catch (error) {
      console.error("Forgot password error:", error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);
      await axiosClient.post("/api/auth/forgot-password", { email });
      setTimer(60);
    } catch (error) {
      console.error("error", error);
      alert("Unable to resend email. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center", // Vertically centers the form
        justifyContent: "center", // Horizontally centers the form
        height: "100vh", // <--- THIS ENSURES FULL HEIGHT
        width: "100vw", // Ensures full width
        p: { xs: 2, md: 0 }, // Small padding on mobile only
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1050px",
          minHeight: "670px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "stretch",
          gap: { xs: 4, md: 0 },
        }}
      >
        {/* ================= IMAGE (NO PAPER, NO BG) ================= */}
       <Box
  sx={{
    flex: 1.2,
    pl: 10,
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    justifyContent: "center",
    animation: `${float} 4s ease-in-out infinite`,
  }}
>

          <Box
            component="img"
            src="/Questions-bro.svg"
            alt="Forgot Password"
            sx={{
              width: "250%",
              maxWidth: "600px",
              height: "80%",
              mr: "70%",
              filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.1))",
            }}
          />
        </Box>

        {/* ================= FORM (WITH PAPER) ================= */}
        <Paper
          elevation={10}
          sx={{
            flex: 1,
            p: { xs: 2, md: 6 },
            mt: "5%",
            mr: "-5%",
            borderRadius: "32px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <Avatar
            sx={{
              m: "0 auto 40px",
              bgcolor: "#1b2f74",
              color: "PRIMARY_BLUE",
              width: 60,
              height: 60,
              boxShadow: "0 8px 16px rgba(27,47,116,0.2)",
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>

          {!isSubmitted ? (
            <Fade in={!isSubmitted} timeout={500}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "#1b2f74",
                    mb: 2,
                    fontSize: { xs: "2rem", md: "2.6rem" },
                  }}
                >
                  Forgot Password?
                </Typography>

                <Typography sx={{ color: "#888", mb: 2, fontWeight: 500 }}>
                  NO WORRIES! Enter your email address below, and we'll send you
                  an OTP to reset your password.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Typography sx={{ fontWeight: 600, mb: 1.5 }}>
                    Email Addres
                  </Typography>

                  <TextField
                    fullWidth
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    sx={{
                      mb: 4,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "14px",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon sx={{ color: "#1b2f74" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    sx={{
                      py: 2,
                      mb: 2.5,
                      backgroundColor: "#1b2f74",
                      color: "#fff",
                      borderRadius: "14px",
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 700,
                      "&:hover": { backgroundColor: "#14235a" },
                    }}
                  >
                    {loading ? "Sending..." : "Submit"}
                  </Button>
                </Box>
              </Box>
            </Fade>
          ) : (
            <Fade in={isSubmitted} timeout={500}>
              <Box sx={{ textAlign: "center" }}>
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 90, color: "#ff0000", mb: 2 }}
                />
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                  Check Your Email
                </Typography>

                <Typography sx={{ color: "#666", mb: 5 }}>
                  Verification email sent to <br />
                  <strong>{email}</strong>
                </Typography>

                <Button
  disabled={timer > 0}
  onClick={handleResend}
  sx={{ fontWeight: 700, mb: "5%" }}
>
  {timer > 0 ? `Resend in ${timer}s` : "Resend Email"}
</Button>

              </Box>
            </Fade>
          )}
          <Link
            href="/auth/signin"
            sx={{
              mt: 8,
              textAlign: "center",
              fontWeight: 800,
              color: "#1b2f74",
              ml: "39%",
            }}
          >
            Back to Login
          </Link>
        </Paper>
      </Box>
    </Grid>
  );
};

export default ForgotPassword;

