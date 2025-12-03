"use client";
import { useState } from "react";
import "@/app/styles/plans.css";

const plans = [
  { name: "Basic Plan", monthly: 29, yearly: 29 * 12 * 0.8 },
  { name: "Standard Plan", monthly: 49, yearly: 49 * 12 * 0.8 },
  { name: "Extended Plan", monthly: 89, yearly: 89 * 12 * 0.8 },
  { name: "Enterprise Plan", monthly: 129, yearly: 129 * 12 * 0.8 },
];


const Plans = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");
  return (
    <div className="pricing-container">
      <h2 className="pricing-title">Membership Plans</h2>
      <p className="pricing-sub">
        Give your visitor a smooth online experience with a solid UX design
      </p>

      {/* Toggle Switch */}
      <div className="toggle-wrapper">
        <span className={billingCycle === "monthly" ? "active" : ""}>Billed Monthly</span>
        
        <label className="switch">
          <input
            type="checkbox"
            checked={billingCycle === "yearly"}
            onChange={() =>
              setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
            }
          />
          <span className="slider"></span>
        </label>

        <span className={billingCycle === "yearly" ? "active" : ""}>
          Billed Yearly <strong className="save-tag">Save 20%</strong>
        </span>
      </div>

      {/* Plan Cards */}
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div key={index} className="pricing-card">
            <h3 className="plans-price">
              ${billingCycle === "monthly" ? plan.monthly : plan.yearly.toFixed(0)}
              <span>/ {billingCycle}</span>
            </h3>

            <h4 className="plan-name">{plan.name}</h4>
            <p className="plan-desc">
              One time fee for one listing or task highlighted in search results.
            </p>

            <ul className="features">
              <li>1 Listing</li>
              <li>30 Days Visibility</li>
              <li>Highlighted in Search Results</li>
              <li>4 Revisions</li>
              <li>9 Days Delivery Time</li>
              <li>Product Support</li>
            </ul>

            <button className="buy-btn">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plans