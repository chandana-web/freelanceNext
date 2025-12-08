// src/app/dashboard/layout.js
"use client";
import { useState } from "react";
import DashboardSidebar from "./dashboardComponents/DashboardSidebar";
import DashboardNavbar from "./dashboardComponents/DashboardNavbar";
import DashboardFooter from "./dashboardComponents/DashboardFooter";
import "@/app/dashboard/styles/dashboard.css";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      
      <DashboardNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="dashboard-body">
        <DashboardSidebar isOpen={sidebarOpen} />

        <main
          className={`dashboard-content ${sidebarOpen ? "expanded" : "collapsed"}`}
        >
          {children}
        </main>
      </div>

      <DashboardFooter />
    </div>
  );
}




