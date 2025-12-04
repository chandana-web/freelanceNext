

"use client";

import Image from "next/image";
import {FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaApple,
  FaGooglePlay} from "react-icons/fa"

import "@/app/styles/blogSingle.css";
import { useState } from "react";

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



const BlogSingle = () => {
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
    <div className="blog-single-wrapper">
        <div className="blog-hero">
        <Image src="/assets/blogsingle1.webp" alt="blog" fill className="blog-hero-img" />
      </div>
    <div className="blog-container">
    <div className="blog-content">
        <h2>Bringing the culture of sharing to everyone</h2>
        <p>
          Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec.
          Quisque bibendum orci ac nibh facilisis, at malesuada orci congue.
        </p>

        <p>
          Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin sagittis dolor sed mi elementum pretium...
        </p>

        {/* QUOTE BOX */}
        <blockquote className="blog-quote">
          <p>
            "Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec.
            Quisque bibendum orci ac nibh facilisis..."
          </p>
          <span>- Luis Pickford</span>
        </blockquote>
      </div>

      {/* ------------ WHAT YOU'LL LEARN ------------ */}
      <div className="blog-features">
        <h3>What you’ll learn</h3>

        <div className="blog-feature-grid">
          {[
            "Become a UI/UX designer.",
            "Build a complete mobile app.",
            "Earn money using Figma skills.",
            "Learn mobile & web design.",
            "Build UI projects end-to-end.",
            "Design 3 unique logos.",
            "Work with colors & fonts.",
            "Create low-fidelity wireframes.",
            "Build your own UI Kit.",
            "Download exercise files."
          ].map((item, i) => (
            <p key={i} className="blog-check-item"><Image src="/assets/check.png" alt="" width={20} height={20}/> {item}</p>
          ))}
        </div>
      </div>

      {/* ------------ Requirements Section ------------ */}
<div className="blog-requirements">

  <div className="blog-requirements-img">
    <Image src="/assets/blogsingle2.webp" alt="requirements" width={1200} height={450} />
  </div>

  <h3>Requirements</h3>

  <ul className="blog-req-list">
    <li>
      We do not require any previous experience or pre-defined skills to take this course.
      A great orientation would be enough to master UI/UX design.
    </li>
    <li>A computer with a good internet connection.</li>
    <li>
      We do not require any previous experience or pre-defined skills to take this course.
      A great orientation would be enough to master UI/UX design.
    </li>
    <li>A computer with a good internet connection.</li>

    <li>Adobe Photoshop <strong>(OPTIONAL)</strong></li>
  </ul>

  <hr />

  {/* Social Share */}
  
  <div className="blog-share-row">
    
    <h4 className="share-label">Share this post</h4>
    <div className="share-icons">
      <FaFacebookF className="icon" />
    <FaTwitter className="icon" />
    <FaInstagram className="icon" />
    <FaLinkedinIn className="icon" />
    </div>
    <div className="blog-tags">
    {["Figma", "Sketch", "HTML5"].map((tag) => (
      <span key={tag} className="blog-tag">{tag}</span>
    ))}
  </div>

  </div>

  {/* Tags */}
</div>
<hr />

{/* ------------ Author Bio Section ------------ */}
<div className="blog-author">

  <div className="author-img">
    <Image
      src="/assets/ava1.webp"
      alt="Author"
      width={90}
      height={90}
    />
  </div>

  <div className="author-info">
    <h4>Brooklyn Simmons</h4>
    <p className="role">Medical Assistant</p>

    <p className="bio">
      Etiam vitae leo et diam pellentesque porta. Sed eleifend ultricies risus, 
      vel rutrum erat commodo ut. Praesent finibus congue euismod. Nullam 
      scelerisque massa vel augue placerat, a tempor sem egestas. Curabitur 
      placerat finibus lacus.
    </p>
  </div>

</div>
<hr />


<div className="blog-reviews-list">
    <h3>Reviews</h3>
        {reviews.map((review, idx) => (
          <article className="blog-review-card" key={idx}>
            <div className="blog-review-header">
              <div className="blog-review-avatar">
                <span>{review.initials}</span>
              </div>
              <div className="blog-review-meta">
                <div className="blog-review-name">{review.name}</div>
                <div className="blog-review-date">{review.date}</div>
              </div>
            </div>

            <p className="blog-review-text">{review.text}</p>

            <div className="blog-review-actions">
              <button className="blog-review-action-btn">👍 Helpful</button>
              <button className="blog-review-action-btn">👎 Not helpful</button>
            </div>
          </article>
        ))}
      </div>

      {/* See more */}
        <div className="blog-reviews-footer">
            <button className="blog-see-more-btn">See More</button>
        </div>

        <hr/>
    <section>

        <div className="blog-review-form-section">
      <h3 className="blog-review-form-title">Add a Review</h3>
      <p className="blog-review-form-subtitle">
        Your email address will not be published. Required fields are marked *
      </p>

      {/* Rating */}
      <div className="blog-review-rating-block">
        <p className="blog-review-rating-label">Your rating of this product</p>
        <div className="blog-review-stars">
          {Array.from({ length: MAX_RATING }).map((_, index) => {
            const starValue = index + 1;
            const isActive =
              starValue <= (hoverRating || rating);

            return (
              <button
                key={starValue}
                type="button"
                className={
                  "blog-review-star" + (isActive ? " blog-review-star-active" : "")
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
      <form onSubmit={handleSubmit} className="blog-review-form">
        {/* Comment */}
        <div className="blog-review-form-group">
          <label className="blog-review-label" htmlFor="comment">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={5}
            className="blog-review-textarea"
            placeholder="Write your comment here..."
            value={form.comment}
            onChange={handleChange}
          />
        </div>

        {/* Name + Email */}
        <div className="blog-review-form-row">
          <div className="blog-review-form-group">
            <label className="blog-review-label" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="blog-review-input"
              placeholder="Ali Tufan"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="blog-review-form-group">
            <label className="blog-review-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="blog-review-input"
              placeholder="creativelayers088"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Remember checkbox */}
        <label className="blog-review-checkbox-wrapper">
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
        <button type="submit" className="blog-review-submit-btn">
          Send
        </button>
      </form>
    </div>
    </section>
     </div>
    </div>
  )
}

export default BlogSingle