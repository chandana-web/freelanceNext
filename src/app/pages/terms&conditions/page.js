"use client";

import "@/app/styles/terms.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const menuItems = [
  { id: "account", label: "Account & Payments" },
  { id: "orders", label: "Manage Orders" },
  { id: "returns", label: "Returns & Refunds" },
  { id: "covid", label: "COVID-19" },
  { id: "other", label: "Other" },
];

const Terms = () => {

    const [activeSection, setActiveSection] = useState(menuItems[0].id);
  const sectionRefs = useRef({});

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.keys(sectionRefs.current).forEach((id) => {
      observer.observe(sectionRefs.current[id]);
    });

    return () => observer.disconnect();
  }, []);
  return (
    <div>
        <div className="terms-header">
        <h2>Terms and Conditions</h2>
        <p>Give your visitor a smooth online experience with a solid UX design</p>
      </div>

       <div className="docs-container">
      {/* Sidebar */}
      <aside className="terms-sidebar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`terms-sidebar-item ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
      </aside>

      {/* Content */}
      <main className="terms-content">
        {menuItems.map((item, i) => (
          <section
            key={item.id}
            id={item.id}
            ref={(el) => (sectionRefs.current[item.id] = el)}
            className="terms-section-block"
          >
            <h2>{i + 1}. {item.label}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus
              nascetur morbi nisl. Integer amet fermentum nibh viverra mollis
              consectetur arcu. Gravida purus arcu viverra eget. Aliquet
              tincidunt dignissim aliquam tempor nec id.
            </p>
            <p>
              Dolor sit amet, consectetur adipiscing elit. Eget a sit morbi nunc
              sit id massa. Metus, scelerisque volutpat nec vel donec. Sagittis,
              id volutpat erat vel.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus
              nascetur morbi nisl. Integer amet fermentum nibh viverra mollis
              consectetur arcu. Gravida purus arcu viverra eget. Aliquet
              tincidunt dignissim aliquam tempor nec id.
            </p>
            <p>
              Dolor sit amet, consectetur adipiscing elit. Eget a sit morbi nunc
              sit id massa. Metus, scelerisque volutpat nec vel donec. Sagittis,
              id volutpat erat vel.
            </p>
          </section>
        ))}
      </main>
    </div>
    </div>
  )
}

export default Terms