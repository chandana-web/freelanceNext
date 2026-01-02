/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Firebase (already working)
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },

      // ✅ YOUR BACKEND (THIS WAS MISSING)
      {
        protocol: "https",
        hostname: "api.goexpertsapps.com",
        pathname: "/**",
      },

      // optional: local dev
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;



