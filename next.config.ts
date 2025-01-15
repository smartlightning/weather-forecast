import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'], // Allow OpenWeatherMap images
  },
};

export default nextConfig;
