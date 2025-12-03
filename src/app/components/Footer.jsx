"use client";

import Link from "next/link";
import {FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaApple,
  FaGooglePlay} from "react-icons/fa"

import "@/app/styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      {/* TOP LINKS */}
      <div className="footer-top container d-flex justify-content-between align-items-center">
        <div className="footer-links">
          <Link href="/">Terms of Service</Link>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Site Map</Link>
        </div>

        <div className="footer-social">
          <span>Follow us </span>
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
        </div>
      </div>

      <hr className="footer-line" />

      {/* MAIN GRID */}
      <div className="footer-main container">
        <div className="footer-col">
          <h5>About</h5>
          <Link href="/">Careers</Link>
          <Link href="/">Press & News</Link>
          <Link href="/">Partnerships</Link>
          <Link href="/">Privacy Policy</Link>
          <Link href="/">Terms of Service</Link>
          <Link href="/">Investor Relations</Link>
        </div>

        <div className="footer-col">
          <h5>Categories</h5>
          <Link href="/">Graphics & Design</Link>
          <Link href="/">Digital Marketing</Link>
          <Link href="/">Writing & Translation</Link>
          <Link href="/">Video & Animation</Link>
          <Link href="/">Music & Audio</Link>
          <Link href="/">Programming & Tech</Link>
          <Link href="">Data</Link>
          <Link href="/">Business</Link>
          <Link href="/">Lifestyle</Link>
        </div>

        <div className="footer-col">
          <h5>Support</h5>
          <Link href="/">Help & Support</Link>
          <Link href="/">Trust & Safety</Link>
          <Link href="/">Selling</Link>
          <Link href="/">Buying</Link>
        </div>

        <div className="footer-col">
          <h5>Subscribe</h5>
          <div className="footer-subscribe">
            <input type="email" placeholder="Your email address" />
            <button>Send</button>
          </div>

          <h5 className="mt-4">Apps</h5>
          <Link href="/"><FaApple /> &nbsp; iOS App</Link>
          <Link href="/"><FaGooglePlay /> &nbsp; Android App</Link>
        </div>
      </div>

      <div className="footer-bottom container d-flex justify-content-between">
        <p>© 2025 YourBrand. All rights reserved.</p>

        <div className="footer-settings d-flex gap-3">
          
          <select>
            <option>English</option>
          </select>
        </div>
      </div>

      {/* BACK TO TOP BUTTON */}
      <button className="backtop-btn" onClick={() => window.scrollTo(0, 0)}>↑</button>
    </footer>
  )
}

export default Footer