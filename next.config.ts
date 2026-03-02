import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This replaces the broken --no-types flag
    ignoreBuildErrors: true,
  },
  eslint: {
    // This replaces the broken --no-lint flag
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

export default nextConfig;
