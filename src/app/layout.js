// src/app/layout.js

"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-poppins), sans-serif",
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body suppressHydrationWarning>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

