"use client";

/* --------------------------------------------------------------------------
| Imports
-------------------------------------------------------------------------- */
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "@/app/styles/home.css";

const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const duration = 2000;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const value = progress === 1 ? target : Math.floor(progress * target);

      setCount(value);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target]);

  return <span>{count}{suffix}</span>;
};

/* --------------------------------------------------------------------------
| Component
-------------------------------------------------------------------------- */
export default function Home() {

  /* ------------------------------------------------------------------------
  | Static Data
  ------------------------------------------------------------------------ */
  const sentences = [
    "Find Work, Faster.",
    "Hire Professionals, Smarter.",
    "Find Talent, Effortlessly.",
  ];

  const categories = [
    { icon: "/assets/catwb.png", skills: "1,853 skills", title: "Development & IT", desc: "Software Engineer, Web / Mobile Developer & More" },
    { icon: "/assets/catcd.png", skills: "1,853 skills", title: "Design & Creative", desc: "Graphic Designer, UI/UX & More" },
    { icon: "/assets/catdm.png", skills: "1,853 skills", title: "Digital Marketing", desc: "SEO, Social Media & More" },
    { icon: "/assets/cattr.png", skills: "1,853 skills", title: "Writing & Translation", desc: "Content Writer, Translator & More" },
    { icon: "/assets/catmi.png", skills: "1,853 skills", title: "Music & Audio", desc: "Software Engineer, Web / Mobile Developer & More" },
    { icon: "/assets/catvi.png", skills: "1,853 skills", title: "Video & Animation", desc: "Graphic Designer, UI/UX & More" },
    { icon: "/assets/catar.png", skills: "1,853 skills", title: "Engineering & Architecture", desc: "Architect, Civil Engineer & More" },
    { icon: "/assets/catfa.png", skills: "1,853 skills", title: "Finance & Accounting", desc: "Accountant, Bookkeeper & More" },
  ];

  const TRENDING_PER_SLIDE = 4;

  const trendingServices = [
    { id: 1, image: "/assets/ts1.webp", category: "Web & App Design", title: "I will design modern websites in figma or...", rating: 4.82, reviews: 94, seller: "Wanda Runo", avatar: "/assets/avatar1.webp", price: "$983" },
    { id: 2, image: "/assets/ts2.webp", category: "Art & Illustration", title: "I will create modern flat design illustr...", rating: 4.82, reviews: 94, seller: "Ali Tufan", avatar: "/assets/avatar2.webp", price: "$983" },
    { id: 3, image: "/assets/ts3.webp", category: "Design & Creative", title: "I will build a fully responsive design i...", rating: 4.82, reviews: 94, seller: "Wanda Runo", avatar: "/assets/avatar1.webp", price: "$983" },
    { id: 4, image: "/assets/ts4.webp", category: "Web & App Design", title: "I will do mobile app development for ios...", rating: 4.82, reviews: 94, seller: "Wanda Runo", avatar: "/assets/avatar2.webp", price: "$983" },
    { id: 5, image: "/assets/ts5.webp", category: "Web & App Design", title: "Another trending service example...", rating: 4.82, reviews: 94, seller: "Ali Tufan", avatar: "/assets/avatar1.webp", price: "$983" },
    { id: 6, image: "/assets/ts6.webp", category: "Design & Creative", title: "Another service card here...", rating: 4.82, reviews: 94, seller: "Wanda Runo", avatar: "/assets/avatar2.webp", price: "$983" },
    { id: 7, image: "/assets/ts7.webp", category: "Web & App Design", title: "Some other cool service...", rating: 4.82, reviews: 94, seller: "Ali Tufan", avatar: "/assets/avatar1.webp", price: "$983" },
    { id: 8, image: "/assets/ts3.webp", category: "Design & Creative", title: "Last dummy card placeholder...", rating: 4.82, reviews: 94, seller: "Wanda Runo", avatar: "/assets/avatar2.webp", price: "$983" },
  ];

  const testimonials = [
    { img: "/assets/ava1.webp", name: "Sophia Ramirez", role: "Software Engineer", desc: "Unforgettable Japan Journey: Our family traveled by bullet train, and the hotel's strategic location enhanced our experience. Agoda's pricing was a pleasant surprise." },
    { img: "/assets/ava2.webp", name: "Olivia Smith", role: "Travel Blogger", desc: "A Memorable Bullet Train Adventure: Our family's Japan travel experience made easy by this hotel. Agoda's pricing exceeded our expectations." },
    { img: "/assets/ava3.webp", name: "Emma Johnson", role: "Marketing Specialist", desc: "Unforgettable Japan Journey: Our family embarked on a remarkable bullet train journey in Japan - this hotel's convenient location made it a breeze. Agoda's pricing was fantastic." },
    { img: "/assets/ava4.webp", name: "Isabella Johnson", role: "Graphic Designer", desc: "A Wonderful Bullet Train Voyage: Our family explored Japan with ease from this hotel's ideal spot. Agoda's pricing made our trip even better." },
    { img: "/assets/ava5.webp", name: "Ava Lee", role: "Marketing Manager", desc: "An Amazing Japan Journey: Bullet train travel with family was made effortless by the hotel's location. Agoda's pricing added tremendous value." },
  ];

  /* ------------------------------------------------------------------------
  | State & Refs
  ------------------------------------------------------------------------ */
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [backspace, setBackspace] = useState(false);

  const [visible, setVisible] = useState(false);
  const [trustedVisible, setTrustedVisible] = useState(false);
  const [trendingVisible, setTrendingVisible] = useState(false);
  const [clientVisible, setClientVisible] = useState(false);
  const [needVisible, setNeedVisible] = useState(false);
  const [blogVisible, setBlogVisible] = useState(false);

  const [liked, setLiked] = useState(Array(trendingServices.length).fill(false));
  const [trendingSlide, setTrendingSlide] = useState(0);

  const [active, setActive] = useState(2);

  const sectionRef = useRef(null);
  const trustedRef = useRef(null);
  const trendingRef = useRef(null);
  const clientRef = useRef(null);
  const needRef = useRef(null);
  const blogRef = useRef(null);

  const trendingTotalSlides = Math.ceil(trendingServices.length / TRENDING_PER_SLIDE);

  /* ------------------------------------------------------------------------
  | Typing Effect
  ------------------------------------------------------------------------ */
  const displayedText = sentences[index].substring(0, subIndex);

  useEffect(() => {
    if (!backspace && subIndex === sentences[index].length) {
      setTimeout(() => setBackspace(true), 1500);
      return;
    }

    if (backspace && subIndex === 0) {
      setBackspace(false);
      setIndex(prev => (prev + 1) % sentences.length);
      return;
    }

    const timeout = setTimeout(() => setSubIndex(prev => prev + (backspace ? -1 : 1)), backspace ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [subIndex, backspace, index, sentences]);


  /* ------------------------------------------------------------------------
  | Observers (Fade In Animation)
  ------------------------------------------------------------------------ */
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTrustedVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (trustedRef.current) observer.observe(trustedRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTrendingVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (trendingRef.current) observer.observe(trendingRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setClientVisible(true);
        observer.disconnect();
      }
    });

    if (clientRef.current) observer.observe(clientRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNeedVisible(true);
        observer.disconnect();
      }
    });

    if (needRef.current) observer.observe(needRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBlogVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (blogRef.current) observer.observe(blogRef.current);
  }, []);

  /* ------------------------------------------------------------------------
  | Handlers
  ------------------------------------------------------------------------ */
  const toggleLike = (index) => {
    setLiked(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const goNextTrending = () => setTrendingSlide(prev => (prev + 1) % trendingTotalSlides);
  const goPrevTrending = () => setTrendingSlide(prev => (prev - 1 + trendingTotalSlides) % trendingTotalSlides);



  /* ------------------------------------------------------------------------
  | Render
  ------------------------------------------------------------------------ */
  return (
    <>
      {/* --------------------------------------------------------------------
      | HERO SECTION
      -------------------------------------------------------------------- */}
      <section className="hero-container">

        <Image
          src="/assets/homeHero4.webp"
          alt="Hero Background"
          fill
          priority
          quality={100}
          className="hero-image"
        />

        <div className="hero-overlay" />

        <div className="hero-content text-center">
          <h1 className="typing-text">
            {displayedText}
            <span className="cursor">_</span>
          </h1>

          <p className="subtitle">
            Millions of people use our platform to turn their ideas into reality.
          </p>

          <div className="search-box hero-search-target d-flex flex-column flex-md-row align-items-center gap-2 p-1">
            <input className="form-control" placeholder="What are you looking for?" />
            <select className="form-select">
              <option>Select Role</option>
              <option>Designer</option>
              <option>Developer</option>
              <option>Writer</option>
              <option>Marketing</option>
            </select>
            <button className="btn btn-success search-btn">Search</button>
          </div>

          <p className="popular">Popular Searches: Designer, Developer, Web, iOS, PHP, Engineer</p>
          <div className="hero-stats d-flex gap-5 justify-content-center">
  <div className="text-center">
    <h2 className="fw-bold"><Counter target={834} suffix="M" /></h2>
    <p>Total Freelancer</p>
  </div>

  <div className="text-center">
    <h2 className="fw-bold"><Counter target={732} suffix="M" /></h2>
    <p>Positive Review</p>
  </div>

  <div className="text-center">
    <h2 className="fw-bold"><Counter target={90} suffix="M" /></h2>
    <p>Order Received</p>
  </div>

  <div className="text-center">
    <h2 className="fw-bold"><Counter target={236} suffix="M" /></h2>
    <p>Projects Completed</p>
  </div>
</div>
        </div>

        



        <div className="find d-flex justify-content-end gap-3">
          <Link href="/pages/projects" className="btn btn-outline-light btn-lg rounded-pill px-4">Find Work</Link>
          <Link href="/pages/services" className="btn btn-success btn-lg rounded-pill px-4">Find Talent</Link>
        </div>
      </section>



      {/* --------------------------------------------------------------------
      | CATEGORY SECTION
      -------------------------------------------------------------------- */}
      <section ref={sectionRef} className={`category-section ${visible ? "show-section" : "hidden-section"}`}>
        
  <div className="category-header">
    <div>
      <h2 className="fw-bold">Browse talent by category</h2>
      <p className="text-muted small">Get some inspirations from 1800+ skills</p>
    </div>

    <Link href="/pages/services" className="all-link">
      All Categories →
    </Link>
  </div>

  <div className="category-grid">
    {categories.slice(0, 8).map((item, index) => (
      <a href="/pages/services" key={index} className="category-card fade-in">
        
        <Image src={item.icon} width={40} height={40} alt={item.title} />
        
        
      <div>
        <p className="skills text-muted mt-3">{item.skills}</p>
        <h5 className="fw-semibold">{item.title}</h5>
        <p className="desc small">{item.desc}</p>
        </div>
      </a>
    ))}
  </div>
</section>




      {/* --------------------------------------------------------------------
      | TRUSTED SECTION
      -------------------------------------------------------------------- */}
      <section ref={trustedRef} className={`trusted-section container ${trustedVisible ? "visible" : ""}`}>

        <div className="trusted-left">
          <Image src="/assets/sectionimg1.webp" width={180} height={180} alt="person" className="trusted-img img1" />
          <Image src="/assets/sectionimg2.webp" width={180} height={180} alt="person" className="trusted-img img2" />
          <Image src="/assets/sectionimg3.webp" width={180} height={180} alt="person" className="trusted-img img3" />
          <Image src="/assets/sectionimg4.webp" width={180} height={180} alt="person" className="trusted-img img4" />
        </div>

        <div className="trusted-right">
          <h2 className="fw-bold trusted-heading">
            A whole world of freelance <br /> talent at your fingertips
          </h2>

          <div className="trusted-info mt-5">

            <div className="trusted-feature">
              <Image src="/assets/secicon1.png" width={30} height={30} alt="icon" className="feature-icon" />
              <div>
                <h5 className="fw-semibold feature-title">Proof of quality</h5>
                <p className="text-muted feature-desc">
                  Check any pro's work samples, client reviews, and identity verification.
                </p>
              </div>
            </div>

            <div className="trusted-feature">
              <Image src="/assets/secicon2.png" width={30} height={30} alt="icon" className="feature-icon" />
              <div>
                <h5 className="fw-semibold feature-title">No cost until you hire</h5>
                <p className="text-muted feature-desc">
                  Interview potential fits for your job, negotiate rates, and only pay for work you approve.
                </p>
              </div>
            </div>

            <div className="trusted-feature">
              <Image src="/assets/secicon3.png" width={30} height={30} alt="icon" className="feature-icon" />
              <div>
                <h5 className="fw-semibold feature-title">Safe and secure</h5>
                <p className="text-muted feature-desc">
                  Focus on your work knowing we help protect your data and privacy. We’re here with 24/7 support if you need it.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* --------------------------------------------------------------------
      | TRENDING SERVICES SECTION
      -------------------------------------------------------------------- */}
      <section ref={trendingRef} className={`trending-section container ${trendingVisible ? "visible" : ""}`}>

        <div className="d-flex justify-content-between align-items-start fade-item">
          <div>
            <h2 className="fw-bold trending-heading">Trending Services</h2>
            <p className="text-muted trending-sub">Most viewed and all-time top-selling services</p>
          </div>

          <div className="browse-nav">
            <button className="cat-arrow" onClick={goPrevTrending}>‹</button>

            <div className="dots">
              {[...Array(trendingTotalSlides)].map((_, index) => (
                <span
                  key={index}
                  className={`dot ${trendingSlide === index ? "active" : ""}`}
                  onClick={() => setTrendingSlide(index)}
                ></span>
              ))}
            </div>

            <button className="cat-arrow" onClick={goNextTrending}>›</button>
          </div>
        </div>


        {/* Slider */}
        <div className="trending-slider fade-item">
          <div
            className="trending-wrapper"
            style={{
              width: `${trendingTotalSlides * 100}%`,
              transform: `translateX(-${trendingSlide * (100 / trendingTotalSlides)}%)`,
            }}
          >
            {trendingServices.map((item, index) => (
              <div className="trending-card" key={item.id}>

                <div className="trending-img-wrap">
                  <Image src={item.image} alt={item.title} className="trending-img" fill />

                  <button
                    className={`heart-btn ${liked[index] ? "active" : ""}`}
                    onClick={() => toggleLike(index)}
                  >
                    <Image src="/assets/hearticon.png" width={18} height={18} alt="favorite" />
                  </button>
                </div>

                <div className="trending-body">
                  <p className="trending-category">{item.category}</p>

                  <Link href="/pages/services" className="trending-title-link">
                    {item.title}
                  </Link>

                  <div className="trending-rating">
                    <span className="star">★</span>
                    <span>{item.rating}</span>
                    <span className="text-muted">&nbsp; {item.reviews} reviews</span>
                  </div>

                  <div className="trending-footer d-flex">
                    <div className="seller">
                      <Image src={item.avatar} width={26} height={26} alt={item.seller} />
                      <span>{item.seller}</span>
                    </div>

                    <div className="home-price">
                      <span className="text-muted small">Starting at&nbsp;<br /></span>
                      <span className="fw-semibold">{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="trending-bottom">
          <Link href="/pages/services" className="trending-link">All Categories →</Link>
        </div>
      </section>



      {/* --------------------------------------------------------------------
      | CLIENT SECTION
      -------------------------------------------------------------------- */}
      <section ref={clientRef} className={`client-section container ${clientVisible ? "visible" : ""}`}>

        {/* Block 1 */}
        <div className="client-block">

          <Image src="/assets/client1.webp" width={480} height={330} alt="client working" className="client-img slide-left" />

          <div className="client-text slide-right">
            <p className="client-subtitle">For Clients</p>
            <h3 className="fw-bold">Find talent <br /> your way</h3>
            <p className="client-desc">
              Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
            </p>

            <Link href="/pages/services" className="client-btn">All services →</Link>
          </div>
        </div>


        {/* Block 2 */}
        <div className="client-block reverse">

          <div className="client-text slide-left">
            <p className="client-subtitle">For Freelancers</p>
            <h3 className="fw-bold">Find great <br /> work</h3>
            <p className="client-desc">
              Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
            </p>
            <Link href="/pages/projects" className="client-btn">Projects →</Link>
          </div>

          <Image src="/assets/client2.webp" width={480} height={330} alt="client working" className="client-img slide-right" />

        </div>
      </section>



      {/* --------------------------------------------------------------------
      | HOW IT WORKS SECTION
      -------------------------------------------------------------------- */}
      <section ref={needRef} className={`need-section ${needVisible ? "visible" : ""}`}>

        <h2 className="text-center fw-bold">How it works?</h2>
        <p className="text-center text-muted small">Most viewed and all-time top-selling services</p>

        <div className="need-grid container">
          {[
            { icon: "/assets/post.png", title: "Post a job", desc: "It’s free and easy to post a job. Simply fill in a title, description." },
            { icon: "/assets/freelancer.png", title: "Choose freelancers", desc: "Browse talent and pick the right freelancer for your needs." },
            { icon: "/assets/pay.png", title: "Pay safely", desc: "Payment is released only after you approve the work." },
            { icon: "/assets/assistant.png", title: "We’re here to help", desc: "Our support team is available 24/7 to assist you anytime." },
          ].map((item, index) => (
            <div key={index} className="need-card fade-up">
              <div className="need-icon">
                <Image src={item.icon} width={120} height={120} alt="icon" />
              </div>
              <h6 className="fw-semibold">{item.title}</h6>
              <p className="small text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>



      {/* --------------------------------------------------------------------
      | BLOG SECTION
      -------------------------------------------------------------------- */}
      <section ref={blogRef} className={`blog-section ${blogVisible ? "visible" : ""}`}>

        <div className="container">
          <h2 className="fw-bold mb-2 text-start">Our Blog</h2>
          <p className="text-muted mb-5 text-start">Aliquam lacinia diam quis lacus euismod</p>

          <div className="blog-grid">
            {[
              { img: "/assets/blog1.webp", date: "December 2, 2022", title: "Start an online business and work from home", desc: "A complete guide to starting a small business online" },
              { img: "/assets/blog2.webp", date: "December 2, 2022", title: "Front becomes an official Instagram Marketing Partner", desc: "A complete guide to starting a small business online" },
              { img: "/assets/blog3.webp", date: "December 2, 2022", title: "Start an online business and work from home right now", desc: "A complete guide to starting a small business online" },
              { img: "/assets/blog4.webp", date: "December 2, 2022", title: "Start an online business and work from home with complete guide.", desc: "A complete guide to starting a small business online" },
            ].map((item, index) => (
              <Link key={index} href="/pages/blogSingle" className="blog-card fade-up">

                <div className="blog-img">
                  <Image src={item.img} width={500} height={210} alt="blog" />
                </div>

                <p className="blog-date small text-muted mt-3 p-2">{item.date}</p>
                <h6 className="blog-title fw-semibold p-2">{item.title}</h6>
                <p className="small text-muted p-2">{item.desc}</p>

              </Link>
            ))}
          </div>

          <div className="trending-bottom">
            <Link href="/pages/blogs" className="trending-link">All Categories →</Link>
          </div>
        </div>
      </section>



      {/* --------------------------------------------------------------------
      | TESTIMONIALS SECTION
      -------------------------------------------------------------------- */}
      <section className="testimonials-section">

        <h2 className="fw-bold text-center">Testimonials</h2>
        <p className="text-center text-muted small">Interdum et malesuada fames ac ante ipsum</p>

        <div className="quote-icon">
          <Image src="/assets/testimonials1.png" width={70} height={60} alt="" />
        </div>

        <p className="testimonial-text text-center">{testimonials[active].desc}</p>

        <div className="text-center mt-5 mb-4">
          <h6 className="fw-semibold">{testimonials[active].name}</h6>
          <p className="text-muted small">{testimonials[active].role}</p>
        </div>

        <div className="avatar-row">
          {testimonials.map((item, index) => (
            <Image
              key={index}
              src={item.img}
              width={40}
              height={40}
              alt="avatar"
              className={`avatar ${active === index ? "active-avatar" : ""}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </section>

    </>
  );
}
