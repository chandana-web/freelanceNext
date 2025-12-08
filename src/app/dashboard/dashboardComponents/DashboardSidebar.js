"use client"


import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const sidebarSections = [
  {
  heading: "Account",
  items: [
    { label: "Dashboard", icon: "/assets/dashHome.png", path: "/dashboard" },
    { label: "Profile", icon: "/assets/dashprofile.png", path: "/dashboard/profile" },
    { label: "My Proposals", icon: "/assets/dashpropo.png", path: "/dashboard/proposals" },
    { label: "Saved", icon: "/assets/hearticon.png", path: "/dashboard/saved" },
    { label: "Message", icon: "/assets/dashMess.png", path: "/dashboard/messages" },
    { label: "Reviews", icon: "/assets/dashRevi.png", path: "/dashboard/reviews" },
    { label: "Invoice", icon: "/assets/dashInvo.png", path: "/dashboard/invoice" },
    { label: "Payouts", icon: "/assets/secicon3.png", path: "/dashboard/payouts" },
    ],
  },
  {
  heading: "Manage",
  items:
    [ 
    { label: "Manage Services", icon: "/assets/dashserv.png", path: "/dashboard/manageservices" },
    { label: "Manage Projects", icon: "/assets/dashProj.png", path: "/dashboard/manageprojects" },
    ],
  },
  { 
    heading: "Settings",
    items:[
      {label: "Logout", icon: "/assets/dashlogout.png", path: "/" },
    ]
  }
  
];

import "@/app/dashboard/styles/dashboardSidebar.css";
const DashboardSidebar = ({isOpen}) => {

  const pathname= usePathname();
  return (
    <aside className={`dashboard-sidebar ${isOpen ? "open" : "closed"}`}>

      {/* sidebar links */}
      <div className="sidebar-scroll">  
        {sidebarSections.map((section, i) => (
          <div key={i} className="sidebar-section">
            <p className="sidebar-heading">{section.heading}</p>

            {section.items.map((item, index) => {
              const isActive = pathname === item.path;
              return (
                <Link key={index} href={item.path} className={`sidebar-item ${isActive ? "active" : ""}`}>
                  <Image src={item.icon} alt={item.label} width={22} height={22} className="sidebar-icon" />
                  <span className="label">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  )
}

export default DashboardSidebar