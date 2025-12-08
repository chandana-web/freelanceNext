// src/app/(website)/layout.js
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
}
