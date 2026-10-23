import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// vercel.live / pusher are used by the Vercel toolbar on preview deployments.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com https://vercel.live`,
  "style-src 'self' 'unsafe-inline' https://vercel.live",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com",
  "font-src 'self' data: https://vercel.live https://assets.vercel.com",
  "media-src 'self'",
  "connect-src 'self' https://vitals.vercel-insights.com https://vercel.live wss://ws-us3.pusher.com",
  "frame-src https://vercel.live",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
