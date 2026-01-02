"use client";
import { useState } from "react";
import DashboardSidebar from "./dashboardComponents/DashboardSidebar";
import DashboardNavbar from "./dashboardComponents/DashboardNavbar";
import DashboardFooter from "./dashboardComponents/DashboardFooter";
import "@/app/dashboard/styles/dashboard.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          {/* 🔥 MUI Date Picker Provider */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </main>
      </div>

      <DashboardFooter />
    </div>
  );
}





