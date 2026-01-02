"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";


import Image from 'next/image';
import "@/app/styles/projectprofile.css";
import { useEffect, useRef, useState } from 'react';
import Link from "next/link";


const ratingBreakdown = [
  { label: "5 Star", count: 58, percent: 90 },
  { label: "4 Star", count: 20, percent: 70 },
  { label: "3 Star", count: 15, percent: 50 },
  { label: "2 Star", count: 2, percent: 25 },
  { label: "1 Star", count: 1, percent: 15 },
];

const reviews = [
  {
    name: "Bessie Cooper",
    initials: "A.T",
    date: "12 March 2022",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.",
  },
  {
    name: "Darrell Steward",
    initials: "A.T",
    date: "12 March 2022",
    text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text.",
  },
];

const attachments = [
  {
    name: "Project Brief",
    type: "PDF",
    file: "/assets/theory-slides.pdf",
  },
  {
    name: "Contract Agreement",
    type: "PDF",
    file: "/assets/theory-slides.pdf",
  },
];

const MAX_RATING = 5;

const projectProfile = () => {

  
    const averageRating = 4.96;
      const totalReviews = 3014;
    
    
       
    
      
    
    

    
       const images = [
        "/assets/freprofilepro1.webp",
        "/assets/freprofilepro1.webp",
        "/assets/freprofilepro1.webp",
        "/assets/freprofilepro1.webp",
        "/assets/freprofilepro1.webp",
      ];
      const trendingServices = [
      {
        id: 1,
        image: "/assets/ts1.webp",
        category: "Web & App Design",
        title: "I will design modern websites in figma or...",
        rating: 4.82,
        reviews: 94,
        seller: "Wanda Runo",
        avatar: "/assets/avatar1.webp",
        price: "$983",
      },
      {
        id: 2,
        image: "/assets/ts2.webp",
        category: "Art & Illustration",
        title: "I will create modern flat design illustr...",
        rating: 4.82,
        reviews: 94,
        seller: "Ali Tufan",
        avatar: "/assets/avatar2.webp",
        price: "$983",
      },
      {
        id: 3,
        image: "/assets/ts3.webp",
        category: "Design & Creative",
        title: "I will build a fully responsive design i...",
        rating: 4.82,
        reviews: 94,
        seller: "Wanda Runo",
        avatar: "/assets/avatar1.webp",
        price: "$983",
      },]
    
      const handleScrollTo = (ref, id) => {
        setActiveTab(id);
        window.scrollTo({
          top: ref.current.offsetTop - 100,
          behavior: "smooth",
        });
      };
    
     
      const [rating, setRating] = useState(0);
      const [hoverRating, setHoverRating] = useState(0);
      const [form, setForm] = useState({
        comment: "",
        name: "",
        email: "",
        remember: false,
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would send data to your API
        console.log({ rating, ...form });
        alert("Review submitted (demo only)");
      };
    
  return (
    <div>
        <section  className="projectpro-hero">
        <Image src="/assets/frproheroleft.png"  className="projectpro-hero-left-img" width={280} height={280} alt="" />
        <Image src="/assets/frproheroright.png" className="projectpro-hero-right-img" width={350} height={350} alt="" />

        <div className="projectpro-hero-content">
          <h1 className="projectpro-hero-title">Website Designer Required For Director Theme</h1>

          <div className="projectpro-profile-row">
            

            <div className="projectpro-info">
              

              <div className="projectpro-meta">
                <span>
                  <Image src="/assets/projectproviews.png" alt="" width={18} height={18}/> 4.82 (94 reviews)
                </span>
                <span>
                  <Image src="/assets/freheroloc.png" alt="" width={18} height={18} /> London, UK
                </span>
                <span>
                  <Image src="/assets/freherocal.png" alt="" width={18} height={18} /> Member since April 1, 2022
                </span>
                
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Tab Navigation */}
        {/* <div className="sticky-tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleScrollTo(tab.ref, tab.id)}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))} */}

          {/* Animated Indicator */}
          {/* <div
            className="tab-indicator"
            style={{
              transform: `translateX(${
                tabs.findIndex((t) => t.id === activeTab) * tabWidth
              }px)`,
              width: tabWidth,
            }}
          />
        </div> */}
      </section>
            <div className='projectpro-profile-layout'>
      <main className="projectpro-profile-main">
    <section  className="section" >
        <div className="projectpro-stats-row">
    <div className="stat-box">
      <Image src="/assets/projectprodec1.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">Seller Type</p>
        <h4>Company</h4>
      </div>
    </div>

    <div className="stat-box">
      <Image src="/assets/secicon2.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">Project Type</p>
        <h4>Hourly</h4>
      </div>
    </div>

    <div className="stat-box">
      <Image src="/assets/freehours.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">Project Duration</p>
        <h4>10-15 hours</h4>
      </div>
    </div>

    <div className="stat-box">
      <Image src="/assets/projectprodec2.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">Languages</p>
        <h4>20</h4>
      </div>
    </div>

    <div className="stat-box">
      <Image src="/assets/cattr.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">Project Level</p>
        <h4>Experience</h4>
      </div>
    </div>
    

    <div className="stat-box">
      <Image src="/assets/freegrowth.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">English Level</p>
        <h4>Professional</h4>
      </div>
    </div>
  </div>

  <h3 className="about-title">Description</h3>

  <p className="about-text">
    It is a long established fact that a reader will be distracted by the readable content of a page 
    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
    distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
  </p>

  <p className="about-text">
    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a 
    search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved 
    over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
  </p>

  <hr className="divider" />

    </section>

    <section  className="section">
        <h3 className="section-heading">Attachments</h3>
        <div className="attachments-wrapper">

      <div className="attachments-grid">
        {attachments.map((item, index) => (
          <a
            key={index}
            href={item.file}
            download
            className="attachment-card"
          >
            <div className="attachment-info">
              <h4 className="attachment-name">{item.name}</h4>
              <p className="attachment-type">{item.type}</p>
            </div>
            <span className="attachment-icon">📎</span>
          </a>
        ))}
      </div>
    </div>


  <hr className="divider" />
    </section>
    
    <section  className="section">
        <h3 className="section-heading">Skills Required</h3>

 <div className="projectpro-skills-tags">
        <span>Figma</span>
        <span>Sketch</span>
        <span>HTML5</span>
        <span>UI/UX</span>
        <span>Prototyping</span>
      </div>

  
    </section>


    <hr className="divider" />
    <section  className="section">

        <div className="review-form-section">
      <h3 className="section-heading">Send Your Proposal</h3>

      <div className="review-form-row">
          <div className="review-form-group">
            <label className="review-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="review-input"
              placeholder="Ali Tufan"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="review-form-group">
            <label className="review-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="review-input"
              placeholder="creativelayers088"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>


      {/* Form */}
      <form onSubmit={handleSubmit} className="review-form">
        {/* Comment */}
        <div className="review-form-group">
          <label className="review-label" htmlFor="comment">
            Cover Letter
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={5}
            className="review-textarea"
            placeholder="Write your comment here..."
            value={form.comment}
            onChange={handleChange}
          />
        </div>
        

        {/* Remember checkbox */}
        <label className="review-checkbox-wrapper">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          />
          <span>
            Save my name, email, and website in this browser for the next time I
            comment.
          </span>
        </label>

        {/* Submit button */}
        <button type="submit" className="review-submit-btn">
          Send <span></span>
        </button>
      </form>
    </div>
    </section>
  </main>

   <aside className="profile-sidebar">
    <div className="projectpro-pricing-box">
    <h2 className="projectpro-pricing-price"> $100-$150
      
    </h2>
    <p className="projectpro-pricing-hour">per Hour</p>


    <button className="projectpro-contact-btn">
      Send a Proposal
    </button>
  </div>

    <div className="skills-box">
      <div className="buyer-card">
      <h3 className="buyer-title">About Buyer</h3>

      <div className="buyer-header">
        <Image
          src="/assets/projectproicon.webp"
          alt="Buyer Avatar"
          width={60}
          height={60}
          className="buyer-avatar"
        />

        <div className="buyer-details">
          <h4 className="buyer-name">Dropbox</h4>
          <p className="buyer-role">Digital Marketing</p>
          <p className="buyer-rating">
            ⭐ 4.9 <span className="buyer-review-count">(595 reviews)</span>
          </p>
        </div>
      </div>

      <hr className="buyer-divider" />

      <div className="buyer-info-grid">
        <div>
          <p className="buyer-info-label">Location</p>
          <p className="buyer-info-value">London</p>
        </div>
        <div>
          <p className="buyer-info-label">Employees</p>
          <p className="buyer-info-value">11–20</p>
        </div>
        <div>
          <p className="buyer-info-label">Departments</p>
          <p className="buyer-info-value">Designer</p>
        </div>
      </div>

      <button className="buyer-btn">Contact Buyer </button>
    </div>
    </div>
  </aside>
  </div>
    </div>
  )
}

export default projectProfile