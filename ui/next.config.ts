import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://static.alchemyapi.io/images/assets/**")],
  },
};

export default nextConfig;
