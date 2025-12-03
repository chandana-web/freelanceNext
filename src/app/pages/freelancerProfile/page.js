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

const MAX_RATING = 5;

const FreelancerProfile = () => {

    const averageRating = 4.96;
  const totalReviews = 3014;


    const [activeTab, setActiveTab] = useState("services");
  const [tabWidth, setTabWidth] = useState(0);

  const [shrinkHero, setShrinkHero] = useState(false);
  const MOBILE_BREAKPOINT=900;

useEffect(() => {
  const handleScroll = () => {
    if(window.innerWidth>MOBILE_BREAKPOINT){

    
    if (window.scrollY > 120) {
      setShrinkHero(true);
    } else {
      setShrinkHero(false);
    }
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const portfolioRef = useRef(null);
  const experienceRef = useRef(null);
  const reviewsRef = useRef(null);
  const recommendationsRef = useRef(null);
  const tabsRef = useRef([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const tabs = [
    { id: "about", label: "About Me", ref: aboutRef },
    { id: "education", label: "Education", ref: educationRef },
    { id: "experience", label: "Work Experience", ref: experienceRef },
    { id: "portfolio", label: "Portfolio", ref: portfolioRef },
    
    { id: "reviews", label: "Reviews", ref: reviewsRef },
    { id: "recommendations", label: "Recommendations", ref: recommendationsRef },
  ];

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

  useEffect(() => {
    // update dynamic tab width
    if (tabsRef.current[0]) {
      setTabWidth(tabsRef.current[0].offsetWidth);
    }

    const handleScroll = () => {
      tabs.forEach((tab) => {
        if (!tab.ref.current) return;
        const secTop = tab.ref.current.offsetTop - 120;
        if (window.scrollY >= secTop) {
          setActiveTab(tab.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

  }, [tabs]);

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
        <section  className={`freelancer-hero ${shrinkHero ? "shrink" : ""}`}>
        <Image src="/assets/frproheroleft.png"  className="hero-left-img" width={280} height={280} alt="" />
        <Image src="/assets/frproheroright.png" className="hero-right-img" width={350} height={350} alt="" />

        <div className={`freelancer-hero-content ${shrinkHero ? "shrink" : ""}`}>
          <h1 className={`hero-title ${shrinkHero ? "hide-title" : ""}`}>I will design website UI UX in Adobe XD or Figma</h1>

          <div className="profile-row">
            <Image src="/assets/freproheroava.webp" className="profile-img" width={50} height={50} alt="" />

            <div className="info">
              <h3>Leslie Alexander</h3>
              <p className="role">UI/UX Designer</p>

              <div className="meta">
                <span>
                  <Image src="/assets/freherostar.png" alt="" width={18} height={18}/> 4.82 (94 reviews)
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
        <div className="sticky-tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleScrollTo(tab.ref, tab.id)}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}

          {/* Animated Indicator */}
          <div
            className="tab-indicator"
            style={{
              transform: `translateX(${
                tabs.findIndex((t) => t.id === activeTab) * tabWidth
              }px)`,
              width: tabWidth,
            }}
          />
        </div>
      </section>
            <div className='profile-layout'>
      <main className="profile-main">
    <section ref={aboutRef} className="section" id='about'>
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

    <section ref={educationRef} id="education" className="section">
        <h3 className="section-heading">Education</h3>

  <div className="timeline">
    <div className="timeline-item">
      <div className="timeline-left">
        <div className="timeline-marker">M</div>
        <div className="timeline-line" />
      </div>

      <div className="timeline-content">
        
        <h4 className="timeline-title">Bachlors in Fine Arts</h4>
        
        <p className="timeline-subtitle">Modern College</p>
        <span className="timeline-badge">2012 – 2014</span>
        <p className="timeline-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum
          tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </p>
      </div>
    </div>

    <div className="timeline-item">
      <div className="timeline-left">
        <div className="timeline-marker">M</div>
        <div className="timeline-line" />
      </div>

      <div className="timeline-content">
        
        <h4 className="timeline-title">Computer Science</h4>
        <p className="timeline-subtitle">Harvatrd University</p>
        <span className="timeline-badge">2008 – 2012</span>
        <p className="timeline-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum
          tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </p>
      </div>
    </div>
  </div>

  <hr className="divider" />
    </section>
    
    <section ref={experienceRef} className="section">
        <h3 className="section-heading">Work & Experience</h3>

  <div className="timeline">
    <div className="timeline-item">
      <div className="timeline-left">
        <div className="timeline-marker">M</div>
        <div className="timeline-line" />
      </div>

      <div className="timeline-content">
        
        <h4 className="timeline-title">UX Designer</h4>
        <p className="timeline-subtitle">Dropbox</p>
        <span className="timeline-badge">2012 – 2014</span>
        <p className="timeline-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum
          tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </p>
      </div>
    </div>

    <div className="timeline-item">
      <div className="timeline-left">
        <div className="timeline-marker">M</div>
        <div className="timeline-line" />
      </div>

      <div className="timeline-content">
        
        <h4 className="timeline-title">Art Director</h4>
        <p className="timeline-subtitle">amazon</p>
        <span className="timeline-badge">2008 – 2012</span>
        <p className="timeline-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum
          tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </p>
      </div>
    </div>
  </div>

  <hr className="divider" />
    </section>


    <section ref={portfolioRef} className="section">
        <h3 className="section-heading">Featured Services</h3>
        <div
      className="free-trending-wrapper"

    >
      {trendingServices.map((item, i) => (
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
            <Link href="/" className="free-trending-title-link">
  {item.title}
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
      ))}
    </div>
    </section>

    <hr className="divider" />
    <section ref={reviewsRef} className="section">
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
        {reviews.map((review, idx) => (
          <article className="review-card" key={idx}>
            <div className="review-header">
              <div className="review-avatar">
                <span>{review.initials}</span>
              </div>
              <div className="review-meta">
                <div className="review-name">{review.name}</div>
                <div className="review-date">{review.date}</div>
              </div>
            </div>

            <p className="review-text">{review.text}</p>

            <div className="review-actions">
              <button className="review-action-btn">👍 Helpful</button>
              <button className="review-action-btn">👎 Not helpful</button>
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
    <section ref={recommendationsRef} className="section">

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
          Send <span>↗</span>
        </button>
      </form>
    </div>
    </section>
  </main>

   <aside className="profile-sidebar">
    <div className="pricing-box">
    <h2 className="pricing-price">
      $29<span>/per hour</span>
    </h2>

    <ul className="pricing-list">
      <li>
        <div className="pricing-left">
          <Image src="/assets/freheroloc.png" width={18} height={18} alt="" />
          <span>Location</span>
        </div>
        <span className="pricing-value">London, UK</span>
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
        <span className="pricing-value">Male</span>
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
        <span>Figma</span>
        <span>Sketch</span>
        <span>HTML5</span>
        <span>UI/UX</span>
        <span>Prototyping</span>
      </div>
    </div>
  </aside>
  </div>
    </div>
  )
}

export default FreelancerProfile