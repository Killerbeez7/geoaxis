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
        source: "/uslugi/proektirane/proektantski-uslugi",
        destination: "/uslugi/proektirane#geodezicheski-danni-za-proektirane",
        permanent: true,
      },
      {
        source: "/uslugi/konsultacia/sadeistvie-pri-proceduri",
        destination: "/uslugi/konsultacia#analiz-i-nasoki",
        permanent: true,
      },
      {
        source: "/uslugi/konsultacia/proverka-na-danni-i-syvpadeniya",
        destination: "/uslugi/konsultacia#analiz-i-nasoki",
        permanent: true,
      },
      {
        source: "/uslugi/konsultacia/nasoki-za-sledvashti-stypki",
        destination: "/uslugi/konsultacia#analiz-i-nasoki",
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
