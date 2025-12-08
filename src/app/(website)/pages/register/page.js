"use client";

import { useState } from "react";
import "@/app/styles/register.css";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import React from 'react'

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  return (
    <div className="register-auth-page">
      {/* Header */}
      <h1 className="register-auth-title">Register</h1>
      <p className="register-auth-subtitle">
        Give your visitor a smooth online experience with a solid UX design
      </p>

      {/* Login Card */}
      <div className="register-auth-card">
        <h3 className="register-auth-welcome">Let's create your account!</h3>
        <p className="register-auth-switch">
          ALready have an account? <a href="/signup">Log In!</a>
        </p>

        <label>Name</label>
        <input
          type="text"
          placeholder="John Nikolas"
          value={name}
          
          onChange={(e) => setName(e.target.value)}
        />

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
        <div className="register-auth-row">
          <label className="register-checkbox">
            <input
                className="register-checkbox-input"
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>

          <a className="register-forgot" href="#">Forgot password?</a>
        </div>

        {/* Login Button */}
        <button className="register-auth-btn">Log In</button>

        <div className="register-divider">OR</div>

        {/* Social Buttons */}
        <div className="register-social-group">
          <button className="register-social-btn register-facebook">
            <FaFacebookF /> Continue Facebook
          </button>

          <button className="register-social-btn register-google">
            <FaGoogle /> Continue Google
          </button>

          <button className="register-social-btn register-apple">
            <FaApple /> Continue Apple
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register