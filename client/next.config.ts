import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  devIndicators: {
    buildActivity: false, // Disable build activity
  },
  reactStrictMode: false,

};

export default nextConfig;
