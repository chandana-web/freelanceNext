"use client";


import Link from "next/link";



import "@/app/styles/navbar.css"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {useRouter} from "next/navigation"



const Navbar = () => {
const router =useRouter()
useEffect(() => {
    // load bootstrap only on client
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
      // make it available globally
      window.bootstrap = bootstrap;
    });
  }, []);

 const handleNav = (href) => {
    // Close Bootstrap offcanvas
    const offcanvas = document.querySelector(".offcanvas.show");
    if (offcanvas) {
      const bootstrapOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
      bootstrapOffcanvas.hide();
    }

    router.push(href);
  };
    

    const [showSearch, setShowSearch] = useState(false);
    const pathname  = usePathname();

    const isServicesPage = pathname ==="/pages/services" || pathname ==="/pages/freelancerProfile" || pathname ==="/pages/projectProfile" || pathname ==="/pages/plans"

    
const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const offcanvas = document.getElementById("mobileMenu");

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };

  offcanvas?.addEventListener("shown.bs.offcanvas", disableScroll);
  offcanvas?.addEventListener("hidden.bs.offcanvas", enableScroll);

  return () => {
    offcanvas?.removeEventListener("shown.bs.offcanvas", disableScroll);
    offcanvas?.removeEventListener("hidden.bs.offcanvas", enableScroll);
  };

}, []);

useEffect(() => {
  import("bootstrap/dist/js/bootstrap.bundle.min.js");

  const heroSearch = document.querySelector(".hero-search-target");

  if (!heroSearch) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setShowSearch(!entry.isIntersecting); // show when hero search is not visible
    },
    { threshold: 0}
  );

  observer.observe(heroSearch);

  return () => observer.disconnect();
}, []);



  return (
   <nav className={`navbar navbar-expand-lg px-4 navbar-main ${isServicesPage ? "services-navbar" : ""} ${scrolled ? "navbar-scrolled" : ""}`}>
      
      {/* LOGO (Visible on all screens) */}
      <Link className={`navbar-brand d-flex align-items-center gap-2 ${isServicesPage ? "services-navbar" : ""}`}  href="/">
         Go Experts
      </Link>

      {/* {showSearch && (
    <div className="mobile-search d-flex d-lg-none align-items-center">
      <input type="text" className="form-control small-nav-input" placeholder="Search..." />
      <button className="btn btn-success ms-2">🔍</button>
    </div>
  )} */}


      {/* MOBILE MENU BUTTON (hidden on desktop) */}
      <button
        className={`menu-btn ${isServicesPage ? "services-navbar" : ""} btn btn-outline-light ms-auto d-lg-none`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileMenu"
      >
        ☰
      </button>

      


      {/* DESKTOP NAVIGATION (hidden on mobile) */}
      <div className="navbar-tabs collapse navbar-collapse d-none d-lg-flex" id="navbarNav">
        <div className="d-flex align-items-center ms-auto gap-2">
  

  
</div>
        <ul className="navbar-nav mx-auto gap-4">

          <li className="nav-item">
            <Link className="nav-link" href="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/pages/plans">Plans</Link>
          </li>

          <li className="nav-item dropdown">
            <div className="nav-link dropdown-toggle" >Browse</div>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/pages/services">Services</Link></li>
              <li><Link className="dropdown-item" href="/pages/projects">Projects</Link></li>
              <li><Link className="dropdown-item" href="/pages/job-view">Job View</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" href="/">Domains</Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/pages/search-domains">Search for Domains</Link></li>
              <li><Link className="dropdown-item" href="/pages/domain-owner">Find a Domain Owner</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" href="/">Pages</Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="/">Home</Link></li>
              <li><Link className="dropdown-item" href="/pages/plans">Plans</Link></li>
              <li><Link className="dropdown-item" href="/pages/about">About Us</Link></li>
              <li><Link className="dropdown-item" href="/pages/contact">Contact</Link></li>
              <li><Link className="dropdown-item" href="/pages/terms&conditions">Terms & Conditions</Link></li>
              <li><Link className="dropdown-item" href="/pages/blogs">Blogs</Link></li>
            </ul>
          </li>
        </ul>

        <div className="d-flex gap-2">
          <Link href="/pages/signin" className={`btn btn-outline-light px-4 rounded ${isServicesPage ? "services-navbar" : ""}`}>Sign In</Link>
          <Link href="/pages/register" className="btn btn-light px-4 rounded">Join</Link>
        </div>
      </div>


      {/* MOBILE OFFCANVAS MENU (hidden on desktop) */}
      <div className="offcanvas offcanvas-end bg-dark text-white d-lg-none" id="mobileMenu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Go Experts</h5>
          <button className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">

   <div className="accordion" id="mobileNavAccordion">

      {/* Home */}
      <div className="accordion-item bg-dark border-0">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-dark text-white"
            onClick={() => handleNav("/")}
          >
            Home
          </button>
          <button
            className="accordion-button collapsed bg-dark text-white"
            onClick={() => handleNav("/pages/plans")}
          >
            Plans
          </button>
        </h2>
      </div>

      {/* Browse Dropdown */}
      <div className="accordion-item bg-dark border-0">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-dark text-white"
            data-bs-toggle="collapse"
            data-bs-target="#collapseBrowse"
          >
            Browse
          </button>
        </h2>
        <div id="collapseBrowse" className="accordion-collapse collapse">
          <div className="accordion-body px-3">
            <button className="nav-link text-white" onClick={() => handleNav("/pages/services")}>Services</button>
            <button className="nav-link text-white" onClick={() => handleNav("/pages/projects")}>Projects</button>
            <button className="nav-link text-white" onClick={() => handleNav("/pages/job-view")}>Job View</button>
          </div>
        </div>
      </div>

      {/* Domains Dropdown */}
      <div className="accordion-item bg-dark border-0">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-dark text-white"
            data-bs-toggle="collapse"
            data-bs-target="#collapseDomains"
          >
            Domains
          </button>
        </h2>
        <div id="collapseDomains" className="accordion-collapse collapse">
          <div className="accordion-body px-3">
            <button className="nav-link text-white" onClick={() => handleNav("/pages/search-domains")}>Search for Domains</button>
            <button className="nav-link text-white" onClick={() => handleNav("/pages/domain-owner")}>Find a Domain Owner</button>
          </div>
        </div>
      </div>

      {/* Pages Dropdown */}
      <div className="accordion-item bg-dark border-0">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed bg-dark text-white"
            data-bs-toggle="collapse"
            data-bs-target="#collapsePages"
          >
            Pages
          </button>
        </h2>
        <div id="collapsePages" className="accordion-collapse collapse">
          <div className="accordion-body px-3">
            <button className="nav-link text-white" onClick={() => handleNav("/")}>Home</button>
            <button className="nav-link text-white" onClick={() => handleNav("/pages/plans")}>Plans</button>
            <button className="nav-link text-white" onClick={() => handleNav("/pages/about")}>About Us</button>
            <button className="nav-link text-white" onClick={() => handleNav("/pages/contact")}>Contact</button>
            <button className="nav-link text-white" onClick={() => handleNav("/pages/terms")}>Terms & Conditions</button>
            <button className="nav-link text-white" onClick={() => handleNav("/pages/blogs")}>Blogs</button>
          </div>
        </div>
      </div>

    </div>

  <hr className="border-secondary mt-4" />

  <div className="d-flex gap-2">
    <Link href="/pages/signin" className="btn btn-outline-light w-50" data-bs-dismiss="offcanvas">Sign In</Link>
    <Link href="/pages/register" className="btn btn-light w-50" data-bs-dismiss="offcanvas">Join</Link>
  </div>
</div>
      </div>
    </nav>


  )
}

export default Navbar