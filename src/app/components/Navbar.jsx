"use client";

import Link from "next/link";

import "@/app/styles/navbar.css"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


const Navbar = () => {

    

    const [showSearch, setShowSearch] = useState(false);
    const pathname  = usePathname();

    const isServicesPage = pathname ==="/pages/services" || pathname ==="/pages/freelancerProfile" || pathname ==="/pages/projectProfile" || pathname ==="/pages/plans"

   useEffect(() => {
    // Load bootstrap JS only on client
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
      .then(() => console.log("Bootstrap loaded"))
      .catch(err => console.error("Bootstrap load error:", err));
  }, []);
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
        className="btn btn-outline-light ms-auto d-lg-none"
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

          <li className="nav-item dropdown">
            <div className="nav-link dropdown-toggle" href="/">Browse</div>
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
              <li><Link className="dropdown-item" href="/pages/about">About Us</Link></li>
              <li><Link className="dropdown-item" href="/pages/contact">Contact</Link></li>
              <li><Link className="dropdown-item" href="/pages/terms">Terms & Conditions</Link></li>
              <li><Link className="dropdown-item" href="/pages/plans">Plans</Link></li>
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

    {/* Home (no dropdown) */}
    <div className="accordion-item bg-dark border-0">
      <h2 className="accordion-header">
        <Link href="/" className="accordion-button collapsed bg-dark text-white border-0 shadow-none"
              data-bs-dismiss="offcanvas">
          Home
        </Link>
      </h2>
    </div>

    {/* Browse Dropdown */}
    <div className="accordion-item bg-dark border-0">
      <h2 className="accordion-header">
        <button
          className="accordion-button dropdown-toggle collapsed bg-dark text-white shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseBrowse"
        >
          Browse
        </button>
      </h2>
      <div id="collapseBrowse" className="accordion-collapse collapse" data-bs-parent="#mobileNavAccordion">
        <div className="accordion-body px-3">
          <Link href="/pages/services" className="nav-link text-white" data-bs-dismiss="offcanvas">Services</Link>
          <Link href="/pages/projects" className="nav-link text-white" data-bs-dismiss="offcanvas">Projects</Link>
          <Link href="/pages/job-view" className="nav-link text-white" data-bs-dismiss="offcanvas">Job View</Link>
        </div>
      </div>
    </div>

    {/* Domains Dropdown */}
    <div className="accordion-item bg-dark border-0">
      <h2 className="accordion-header">
        <button
          className="accordion-button dropdown-toggle collapsed bg-dark text-white shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseDomains"
        >
          Domains
        </button>
      </h2>
      <div id="collapseDomains" className="accordion-collapse collapse" data-bs-parent="#mobileNavAccordion">
        <div className="accordion-body px-3">
          <Link href="/pages/search-domains" className="nav-link text-white" data-bs-dismiss="offcanvas">
            Search for Domains
          </Link>
          <Link href="/pages/domain-owner" className="nav-link text-white" data-bs-dismiss="offcanvas">
            Find a Domain Owner
          </Link>
        </div>
      </div>
    </div>

    {/* Pages Dropdown */}
    <div className="accordion-item bg-dark border-0">
      <h2 className="accordion-header">
        <button
          className="accordion-button dropdown-toggle collapsed bg-dark text-white shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsePages"
        >
          Pages
        </button>
      </h2>
      <div id="collapsePages" className="accordion-collapse collapse" data-bs-parent="#mobileNavAccordion">
        <div className="accordion-body px-3">
          <Link href="/" className="nav-link text-white" data-bs-dismiss="offcanvas">Home</Link>
          <Link href="/pages/about" className="nav-link text-white" data-bs-dismiss="offcanvas">About Us</Link>
          <Link href="/pages/contact" className="nav-link text-white" data-bs-dismiss="offcanvas">Contact</Link>
          <Link href="/pages/terms" className="nav-link text-white" data-bs-dismiss="offcanvas">Terms & Conditions</Link>
          <Link href="/pages/plans" className="nav-link text-white" data-bs-dismiss="offcanvas">Plans</Link>
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