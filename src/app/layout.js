// src/app/layout.js

"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}><ThemeProvider theme={theme}>
          {children}
        </ThemeProvider></body>
    </html>
  );
}
