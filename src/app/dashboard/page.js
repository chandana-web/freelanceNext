"use client";

import Image from "next/image";
import {Line} from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,} from "chart.js"
  import { Doughnut } from "react-chartjs-2";
import {
  ArcElement,
} from "chart.js";

ChartJS.register(ArcElement);

import "@/app/dashboard/styles/dashHome.css";
import { useState } from "react";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

const DashHome = () => {
  const analytics = [
    {
      title: "Services Offered",
      value: "25",
      change: "10 New Offered",
      icon: "/assets/dashanalystics1.png",
    },
    {
      title: "Completed Services",
      value: "1292",
      change: "80+ New Completed",
      icon: "/assets/dashanalystics2.png",
    },
    {
      title: "In Queue Services",
      value: "182",
      change: "35+ New Queue",
      icon: "/assets/dashRevi.png",
    },
    {
      title: "Total Review",
      value: "22,786",
      change: "290+ New Review",
      icon: "/assets/dashanalystics3.png",
    },
  ];

   const filters = ["This Week", "Monthly", "Yearly"];
  const [activeFilter, setActiveFilter] = useState("This Week");

    // Generate last 6 years dynamically
  const currentYear = new Date().getFullYear();
  const lastSixYears = Array.from({ length: 6 }, (_, i) => currentYear - (5 - i));

  // Dummy chart datasets based on filter
  const chartDataSets = {
    "This Week": [120, 149, 180, 210, 160, 250, 300],
    "Monthly": [140, 150, 200, 120, 160, 180, 210, 175, 220, 245, 180, 300],
    "Yearly": [400, 560, 720, 580, 860, 1040], 
  };

const labels = activeFilter === "This Week"
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : activeFilter === "Monthly"
    ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    : lastSixYears;

   const chartData = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data: chartDataSets[activeFilter],
        borderColor: "#20A15A",
        pointBackgroundColor: "#fbf7ed",
        borderWidth: 1,
        tension: 0.4,
        fill: true,
        backgroundColor: "#fbf7ed" , // matching (#FBF7ED)
        pointRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#333" }
      },
    },
    scales: {
      x: { 
        ticks: { color: "#666" },
        grid: { 
          color: "#eee",
          drawOnChartArea: true  // shows grid above fill
        } 
      },
      y: { 
        ticks: { color: "#666" },
        grid: { 
          color: "#eee",
          drawOnChartArea: true  // shows grid above fill
        } 
      }
    }
  };
  return (
    
    <div className="dashboard-page">

      {/* Header */}
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-desc">Lorem ipsum dolor sit amet, consectetur.</p>

      {/* Analytics Cards */}
      <div className="analytics-grid">
        {analytics.map((item, index) => (
          <div className="analytics-card" key={index}>

            <div>
              <p className="analytics-title">{item.title}</p>
              <h2 className="analytics-value">{item.value}</h2>
              <p className="analytics-change">{item.change}</p>
            </div>

            <div className="analytics-icon-wrapper">
              <Image 
                src={item.icon} 
                alt={item.title} 
                width={42} 
                height={42} 
                className="analytics-icon"
              />
            </div>
          </div>
        ))}
      </div>
    <div className="charts-row">
    <div className="chart-card">
      <div className="chart-header">
        <h3>Profile Views</h3>

        <select 
          className="chart-filter" 
          value={activeFilter} 
          onChange={(e) => setActiveFilter(e.target.value)}
        >
          {filters.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <Line data={chartData} options={chartOptions}/>

    </div>
    <div className="traffic-card">
  <h3 className="traffic-title">Traffic</h3>
  <hr className="divider" />

  {/* Custom Legend */}
  <div className="traffic-legend">
    <span><span className="dot green"></span> Direct 50%</span>
    <span><span className="dot pink"></span> Referral 25%</span>
    <span><span className="dot cream"></span> Organic 25%</span>
  </div>

  {/* Chart */}
  <div className="traffic-chart-wrapper">
    <Doughnut
      data={{
        labels: ["Direct", "Referral", "Organic"],
        datasets: [
          {
            data: [50, 25, 25],
            backgroundColor: ["#4CAF50", "#FFE9E5", "#FBF7ED"],
            borderWidth: 0,
            cutout: "65%", // For donut thickness
            hoverOffset: 5,
          },
        ],
      }}
      options={{
        plugins: { legend: { display: false } },
        maintainAspectRatio: false,
      }}
    />
  </div>
</div>
</div>

{/* ---- RECENT SECTION BLOCK ---- */}

<div className="dashboard-section-row">

  {/* ---- COLUMN 1: MOST VIEWED ---- */}
  <div className="dashboard-card">
    <div className="card-header">
      <h3>Most Viewed Services</h3>
      <button className="view-all-btn">View All</button>
    </div>
    <hr />

    {[
      { img: "/assets/ts3.webp", title: "I will design modern websites in figma or adobe xd", rating: 4.82, price: "$983" },
      { img: "/assets/ts2.webp", title: "I will create modern flat design illustration", rating: 4.82, price: "$983" },
      { img: "/assets/ts1.webp", title: "I will build a fully responsive design in HTML, CSS, bootstrap, and javascript", rating: 4.82, price: "$983" }
    ].map((item,i)=>(
      <div className="service-row" key={i}>
        <img src={item.img} className="service-thumb" alt=""/>
        <div className="service-info">
          <p className="service-title">{item.title}</p>
          <div className="service-meta">
            ⭐ {item.rating}
            <span className="price">Starting at {item.price}</span>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* ---- COLUMN 2: RECENT PURCHASED ---- */}
  <div className="dashboard-card">
    <div className="card-header">
      <h3>Recent Purchased Services</h3>
      <button className="view-all-btn">View All</button>
    </div>
    <hr />

    {[
      { icon: "/assets/projectproicon.webp", name: "Medium", status: "has purchased", title: "I will deal with your item", date: "February 26, 2021", price: "$983" },
      { icon: "/assets/projectproicon2.webp", name: "Medium", status: "has purchased", title: "I will deal with your item", date: "February 26, 2021", price: "$983" },
      { icon: "/assets/projectproicon3.webp", name: "Medium", status: "has purchased", title: "I will deal with your item", date: "February 26, 2021", price: "$983" }
    ].map((item,i)=>(
      <div className="purchase-row" key={i}>
        <Image src={item.icon} className="user-round"  alt="" width={15} height={15}/>
        <div className="purchase-text">
          <p><b>{item.name}</b> <span className="highlight">{item.status}</span> {item.title}</p>
          <small>{item.date}</small>
        </div>
        <span className="purchase-price">{item.price}</span>
      </div>
    ))}
  </div>

  {/* ---- COLUMN 3: RECENT ACTIVITY ---- */}
  <div className="dashboard-card">
    <div className="card-header">
      <h3>Recent Activity</h3>
    </div>
    <hr />

    <div className="activity-timeline">

  {[
    { time: "08:42", text:"Purchase by Ali Price", desc:"Product noise evolve smartwatch", color:"#4CAF50" },
    { time: "14:37", text:"Make deposit USD 700 to TFN", desc:"", color:"#FF7070" },
    { time: "16:50", text:"Natasha Carey have liked the products", desc:"Allow users to like products.", color:"#468CFF" },
    { time: "21:03", text:"Favorited Product", desc:"Esther James favorited product.", color:"#C57FFF" },
    { time: "23:07", text:"Today offers by Digitech Galaxy", desc:"Offer valid on orders above 500.", color:"#FFA825" }
  ].map((item,i)=>(
    <div className="activity-row" key={i}>
      <div className="activity-time">{item.time}</div>
      <div className="activity-dot" style={{ background:item.color }}></div>
      <div>
        <p className="activity-title">{item.text}</p>
        {item.desc && <small className="activity-desc">{item.desc}</small>}
      </div>
    </div>
  ))}

</div>

  </div>

</div>


    </div>
  )
}

export default DashHome