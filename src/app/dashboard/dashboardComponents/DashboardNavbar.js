"use client"

import {HiOutlineMenuAlt2} from "react-icons/hi"
import { FiBell, FiMail, FiHeart, FiSearch } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

import "@/app/dashboard/styles/dashboardNavbar.css";


const DashboardNavbar = ({toggleSidebar}) => {
  return (
        <nav className="dashboard-navbar">
      
      {/* LEFT SECTION */}
      <div className="nav-left">
        <button onClick={toggleSidebar} className="menu-btn">
          <HiOutlineMenuAlt2 size={22} />
        </button>

        <Link href="/" className="brand">
          {/* <Image src="/logo.png" alt="Freeio Logo" width={35} height={35} /> */}
          <span className="brand-text">Go Experts</span>
        </Link>
      </div>

      {/* SEARCH BAR */}
      <div className="nav-search">
        <input
          type="text"
          placeholder="What service are you looking for today?"
        />
        <FiSearch size={18} className="search-icon" />
      </div>

      {/* RIGHT SECTION */}
      <div className="nav-right">
        <FiBell size={22} className="nav-icon" />
        <FiMail size={22} className="nav-icon" />
        <FiHeart size={22} className="nav-icon" />

        {/* PROFILE */}
        <Link href="/dashboard/profile" className="profile">
          <Image
            src="/assets/ava1.webp"
            alt="Profile"
            width={38}
            height={38}
            className="profile-img"
          />
        </Link>
      </div>
    </nav>
  )
}

export default DashboardNavbar