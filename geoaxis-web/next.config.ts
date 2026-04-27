import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/uslugi/trasirane/na-sgradi",
        destination: "/uslugi/trasirane#na-sgrada",
        permanent: true,
      },
      {
        source: "/uslugi/trasirane/na-lineyni-saorazhenia",
        destination: "/uslugi/trasirane#na-lineyni-saorazheniya",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/uslugi",
        permanent: true,
      },
      {
        source: "/services/:path*",
        destination: "/uslugi/:path*",
        permanent: true,
      },
    ];
  },
  reactCompiler: true,
};

export default nextConfig;
