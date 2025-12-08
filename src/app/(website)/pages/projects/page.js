"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Range, getTrackBackground } from "react-range";
import "@/app/styles/projects.css";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';


import { FiSearch } from 'react-icons/fi'

const Projects = () => {
const router = useRouter();

  const projectList = [
  {
    title: "Food Delivery Mobile App",
    country: "United States",
    time: "2 hours ago",
    proposals: "1 Received",
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    skills: ["Figma", "Sketch", "HTML5"],
    price: "$100 - $150",
    image: "/assets/projectAva1.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  {
    title: "Food Delivery Mobile App",
    country: "United States",
    time: "2 hours ago",
    proposals: "1 Received",
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    skills: ["Figma", "Sketch", "HTML5"],
    price: "$100 - $150",
    image: "/assets/projectAva1.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  {
    title: "Food Delivery Mobile App",
    country: "United States",
    time: "2 hours ago",
    proposals: "1 Received",
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    skills: ["Figma", "Sketch", "HTML5"],
    price: "$100 - $150",
    image: "/assets/projectAva1.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  {
    title: "Food Delivery Mobile App",
    country: "United States",
    time: "2 hours ago",
    proposals: "1 Received",
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    skills: ["Figma", "Sketch", "HTML5"],
    price: "$100 - $150",
    image: "/assets/projectAva1.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  {
    title: "Food Delivery Mobile App",
    country: "United States",
    time: "2 hours ago",
    proposals: "1 Received",
    description:
      "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.",
    skills: ["Figma", "Sketch", "HTML5"],
    price: "$100 - $150",
    image: "/assets/projectAva1.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  {
    title: "Real Estate Website Redesign",
    country: "Canada",
    time: "5 hours ago",
    proposals: "3 Received",
    description:
      "Looking for a designer to redesign an existing real estate platform with a clean minimal UI.",
    skills: ["Webflow", "React", "Figma"],
    price: "$200 - $350",
    image: "/assets/projectAva2.jpg"
  },
  // add 8 more to test pagination

  
];

const MIN = 0;
const MAX = 100000;

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

 const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const totalPages = Math.ceil(projectList.length / itemsPerPage);

const currentProjects = projectList.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

    const ProjectCard = ({ item }) => {
  return (
    <Link className="project-card" href="/pages/projectProfile">

      {/* Left Side */}
      <div className="project-left">
        <div className="project-header">
          <Image src={item.image} alt={item.title} className="project-img" width={50} height={50} />
          <h3 className='project-title'>{item.title}</h3>
        </div>
        <div className='project-content'>
        <div className="project-meta">
          <span><Image src="/assets/freheroloc.png" alt="" width={15} height={15}/> {item.country}</span>
          <span><Image src="/assets/freehours.png" alt="" width={15} height={15}/> {item.time}</span>
          <span><Image src="/assets/freefiletime.png" alt="" width={15} height={15}/> {item.proposals}</span>
        </div>

        <p className="project-desc">{item.description}</p>

        <div className="project-tags">
          {item.skills.map((skill, idx) => (
            <span key={idx}>{skill}</span>
          ))}
        </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="project-right">
        <strong className="projects-price">{item.price}</strong>
        <small className="hourly">Hourly Rate</small>

        <button
          className="proposal-btn"
          onClick={(e) => {
            e.preventDefault(); // Stop whole card navigation
            router.push("/pages/projectProfile");
          }}
        >
          Send Proposal
        </button>
      </div>

    </Link>
  );
};


  return (
    <div className="projects">
      <section className="projects-hero">

  <Image src="/assets/projectheroleft.png" alt="" className="hero-left-shape" width={280} height={250} />

  <div className="projects-content">
    <h1>Projects List</h1>
    <p>All the Lorem Ipsum generators on the Internet tend to repeat.</p>

    <div className="projects-search">
      <FiSearch className="search-icon" />
      <input type="text" placeholder="Keyword or freelancer name" />
      <button className="projects-search-btn">Search</button>
    </div>
  </div>

  {/* Right Image */}
  <Image src="/assets/projectheroright1.webp" alt="hero" className="projects-hero-img" width={280} height={280} />

  {/* The animated curve line */}
  <Image src="/assets/projectheroright2.webp" width={180} height={180} alt="curve" className="curve-line float-line" />

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
        Language Level
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
            <input type='radio' name="seller_level" value="top_rated" /> Basic Level
          </label>
          <label>
            <input type="radio" name="seller_level" value="level_two" /> Bilingual
          </label>
          <label>
            <input type="radio" name="seller_level" value="level_one" /> Fluent
          </label>
          <label>
            <input type="radio" name="seller_level" value="new_seller" /> Native
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
        Skills 
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
            <input type="checkbox" name="seller_level" value="top_rated" /> AdobePhotoshop
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="level_two" /> Figma
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="level_one" /> Sketch
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="new_seller" /> Adobe XD
          </label>
          <label>
            <input type="checkbox" name="seller_level" value="new_seller" /> UI/UX Design
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
        Price 
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
    Language Level
    <span className={`arrow ${activeSidebarSection === "delivery" ? "open" : ""}`}><Image src="/assets/dropDown.png"  width={20} height={20} alt='' /></span>
  </button>

  {activeSidebarSection === "delivery" && (
    <div className="sidebar-dropdown">
      <label><input type='radio' name="delivery" />Basic Level</label>
      <label><input type='radio' name="delivery" />Bilingual</label>
      <label><input type='radio' name="delivery" /> Fluent</label>
      <label><input type='radio' name="delivery" />Native</label>
    </div>
  )}

                </div>
                
                {/* 2. Budget Filter Section */}
                <div className="filter-section">
                    <button 
    className="sidebar-toggle"
    onClick={() => toggleSidebarSection("budget")}
  >
    Price
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

{/* PROJECT LISTING */}
<div className='project-wrapper'>
<div className="project-grid">
  {currentProjects.map((item, i) => (
    <ProjectCard key={i} item={item} />
  ))}
</div>
</div>

{/* PAGINATION */}
<div className="project-pagination">
  <button 
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="project-page-btn"
  >‹</button>

  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      className={`project-page-number ${currentPage === i + 1 ? "active" : ""}`}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  <button 
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="project-page-btn"
  >›</button>
  <div>
  {/* <p className="pagination-info">
  Showing {(currentPage - 1) * itemsPerPage + 1} – 
  {Math.min(currentPage * itemsPerPage, projectList.length)} of {projectList.length}+ results
</p> */}
</div>
</div>

    </div>
  )
}

export default Projects