import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body  suppressHydrationWarning={true}
        className="min-vh-100 d-flex flex-column">
        <Navbar/>
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
