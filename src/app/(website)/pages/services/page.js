"use client";


import { AiFillStar } from 'react-icons/ai'
import { FiHeart } from 'react-icons/fi'
import { Range, getTrackBackground } from "react-range";
import Link from "next/link";
import "@/app/styles/services.css";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getAllFreelancers } from '@/app/api/freelancerDashboardPro';


const Services = () => {

  const [freelancers, setFreelancers] = useState([]);
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);

const [totalPages, setTotalPages] = useState(1);
const limit = 8;


useEffect(() => {
  const fetchFreelancers = async () => {
    try {
      const res = await getAllFreelancers({
        page: currentPage,
        limit
      });
      console.log("API DATA 👉", res.data);

      setFreelancers(res.data.profiles || []);
      setTotalPages(res.data.pagination.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch freelancers", err);
    } finally {
      setLoading(false);
    }
  };

  fetchFreelancers();
}, [currentPage]);




const MIN = 0;
const MAX = 100000;


const itemsPerPage = 8; // since 4 per row, this means 1 row = 4 items
// const totalPages = Math.ceil(freelancers.length / itemsPerPage);

// const currentData = freelancers.slice(
//   (currentPage - 1) * itemsPerPage,
//   currentPage * itemsPerPage
// );


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

    {loading && <p>Loading freelancers...</p>}

{!loading && freelancers.length === 0 && (
  <p>No freelancers found</p>
)}

const GigCard = ({ profile }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const freelancer = profile.freelancerId;

  return (
    <Link href={`/pages/freelancerProfile/${freelancer?._id}`}>
      <div className="gig-card">

        <div className="gig-img-wrapper">
          <Image
            src={
              freelancer?.selfiePhoto
                ? `${baseUrl}/${freelancer.selfiePhoto.replace(/\\/g, "/")}`
                : "/assets/default-avatar.png"
            }
            alt="Freelancer"
            width={1000}
            height={200}
            className="gig-img"
          />
          <FiHeart className="fav-icon" />
        </div>

        <div className="seller-row">
          <span className="seller-name">
            {freelancer?.firstName} {freelancer?.lastName}
          </span>

          {freelancer?.status === "approved" && (
            <span className="badge">Approved</span>
          )}
        </div>

        <p className="gig-title">
          {freelancer?.skill || "Professional Freelancer"}
        </p>

        <div className="rating-row">
          <AiFillStar className="star" />
          <span>{profile.ratings?.average || 0}</span>
        </div>

        <div className="price-row">
          <span className="from">From</span>
          <span className="service-price">
            ₹{freelancer?.hourlyRate || "—"}
          </span>
        </div>

      </div>
    </Link>
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
  {loading && <p>Loading freelancers...</p>}

  {!loading && freelancers.length === 0 && (
    <p>No freelancers found</p>
  )}

  {!loading &&
    freelancers.map(profile => (
      <GigCard key={profile._id} profile={profile} />
    ))
  }
</div>

      </div>
      {/* Pagination */}
<div className="pagination">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(p => p - 1)}
  >
    Prev
  </button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      className={currentPage === i + 1 ? "active" : ""}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(p => p + 1)}
  >
    Next
  </button>
</div>


<p className="pagination-info">
  Page {currentPage} of {totalPages}
</p>

    </div>
  )
}

export default Services