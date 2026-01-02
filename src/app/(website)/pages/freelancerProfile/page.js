"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";


import Image from 'next/image';
import "@/app/styles/freelancerprofile.css";
import { useEffect, useRef, useState } from 'react';
import Link from "next/link";

import { getFreelancerProfile, addFreelancerReview, markCommentHelpful } from "../../../api/freelancerProfileApi";






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

const MAX_RATING = 5;

const FreelancerProfile = () => {

    const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [form, setForm] = useState({
    comment: "",
    name: "",
    email: "",
    remember: false,
  });

useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await getFreelancerProfile(
        "694a448042c8657b2105e7a1"
      );

      console.log("API RESPONSE 👉", res.data.profile);

      setProfile(res.data.profile);
    } catch (err) {
      console.error("API ERROR 👉", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!rating) {
    alert("Please select a rating");
    return;
  }

  // ✅ store values FIRST
  const newReview = {
    name: form.name,
    email: form.email,
    rating,
    comment: form.comment,
    helpfulCount: 0,
    notHelpfulCount: 0,
    createdAt: new Date().toISOString(),
  };

  try {
    await addFreelancerReview(
      "694a448042c8657b2105e7a1",
      {
        name: form.name,
        email: form.email,
        rating,
        comment: form.comment,
      }
    );

    alert("Review submitted successfully 🎉");

    // ✅ optimistic UI update (NOW comment exists)
    setProfile((prev) => ({
      ...prev,
      comments: [newReview, ...prev.comments],
      ratings: {
        ...prev.ratings,
        total: prev.ratings.total + 1,
      },
    }));

    // ✅ reset AFTER UI update
    setForm({
      comment: "",
      name: "",
      email: "",
      remember: false,
    });
    setRating(0);
    setHoverRating(0);

  } catch (err) {
    console.error("POST REVIEW ERROR 👉", err);
    alert(err.response?.data?.message || "Failed to submit review");
  }


};

// console.log("PROFILE PHOTO 👉", profile.profilePhoto);


const handleCommentReaction = async (commentId, type) => {
  try {
    // optimistic update
    setProfile((prev) => ({
      ...prev,
      comments: prev.comments.map((c) => {
        if (c._id !== commentId) return c;

        return {
          ...c,
          helpfulCount:
            type === "helpful"
              ? c.helpfulCount + 1
              : c.helpfulCount,
          notHelpfulCount:
            type === "notHelpful"
              ? c.notHelpfulCount + 1
              : c.notHelpfulCount,
        };
      }),
    }));

    await markCommentHelpful(
      profile.freelancerId._id,
      commentId,
      type
    );
  } catch (err) {
    console.error("REACTION ERROR 👉", err);
  }
};




if (loading) return <p className="loading">Loading profile...</p>;
if (error) return <p className="error">{error}</p>;
if (!profile) return null;



    const averageRating = profile.ratings.average;
const totalReviews = profile.ratings.total;

const ratingBreakdown = Object.entries(profile.ratings.starCount)
  .reverse()
  .map(([star, count]) => ({
    label: `${star} Star`,
    count,
    percent: totalReviews
      ? Math.round((count / totalReviews) * 100)
      : 0
  }));





   const images = [
    "/assets/freprofilepro1.webp",
    "/assets/freprofilepro1.webp",
    "/assets/freprofilepro1.webp",
    "/assets/freprofilepro1.webp",
    "/assets/freprofilepro1.webp",
  ];
  const freelancerProjects = profile?.projects?.map((project) => ({
  id: project._id,
  image:
    project.projectPhotos?.length > 0
      ? project.projectPhotos[0]
      : "/assets/ts-placeholder.webp", // fallback image

  category: "Project",
  title: project.projectName,
  description: project.shortDescription,
  rating: profile?.ratings?.average || 0,
  reviews: profile?.ratings?.total || 0,
  seller: `${profile.freelancerId?.firstName} ${profile.freelancerId?.lastName}`,
  avatar: "/assets/avatar1.webp", // optional: static for now
  price: `${profile.currency} ${project.startingPrice}`,
  link: project.projectLink?.startsWith("http")
  ? project.projectLink
  : project.projectLink
  ? `https://${project.projectLink}`
  : null,
}));


const rawPath = profile.freelancerId?.selfiePhoto;

const normalizedPath = rawPath
  ? rawPath.replace(/\\/g, "/")
  : "";

const profileImage = normalizedPath
  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${normalizedPath}?v=${Date.now()}`
  : "/assets/avatar1.webp";



  // const handleScrollTo = (ref, id) => {
  //   setActiveTab(id);
  //   window.scrollTo({
  //     top: ref.current.offsetTop - 100,
  //     behavior: "smooth",
  //   });
  // };

  // useEffect(() => {
  //   // update dynamic tab width
  //   if (tabsRef.current[0]) {
  //     setTabWidth(tabsRef.current[0].offsetWidth);
  //   }

  //   const handleScroll = () => {
  //     tabs.forEach((tab) => {
  //       if (!tab.ref.current) return;
  //       const secTop = tab.ref.current.offsetTop - 120;
  //       if (window.scrollY >= secTop) {
  //         setActiveTab(tab.id);
  //       }
  //     });
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);

  // }, [tabs]);

 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const skills =
  profile?.freelancerId?.skills ||
  profile?.freelancerId?.skill ||
  [];
const normalizedSkills = Array.isArray(skills)
  ? skills
  : skills
  ? skills.split(",").map((s) => s.trim())
  : [];


  // const handleSubmit = (e) => {
  //   e.preventDefault();
    // Here you would send data to your API
  //   console.log({ rating, ...form });
  //   alert("Review submitted (demo only)");
  // };




  
  return (
    <div>
        <section  className="freelancer-hero">
        <Image src="/assets/frproheroleft.png"  className="hero-left-img" width={280} height={280} alt="" />
        <Image src="/assets/frproheroright.png" className="hero-right-img" width={350} height={350} alt="" />

        <div className="freelancer-hero-content">
          <h1 className="hero-title">{profile.shortDescription}</h1>

          <div className="profile-row">
          <Image src={profileImage} className="profile-img" width={50} height={50} alt="" priority />

            <div className="info">
              <h3>{profile.freelancerId?.firstName} {profile.freelancerId?.lastName}</h3>
              <p className="role">{profile.freelancerId?.skill}</p>

              <div className="meta">
                <span>
                  <Image src="/assets/freherostar.png" alt="" width={18} height={18}/> {profile.ratings?.average} ({profile.ratings?.total} reviews)
                </span>
                <span>
                  <Image src="/assets/freheroloc.png" alt="" width={18} height={18} /> {profile.city}, {profile.country}
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
            <div className='profile-layout'>
      <main className="profile-main">
    <section className="section" id='about'>
        <div className="stats-row">
    <div className="stat-box">
      <Image src="/assets/freegoal.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">Job Success</p>
        <h4>98%</h4>
      </div>
    </div>

    <div className="stat-box">
      <Image src="/assets/freegrowth.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">Total Jobs</p>
        <h4>921</h4>
      </div>
    </div>

    <div className="stat-box">
      <Image src="/assets/freehours.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">Total Hours</p>
        <h4>1,499</h4>
      </div>
    </div>

    <div className="stat-box">
      <Image src="/assets/freefiletime.png" width={38} height={38} alt="" />
      <div>
        <p className="stat-title">In Queue Service</p>
        <h4>20</h4>
      </div>
    </div>
  </div>

  <h3 className="about-title">Description</h3>

  <p className="about-text">{profile.fullDescription}</p>


  <p className="about-text">
    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a 
    search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved 
    over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
  </p>

  <hr className="divider" />

    </section>

    <section  id="education" className="section">
        <h3 className="section-heading">Education</h3>

  <div className="timeline">
    {profile.education.map((edu, index) => (
  <div className="timeline-item" key={index}>
    <div className="timeline-left">
      <div className="timeline-marker">🎓</div>
      <div className="timeline-line" />
    </div>

    <div className="timeline-content">
      <h4 className="timeline-title">{edu.course}</h4>
      <p className="timeline-subtitle">{edu.collegeName}</p>
      <span className="timeline-badge">
        {edu.startYear} – {edu.endYear}
      </span>
      <p className="timeline-text">{edu.description}</p>
    </div>
  </div>
))}

  </div>

  <hr className="divider" />
    </section>
    
    <section  className="section">
        <h3 className="section-heading">Work & Experience</h3>

  <div className="timeline">
{profile.workExperience.map((job, index) => (
  <div className="timeline-item" key={index}>
    <div className="timeline-left">
      <div className="timeline-marker">💼</div>
      <div className="timeline-line" />
    </div>

    <div className="timeline-content">
      <h4 className="timeline-title">{job.designation}</h4>
      <p className="timeline-subtitle">{job.companyName}</p>
      <span className="timeline-badge">
        {job.startYear} – {job.endYear}
      </span>
      <p className="timeline-text">{job.description}</p>
    </div>
  </div>
))}

  </div>

  <hr className="divider" />
    </section>


    <section  className="section">
        <h3 className="section-heading">Featured Services</h3>
        <div
      className="free-trending-wrapper"

    >
      {freelancerProjects?.length > 0 &&
      (freelancerProjects.map((item) => (
        <div className="free-trending-card" key={item.id}>
          <div className="free-trending-img-wrap">
            <Image src={item.image} alt={item.title} className="trending-img"  fill />

            <button
              type="button"
              className="free-heart-btn"
              onClick={() => toggleLike(i)}
            >
              <Image src="/assets/hearticon.png" alt="favorite" width={18} height={18}/>
            </button>
          </div>

          <div className="free-trending-body">
            <p className="free-trending-category">{item.category}</p>
            <Link href={item.link || "#"} className="free-trending-title-link">
  {item.description}
</Link>


            <div className="free-trending-rating">
              <span className="free-star">★</span>
              <span>{item.rating}</span>
              <span className="free-text-muted">
                &nbsp; {item.reviews} reviews
              </span>
            </div>

            <div className="free-trending-footer d-flex">
              <div className="free-seller">
                <Image src={item.avatar} alt={item.seller} width={26} height={26} />
                <span>{item.seller}</span>
              </div>
              <div className="free-price">
                <span className="text-muted small">Starting at&nbsp;<br/></span>
                <span className="fw-semibold">{item.price}</span>
              </div>
            </div>
          </div>
        </div>
      )))}
    </div>
    </section>

    <hr className="divider" />
    <section  className="section">
        <h3 className="section-heading">Reviews</h3>
        <div className="reviews-section">
      {/* Top: Summary + Breakdown */}
    <div className="reviews-top">
        {/* Left card */}
        <div className="rating-summary-card">
          <div className="rating-summary-value">
            {averageRating.toFixed(2)}
          </div>
          <div className="rating-summary-label">Exceptional</div>
          <div className="rating-summary-count">
            {totalReviews.toLocaleString()} reviews
          </div>
        </div>

        {/* Right: breakdown */}
        <div className="rating-breakdown">
          {ratingBreakdown.map((item) => (
            <div className="rating-row" key={item.label}>
              <span className="rating-row-label">{item.label}</span>
              <div className="rating-row-bar">
                <div
                  className="rating-row-bar-fill"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
              <span className="rating-row-count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="reviews-list">
      {profile.comments.map((review, idx) => (
  <article className="review-card" key={idx}>
    <div className="review-header">
      <div className="review-avatar">
        <span>{review.name[0]}</span>
      </div>
      <div className="review-meta">
        <div className="review-name">{review.name}</div>
        <div className="review-date">
          {new Date(review.createdAt).toDateString()}
        </div>
      </div>
    </div>

    <p className="review-text">{review.comment}</p>

    <div className="review-actions">
      <button
  className="review-action-btn"
  onClick={() =>
    handleCommentReaction(review._id, "helpful")
  }
>
  👍 Helpful ({review.helpfulCount})
</button>

<button
  className="review-action-btn"
  onClick={() =>
    handleCommentReaction(review._id, "notHelpful")
  }
>
  👎 Not helpful ({review.notHelpfulCount})
</button>

    </div>
  </article>
))}

      </div>

      {/* See more */}
      <div className="reviews-footer">
        <button className="see-more-btn">See More ↗</button>
      </div>
    </div>
    </section>

    <hr className="divider" />
    <section className="section">

        <div className="review-form-section">
      <h3 className="review-form-title">Add a Review</h3>
      <p className="review-form-subtitle">
        Your email address will not be published. Required fields are marked *
      </p>

      {/* Rating */}
      <div className="review-rating-block">
        <p className="review-rating-label">Your rating of this product</p>
        <div className="review-stars">
          {Array.from({ length: MAX_RATING }).map((_, index) => {
            const starValue = index + 1;
            const isActive =
              starValue <= (hoverRating || rating);

            return (
              <button
                key={starValue}
                type="button"
                className={
                  "review-star" + (isActive ? " review-star-active" : "")
                }
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`Rate ${starValue} star`}
              >
                ★
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="review-form">
        {/* Comment */}
        <div className="review-form-group">
          <label className="review-label" htmlFor="comment">
            Comment
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

        {/* Name + Email */}
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

        {/* Remember checkbox */}
        {/* <label className="review-checkbox-wrapper">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          /> */}
          {/* <span>
            Save my name, email, and website in this browser for the next time I
            comment.
          </span> */}
        {/* </label> */}

        {/* Submit button */}
        <button type="submit" className="review-submit-btn" disabled={loading}>
         {loading ? "Sending..." : <>Send <span>↗</span></>}
        </button>
      </form>
    </div>
    </section>
  </main>

   <aside className="profile-sidebar">
    <div className="pricing-box">
   <h2 className="pricing-price">
  {profile?.currency} {profile?.hourlyRate}
  <span>/per hour</span>
</h2>


    <ul className="pricing-list">
      <li>
        <div className="pricing-left">
          <Image src="/assets/freheroloc.png" width={18} height={18} alt="" />
          <span>Location</span>
        </div>
        <span className="pricing-value">
  {profile?.city}, {profile?.country}
</span>

      </li>

      <li>
        <div className="pricing-left">
          <Image src="/assets/freherocal.png" width={18} height={18} alt="" />
          <span>Member since</span>
        </div>
        <span className="pricing-value">April 2022</span>
      </li>

      <li>
        <div className="pricing-left">
          <Image src="/assets/freedelivery.png" width={18} height={18} alt="" />
          <span>Last Delivery</span>
        </div>
        <span className="pricing-value">5 days</span>
      </li>

      <li>
        <div className="pricing-left">
          <Image src="/assets/freegender.png" width={18} height={18} alt="" />
          <span>Gender</span>
        </div>
        <span className="pricing-value">{profile?.gender}</span>
      </li>

      <li>
        <div className="pricing-left">
          <Image src="/assets/cattr.png" width={18} height={18} alt="" />
          <span>Languages</span>
        </div>
        <span className="pricing-value">English</span>
      </li>

      <li>
        <div className="pricing-left">
          <Image src="/assets/freelevel.png" width={18} height={18} alt="" />
          <span>English Level</span>
        </div>
        <span className="pricing-value">Fluent</span>
      </li>
    </ul>

    <button className="contact-btn">
      Contact Me ↗
    </button>
  </div>

    <div className="skills-box">
  <h3>My Skills</h3>

  <div className="skills-tags">
    {normalizedSkills.length > 0 ? (
      normalizedSkills.map((skill, index) => (
        <span key={index}>{skill}</span>
      ))
    ) : (
      <span className="text-muted">No skills added</span>
    )}
  </div>
</div>

  </aside>
  </div>
    </div>
  )
}

export default FreelancerProfile