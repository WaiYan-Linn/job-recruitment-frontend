import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/employer/:id",
        destination: "/public-employer/:id",
      },
    ];
  },
};

export default nextConfig;
