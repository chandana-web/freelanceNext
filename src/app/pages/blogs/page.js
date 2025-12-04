"use client";

import Image from "next/image";

import "@/app/styles/blogs.css";
import { useState } from "react";
import Link from "next/link";


const blogData = [
  {
    img: "/assets/blog1.webp",
    date: "December 2, 2022",
    title: "Start an online business and work from home",
    desc: "A complete guide to starting a small business online",
    category: "UI/UX Developer"
  },
  {
    img: "/assets/blog2.webp",
    date: "December 2, 2022",
    title: "Front becomes an official Instagram Marketing Partner",
    desc: "A complete guide to starting a small business online",
    category: "Digital Marketing"
  },
  {
    img: "/assets/blog4.webp",
    date: "December 2, 2022",
    title: "Start an online business and work from home right now",
    desc: "A complete guide to starting a small business online",
    category: "App Developer"
  },
  {
    img: "/assets/blog5.webp",
    date: "December 2, 2022",
    title: "Start an online business and work from home",
    desc: "A complete guide to starting a small business online",
    category: "Graphics Design"
  },
  {
    img: "/assets/blog6.webp",
    date: "December 2, 2022",
    title: "Front becomes an official Instagram Marketing Partner",
    desc: "A complete guide to starting a small business online",
    category: "Music & Audio"
  },
  {
    img: "/assets/blog7.webp",
    date: "December 2, 2022",
    title: "Start an online business and work from home right now",
    desc: "A complete guide to starting a small business online",
    category: "Video & Audio"
  },
  {
    img: "/assets/blog8.webp",
    date: "December 2, 2022",
    title: "Start an online business and work from home",
    desc: "A complete guide to starting a small business online",
    category: "UI/UX Developer"
  },
  {
    img: "/assets/blog9.webp",
    date: "December 2, 2022",
    title: "Front becomes an official Instagram Marketing Partner",
    desc: "A complete guide to starting a small business online",
    category: "Digital Marketing"
  },
  {
    img: "/assets/blog10.webp",
    date: "December 2, 2022",
    title: "Start an online business and work from home right now",
    desc: "A complete guide to starting a small business online",
    category: "App Developer"
  },
  {
    img: "/assets/blog11.webp",
    date: "December 2, 2022",
    title: "Start an online business and work from home",
    desc: "A complete guide to starting a small business online",
    category: "Music & Audio"
  },
  {
    img: "/assets/blog12.webp",
    date: "December 2, 2022",
    title: "Front becomes an official Instagram Marketing Partner",
    desc: "A complete guide to starting a small business online",
    category: "Video & Audio"
  },
  {
    img: "/assets/blog3.webp",
    date: "December 2, 2022",
    title: "Start an online business and work from home right now",
    desc: "A complete guide to starting a small business online",
    category: "Graphics Design"
  },
  // add more...
];
const categories = ["All", "UI/UX Developer", "Graphics Design", "App Developer", "Digital Marketing", "Music & Audio", "Video & Audio"];


const Blogs = () => {

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredBlogs =
    activeCategory === "All"
      ? blogData
      : blogData.filter((item) => item.category === activeCategory);
  return (
    <div>
        <div className="blogs-header">
        <h2>Our Blogs</h2>
        <p>Give your visitor a smooth online experience with a solid UX design</p>
      </div>
       <div className="blogpage-wrapper">

      {/* Category Tabs */}
      <div className="blogpage-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`blogpage-tab ${activeCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="blogpage-grid">
        {filteredBlogs.map((item, i) => (
          <Link href="/pages/blogSingle" className="blogpage-card fade-up" key={i}>
            <div className="blogpage-img">
              <Image src={item.img} alt="blog" width={500} height={210} />
            </div>
            <div className="blogpage-card-info">
            <p className="blogpage-date small text-muted mt-3">{item.date}</p>

            <h6 className="blogpage-title fw-semibold">{item.title}</h6>

            <p className="small text-muted">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Blogs