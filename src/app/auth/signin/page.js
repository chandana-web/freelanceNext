"use client";

import { useState } from "react";

import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import "@/app/styles/signin.css";

const SignIn = () => {
      const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div className="auth-page">
      {/* Header */}
      <h1 className="auth-title">Log In</h1>
      <p className="auth-subtitle">
        Give your visitor a smooth online experience with a solid UX design
      </p>

      {/* Login Card */}
      <div className="auth-card">
        <h3 className="auth-welcome">We're glad to see you again!</h3>
        <p className="auth-switch">
          Don't have an account? <a href="/signup">Sign Up!</a>
        </p>

        {/* Email Input */}
        <label>Email Address</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember + Forgot */}
        <div className="auth-row">
          <label className="checkbox">
            <input
                className="checkbox-input"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>

          <a className="forgot" href="#">Forgot password?</a>
        </div>

        {/* Login Button */}
        <button className="auth-btn">Log In</button>

        <div className="divider">OR</div>

        {/* Social Buttons */}
        <div className="social-group">
          <button className="social-btn facebook">
            <FaFacebookF /> Continue Facebook
          </button>

          <button className="social-btn google">
            <FaGoogle /> Continue Google
          </button>

          <button className="social-btn apple">
            <FaApple /> Continue Apple
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn