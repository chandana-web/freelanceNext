"use client";


import { AiFillStar } from 'react-icons/ai'
import { FiHeart } from 'react-icons/fi'
import { Range, getTrackBackground } from "react-range";
import Link from "next/link";
import "@/app/styles/services.css";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';


const Services = () => {

  const websiteGigsData = [
  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Prince Mahmud",
      avatar: "/assets/ava1.webp",
    },
    title: "I will build a responsive wordpress website with custom theme",
    rating: 5.0,
    reviews: 328,
    price: 7493,
    level: "Level 2 ★★",
  },
   {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Nishant UI",
      avatar: "/assets/ava2.webp",
    },
    title: "I will build landing page using react, tailwind and framer motion",
    rating: 4.9,
    reviews: 132,
    price: 6220,
    level: "Level 1 ★",
  },

  {
    images: [
      "/assets/serviceCard3.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "PixelCraft Studio",
      avatar: "/assets/ava3.webp",
    },
    title: "I will create fast SEO optimized portfolio or business website",
    rating: 4.8,
    reviews: 441,
    price: 5299,
    level: "Level 1 ★",
  },

  {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "Tohidul I.",
      avatar: "/assets/ava4.webp",
    },
    title: "I will redesign a premium wordpress website with elementor pro",
    rating: 5.0,
    reviews: 40,
    price: 7961,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
    ],
    seller: {
      name: "Atikur Rahman",
      avatar: "/assets/ava5.webp",
    },
    title: "I will design or develop a custom webflow or figma to webflow website",
    rating: 4.9,
    reviews: 568,
    price: 11239,
    level: "Level 2 ★★",
  },
   {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Nishant UI",
      avatar: "/assets/ava2.webp",
    },
    title: "I will build landing page using react, tailwind and framer motion",
    rating: 4.9,
    reviews: 132,
    price: 6220,
    level: "Level 1 ★",
  },

  {
    images: [
      "/assets/serviceCard3.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "PixelCraft Studio",
      avatar: "/assets/ava3.webp",
    },
    title: "I will create fast SEO optimized portfolio or business website",
    rating: 4.8,
    reviews: 441,
    price: 5299,
    level: "Level 1 ★",
  },

  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
    ],
    seller: {
      name: "Atikur Rahman",
      avatar: "/assets/ava5.webp",
    },
    title: "I will design or develop a custom webflow or figma to webflow website",
    rating: 4.9,
    reviews: 568,
    price: 11239,
    level: "Level 2 ★★",
  },

   {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "Tohidul I.",
      avatar: "/assets/ava4.webp",
    },
    title: "I will redesign a premium wordpress website with elementor pro",
    rating: 5.0,
    reviews: 40,
    price: 7961,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Prince Mahmud",
      avatar: "/assets/ava1.webp",
    },
    title: "I will build a responsive wordpress website with custom theme",
    rating: 5.0,
    reviews: 328,
    price: 7493,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Nishant UI",
      avatar: "/assets/ava2.webp",
    },
    title: "I will build landing page using react, tailwind and framer motion",
    rating: 4.9,
    reviews: 132,
    price: 6220,
    level: "Level 1 ★",
  },

  {
    images: [
      "/assets/serviceCard3.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "PixelCraft Studio",
      avatar: "/assets/ava3.webp",
    },
    title: "I will create fast SEO optimized portfolio or business website",
    rating: 4.8,
    reviews: 441,
    price: 5299,
    level: "Level 1 ★",
  },
  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Prince Mahmud",
      avatar: "/assets/ava1.webp",
    },
    title: "I will build a responsive wordpress website with custom theme",
    rating: 5.0,
    reviews: 328,
    price: 7493,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "Tohidul I.",
      avatar: "/assets/ava4.webp",
    },
    title: "I will redesign a premium wordpress website with elementor pro",
    rating: 5.0,
    reviews: 40,
    price: 7961,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
    ],
    seller: {
      name: "Atikur Rahman",
      avatar: "/assets/ava5.webp",
    },
    title: "I will design or develop a custom webflow or figma to webflow website",
    rating: 4.9,
    reviews: 568,
    price: 11239,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
    ],
    seller: {
      name: "Atikur Rahman",
      avatar: "/assets/ava5.webp",
    },
    title: "I will design or develop a custom webflow or figma to webflow website",
    rating: 4.9,
    reviews: 568,
    price: 11239,
    level: "Level 2 ★★",
  },

   {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "Tohidul I.",
      avatar: "/assets/ava4.webp",
    },
    title: "I will redesign a premium wordpress website with elementor pro",
    rating: 5.0,
    reviews: 40,
    price: 7961,
    level: "Level 2 ★★",
  },

 {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Prince Mahmud",
      avatar: "/assets/ava1.webp",
    },
    title: "I will build a responsive wordpress website with custom theme",
    rating: 5.0,
    reviews: 328,
    price: 7493,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Nishant UI",
      avatar: "/assets/ava2.webp",
    },
    title: "I will build landing page using react, tailwind and framer motion",
    rating: 4.9,
    reviews: 132,
    price: 6220,
    level: "Level 1 ★",
  },

   {
    images: [
      "/assets/serviceCard3.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "PixelCraft Studio",
      avatar: "/assets/ava3.webp",
    },
    title: "I will create fast SEO optimized portfolio or business website",
    rating: 4.8,
    reviews: 441,
    price: 5299,
    level: "Level 1 ★",
  },
  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Prince Mahmud",
      avatar: "/assets/ava1.webp",
    },
    title: "I will build a responsive wordpress website with custom theme",
    rating: 5.0,
    reviews: 328,
    price: 7493,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "Tohidul I.",
      avatar: "/assets/ava4.webp",
    },
    title: "I will redesign a premium wordpress website with elementor pro",
    rating: 5.0,
    reviews: 40,
    price: 7961,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
    ],
    seller: {
      name: "Atikur Rahman",
      avatar: "/assets/ava5.webp",
    },
    title: "I will design or develop a custom webflow or figma to webflow website",
    rating: 4.9,
    reviews: 568,
    price: 11239,
    level: "Level 2 ★★",
  },
  

  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
    ],
    seller: {
      name: "Atikur Rahman",
      avatar: "/assets/ava5.webp",
    },
    title: "I will design or develop a custom webflow or figma to webflow website",
    rating: 4.9,
    reviews: 568,
    price: 11239,
    level: "Level 2 ★★",
  },

   {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "Tohidul I.",
      avatar: "/assets/ava4.webp",
    },
    title: "I will redesign a premium wordpress website with elementor pro",
    rating: 5.0,
    reviews: 40,
    price: 7961,
    level: "Level 2 ★★",
  },

  {
    images: [
      "/assets/serviceCard1.jpg",
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Prince Mahmud",
      avatar: "/assets/ava1.webp",
    },
    title: "I will build a responsive wordpress website with custom theme",
    rating: 5.0,
    reviews: 328,
    price: 7493,
    level: "Level 2 ★★",
  },
  

 {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Nishant UI",
      avatar: "/assets/ava2.webp",
    },
    title: "I will build landing page using react, tailwind and framer motion",
    rating: 4.9,
    reviews: 132,
    price: 6220,
    level: "Level 1 ★",
  },

  {
    images: [
      "/assets/serviceCard3.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "PixelCraft Studio",
      avatar: "/assets/ava3.webp",
    },
    title: "I will create fast SEO optimized portfolio or business website",
    rating: 4.8,
    reviews: 441,
    price: 5299,
    level: "Level 1 ★",
  },
  {
    images: [
      "/assets/serviceCard2.jpg",
      "/assets/serviceCard3.jpg",
    ],
    seller: {
      name: "Nishant UI",
      avatar: "/assets/ava2.webp",
    },
    title: "I will build landing page using react, tailwind and framer motion",
    rating: 4.9,
    reviews: 132,
    price: 6220,
    level: "Level 1 ★",
  },

   {
    images: [
      "/assets/serviceCard3.jpg",
      "/assets/serviceCard1.jpg",
    ],
    seller: {
      name: "PixelCraft Studio",
      avatar: "/assets/ava3.webp",
    },
    title: "I will create fast SEO optimized portfolio or business website",
    rating: 4.8,
    reviews: 441,
    price: 5299,
    level: "Level 1 ★",
  },
 
];

const MIN = 0;
const MAX = 100000;

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8; // since 4 per row, this means 1 row = 4 items
const totalPages = Math.ceil(websiteGigsData.length / itemsPerPage);
const currentData = websiteGigsData.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const sortOptions=["Best Seller", "Recommended", "New Arrivals"];

  // 1. State to manage dropdown visibility
 const [isLevelOpen, setIsLevelOpen] = useState(false); 
 const [isbudgetOpen, setIsbudgetOpen] = useState(false); 
 const [isLocationOpen, setIsLocationOpen] = useState(false);
 const [isDeliveryOpen, setIsDeliveryOpen] = useState(false); 
 const [isSortOpen, setIsSortOpen] = useState(false); 
   const [values, setValues] = useState([5000, 50000]);
    const [selected, setSelected] = useState("Best Seller");
const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
const [activeSidebarSection, setActiveSidebarSection] = useState(null);

const toggleSidebarSection = (section) => {
  setActiveSidebarSection(prev => prev === section ? null : section);
};

 
    
    // NEW: Create a reference for the filter container
    const filterRef = useRef(null);
    const budgetRef=useRef(null)
    const locationRef=useRef(null);
    const deliveryRef=useRef(null);
    const sortRef=useRef(null);


    const toggleSidePanel = () => {
    // 1. Close all dropdowns when opening the main panel
    if (!isSidePanelOpen) {
        setIsLevelOpen(false);
        setIsbudgetOpen(false);
        setIsDeliveryOpen(false);
        setIsLocationOpen(false);
    }
    // 2. Toggle the panel state
    setIsSidePanelOpen(!isSidePanelOpen);
};

    const toggleLevelDropdown = () => {
      setIsLevelOpen(!isLevelOpen);
      
    };

    const togglebudgetDropdown = () => {
      setIsbudgetOpen(!isbudgetOpen);
      
    };

     const togglelocationDropdown = () => {
      setIsLocationOpen(!isLocationOpen);
      
    };

    const toggledeliveryDropdown = () => {
      setIsDeliveryOpen(!isDeliveryOpen);
      
    };

    const toggleSortDropdown = () => {
      setIsSortOpen(!isSortOpen);
      
    };

    // NEW: Logic to close the dropdown when clicked outside
    useEffect(() => {
        /**
         * Closes the dropdown if the click event happens outside the referenced element.
         * @param {MouseEvent} event 
         */
        function handleClickOutside(event) {
            // 1. Check if the ref exists and if the click is NOT inside the element
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsLevelOpen(false);
                
            }
            if (budgetRef.current && !budgetRef.current.contains(event.target)) {
                
                setIsbudgetOpen(false);
            }
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                
                setIsLocationOpen(false);
            }
            if (deliveryRef.current && !deliveryRef.current.contains(event.target)) {
                
                setIsDeliveryOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                
                setIsSortOpen(false);
            }
        }

        // 2. Attach the listener when the component mounts
        document.addEventListener("mousedown", handleClickOutside);
        
        // 3. Clean up the listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

  const GigCard = ({ gig }) => {
    
    const [activeImage, setActiveImage] = useState(0);
    const { images, seller, title, rating, reviews, price, level } = gig;


    return (
      <div className="gig-card" >

        {/* Image Carousel */}
        <div className="gig-img-wrapper">
          <Image src={images[activeImage]} alt="" className="gig-img" height={200} width={1000} />
          <FiHeart className="fav-icon" />

          <div className="s-dots">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`s-dot ${activeImage === idx ? "active" : ""}`}
                onClick={() => setActiveImage(idx)}
              />
            ))}
          </div>
        </div>

        {/* Seller */}
        <Link href="/pages/freelancerProfile">
        <div className="seller-row">
          <div >
          <Image src={seller.avatar} alt="" className="seller-img"  width={28} height={28}/>
          <span className="seller-name hover-text">{seller.name}</span>
          </div>
          <div>
          {level && <span className="badge">{level}</span>}
          </div>
        </div>

        {/* Title */}
        <p className="gig-title">{title}</p>

        {/* Rating */}
        <div className="rating-row">
          <AiFillStar className="star" />
          <span>{rating}</span>
          <span className="reviews">({reviews})</span>
        </div>

        {/* Price */}
        <div className="price-row">
          <span className="from">From</span>
          <span className="service-price">₹{price}</span>
        </div>
        </Link>

      </div>
    );
  };
  return (

    
    <div>
        <section className="services-hero">
      <div className="hero-left">
        <Image src="/assets/serviceHeroleft.png" alt="shape" className="hero-shape" width={130} height={100} />

        <h1>Design & Creative</h1>
        <p>Give your visitor a smooth online experience with a solid UX design</p>
      </div>

      <div className="hero-right">
        <Image src="/assets/serviceHero.webp" alt="hero" className="hero-img float-animate" width={1000} height={1000} />
      </div>
    </section>

    <div className="filters-container">

      {/* Left filter buttons */}
      <div className="filters-left">

        {/* All Filters Button */}
        <button className="filter-btn" onClick={toggleSidePanel}>
          <Image src="/assets/filterIcon.png" alt="filter icon" height={14} width={14}  />
          All Filters
        </button>

        {/* Dropdown Filters */}
        <div className="filter-container" ref={deliveryRef}>
      {/* The Button that triggers the dropdown */}
      <button 
        className="filter-dropdown" 
        onClick={toggledeliveryDropdown}
      >
        Delivery
        <Image 
          src="/assets/dropDown.png" 
          className="filter-arrow" 
          width={12} 
          height={12} 
          alt="Dropdown arrow" 
        />
      </button>

      {/* The Dropdown Content Box (Conditionally Rendered) */}
      {isDeliveryOpen && ( // 3. Conditional rendering
        <div className="filter-box">
          <label>
            <input type='radio' name="seller_level" value="top_rated" /> Express 24H
          </label>
          <label>
            <input type="radio" name="seller_level" value="level_two" /> Up to 3 days
          </label>
          <label>
            <input type="radio" name="seller_level" value="level_one" /> Up to 7 days
          </label>
          <label>
            <input type="radio" name="seller_level" value="new_seller" /> Anytime
          </label>
          
          <button className="apply-btn">Apply</button>
        </div>
      )}
    </div>

        <div className="filter-container" ref={locationRef}>
      {/* The Button that triggers the dropdown */}
      <button 
        className="filter-dropdown" 
        onClick={togglelocationDropdown}
      >
        Location
        <Image 
          src="/assets/dropDown.png" 
          className="filter-arrow" 
          width={12} 
          height={12} 
          alt="Dropdown arrow" 
        />
      </button>

      {/* The Dropdown Content Box (Conditionally Rendered) */}
      {isLocationOpen && ( // 3. Conditional rendering
        <div className="filter-box">
          <label>
            <input type="checkbox" name="seller_level" value="top_rated" /> India
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="level_two" /> United Kingdom
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="level_one" /> United States
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="new_seller" /> Remote
          </label>
          
          <button className="apply-btn">Apply</button>
        </div>
      )}
    </div>

        <div className="filter-container" ref={filterRef}>
      {/* The Button that triggers the dropdown */}
      <button 
        className="filter-dropdown" 
        onClick={toggleLevelDropdown}
      >
        Level 
        <Image 
          src="/assets/dropDown.png" 
          className="filter-arrow" 
          width={12} 
          height={12} 
          alt="Dropdown arrow" 
        />
      </button>

      {/* The Dropdown Content Box (Conditionally Rendered) */}
      {isLevelOpen && ( // 3. Conditional rendering
        <div className="filter-box">
          <label>
            <input type="checkbox" name="seller_level" value="top_rated" /> Top Rated Seller
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="level_two" /> Level Two
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="level_one" /> Level One
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="new_seller" /> New Seller
          </label>
          
          <button className="apply-btn">Apply</button>
        </div>
      )}
    </div>

        <div className="filter-container" ref={budgetRef}>
      {/* The Button that triggers the dropdown */}
      <button 
        className="filter-dropdown" 
        onClick={togglebudgetDropdown}
      >
        Budget 
        <Image 
          src="/assets/dropDown.png" 
          className="filter-arrow" 
          width={12} 
          height={12} 
          alt="Dropdown arrow" 
        />
      </button>

      {/* The Dropdown Content Box (Conditionally Rendered) */}
      {isbudgetOpen && ( // 3. Conditional rendering
      <div className='filter-box'>
        <div className="slider-container">
      <Range
        step={1000}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(val) => setValues(val)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="slider-track"
            style={{
              background: getTrackBackground({
                values,
                colors: ["#E5E5E5", "#38C172", "#E5E5E5"],
                min: MIN,
                max: MAX,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => {
  const { key, ...rest } = props;  // remove key from spread

  return (
    <div key={key} {...rest} className="slider-thumb" />
  );
}}
      />

      {/* Inputs */}
      <div className="slider-inputs">
        <input
          type="number"
          value={values[0]}
          onChange={(e) => setValues([+e.target.value, values[1]])}
          className="slider-input"
        />
        <span className="dash">—</span>
        <input
          type="number"
          value={values[1]}
          onChange={(e) => setValues([values[0], +e.target.value])}
          className="slider-input"
        />
      </div>

      {/* Button */}
      <button className="apply-button">Apply </button>
    </div>
        </div>
      )}
    </div>
      </div>

      {/* Right Sort Menu */}
    <div className="filters-right">
        <span className="sort-text">Sort by</span>
        <div className="filter-container" ref={sortRef}>
      {/* The Button that triggers the dropdown */}
      <button 
        className="sort-filter-dropdown"
        onClick={toggleSortDropdown}
      >
        {selected} 
        <Image 
          src="/assets/dropDown.png" 
          className="filter-arrow" 
          width={12} 
          height={12} 
          alt="Dropdown arrow" 
        />
      </button>

      {/* The Dropdown Content Box (Conditionally Rendered) */}
      {isSortOpen && ( // 3. Conditional rendering
        
           <ul className="sort-menu">
          {sortOptions.map(option => (
            <li 
              key={option} 
              className={`sort-item ${selected === option ? "active" : ""}`}
              onClick={() => {
                setSelected(option);
                setIsSortOpen(false);
              }}
            >
              {option}
              {selected === option && (
                <span className="checkmark">✔</span>
              )}
            </li>
          ))}
        </ul>
        
      )}
    </div>
  </div>

    </div>

    {isSidePanelOpen && (
      <div 
         className="sidebar-overlay"
         onClick={toggleSidePanel}
      ></div>
      )}
      <div className={`side-panel ${isSidePanelOpen ? 'open' : ''}`} >
            <div className="panel-header">
                <h2>All filters</h2>
                <button onClick={toggleSidePanel} className="close-btn">
                    &times;
                </button>
            </div>
            
            <div className="panel-content">
                
                {/* 1. Delivery Filter Section */}
                <div className="filter-section">
                    
  <button 
    className="sidebar-toggle"
    onClick={() => toggleSidebarSection("delivery")}
  >
    Delivery Time
    <span className={`arrow ${activeSidebarSection === "delivery" ? "open" : ""}`}><Image src="/assets/dropDown.png"  width={20} height={20} alt='' /></span>
  </button>

  {activeSidebarSection === "delivery" && (
    <div className="sidebar-dropdown">
      <label><input type='radio' name="delivery" /> 24 Hours</label>
      <label><input type='radio' name="delivery" /> 3 Days</label>
      <label><input type='radio' name="delivery" /> 7 Days</label>
      <label><input type='radio' name="delivery" /> Any Time</label>
    </div>
  )}

                </div>
                
                {/* 2. Budget Filter Section */}
                <div className="filter-section">
                    <button 
    className="sidebar-toggle"
    onClick={() => toggleSidebarSection("budget")}
  >
    Budget
    <span className={`arrow ${activeSidebarSection === "budget" ? "open" : ""}`}><Image src="/assets/dropDown.png"  width={20} height={20} alt='' /></span>
  </button>
  {activeSidebarSection === "budget" && (
    <div className='sidebar-dropdown'>
      <div className="slider-container">
      <Range
        step={1000}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(val) => setValues(val)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="slider-track"
            style={{
              background: getTrackBackground({
                values,
                colors: ["#E5E5E5", "#38C172", "#E5E5E5"],
                min: MIN,
                max: MAX,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => {
        const { key, ...rest } = props;  // remove key from spread

      return (
        <div key={key} {...rest} className="slider-thumb" />
          );
          }}
        />

      {/* Inputs */}
      <div className="slider-inputs">
        <input
          type="number"
          value={values[0]}
          onChange={(e) => setValues([+e.target.value, values[1]])}
          className="slider-input"
        />
        <span className="dash">—</span>
        <input
          type="number"
          value={values[1]}
          onChange={(e) => setValues([values[0], +e.target.value])}
          className="slider-input"
        />
          </div>
        </div>
      </div>)}
                </div>

                {/* 3. Design Tool Section (as per your image) */}
                <div className="filter-section">
                    <h4 className="section-title">Design Tool</h4>
                    {/* ... checkbox content ... */}
                </div>

                {/* 4. Location Section */}
                <div className="filter-section">
  <button 
    className="sidebar-toggle"
    onClick={() => toggleSidebarSection("location")}
  >
    Location
    <span className={`arrow ${activeSidebarSection === "location" ? "open" : ""}`}><Image src="/assets/dropDown.png"  width={20} height={20} alt='' /></span>
  </button>

  {activeSidebarSection === "location" && (
    <div className="sidebar-dropdown">
      <label><input type="checkbox" /> India</label>
      <label><input type="checkbox" /> United States</label>
      <label><input type="checkbox" /> UK</label>
      <label><input type="checkbox" /> Remote</label>
    </div>
  )}
</div>


                {/* 5. Speaks Section */}
                <div className="filter-section">
                    <h4 className="section-title">Speaks</h4>
                    {/* ... checkbox content ... */}
                </div>
                
                {/* 6. Level Section */}
                <div className="filter-section">
                    <h4 className="section-title">Level</h4>
                    {/* Replicate the checkbox content from your Level filter here */}
                </div>
            </div>
            
            <div className="panel-footer">
                <button className="clear-btn">Clear All</button>
                <button className="apply-btn" onClick={toggleSidePanel}>Apply</button>
            </div>
        </div>
  
    <div className='gig-wrapper'>
    <div className="gigs-grid">
        {currentData.map((gig, index) => (
          <GigCard key={index} gig={gig} />
        ))}
      </div>
      </div>
      {/* Pagination */}
<div className="pagination">
  
  {/* Previous Button */}
  <button 
    className="page-btn"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    ‹
  </button>

  {/* Page Numbers */}
  {[...Array(totalPages)].map((_, idx) => {
    const page = idx + 1;
    return (
      <button 
        key={page}
        className={`page-number ${currentPage === page ? "active" : ""}`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    );
  })}

  {/* Next Button */}
  <button 
    className="page-btn"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    ›
  </button>
</div>

<p className="pagination-info">
  Showing {(currentPage - 1) * itemsPerPage + 1} – 
  {Math.min(currentPage * itemsPerPage, websiteGigsData.length)} of {websiteGigsData.length}+ results
</p>
    </div>
  )
}

export default Services