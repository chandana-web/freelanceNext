"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { getAllFreelancers } from "../api/freelancerDashboardPro";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardSidebar from "./dashboardComponents/DashboardSidebar";
import DashboardNavbar from "./dashboardComponents/DashboardNavbar";
import DashboardFooter from "./dashboardComponents/DashboardFooter";
import "@/app/dashboard/styles/dashboard.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [userStatus, setUserStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.replace("/auth/signin");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  /* ---------------- STATUS CHECK ---------------- */
useEffect(() => {
  const fetchStatus = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      console.log("LOGGED IN USER 👉", user);

      const res = await getAllFreelancers();

      console.log("RAW API RESPONSE 👉", res.data);

      const freelancers = Array.isArray(res.data?.profiles)
        ? res.data.profiles
        : [];

      console.log("FINAL FREELANCERS ARRAY 👉", freelancers);

      const myProfile = freelancers.find(
  (f) => f.freelancerId?._id === user.id
);

if (!myProfile) {
  console.error("Freelancer profile not found for user", user.id);
  setUserStatus("inactive");
  return;
}

const normalizedStatus = String(
  myProfile.freelancerId?.status
)
  .trim()
  .toLowerCase();

console.log("FINAL STATUS 👉", normalizedStatus);
setUserStatus(normalizedStatus);

    } catch (err) {
      console.error("Failed to fetch freelancer status", err);
      setUserStatus("inactive");
    } finally {
      setCheckingStatus(false);
    }
  };

  if (!checkingAuth) {
    fetchStatus();
  }
}, [checkingAuth]);





  /* ---------------- LOADING STATE ---------------- */
  if (checkingAuth || checkingStatus) {
    return (
      <div className="dashboard-loading">
        Checking account status...
      </div>
    );
  }

  const isBlocked =
    userStatus !== "approved";
    

  return (
    <div className="dashboard-container">
      <DashboardNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="dashboard-body">
        <DashboardSidebar isOpen={sidebarOpen} />

        <main
          className={`dashboard-content ${
            sidebarOpen ? "expanded" : "collapsed"
          }`}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </main>
      </div>

      <DashboardFooter />

      {/* 🔒 STATUS BLOCKING OVERLAY */}
      {/* 🔒 STATUS BLOCKING MODAL (MUI) */}
<Dialog
  open={userStatus !== "approved"}
  disableEscapeKeyDown
  fullWidth
  maxWidth="sm"
  PaperProps={{
    sx: {
      borderRadius: 2,
      textAlign: "center",
      p: 2,
    },
  }}
>
  <DialogTitle>
    Account Status
  </DialogTitle>

  <DialogContent>
  {{
    inactive: (
      <Typography>
        Your account is inactive. Please complete your profile.
      </Typography>
    ),
    pending: (
      <Typography>
        Approval is in pending. Your profile is under review. Please wait for approval.
      </Typography>
    ),
    rejected: (
      <Typography>
        Your profile was rejected. Please update details and resubmit.
      </Typography>
    ),
    blocked: (
      <Typography color="error">
        Your account has been blocked. Please contact support.
      </Typography>
    ),
  }[userStatus] || (
    <Typography color="text.secondary">
      We are verifying your account. Please check back later.
    </Typography>
  )}
</DialogContent>

</Dialog>

    </div>
  );
}
