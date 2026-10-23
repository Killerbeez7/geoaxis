import type { Metadata, Viewport } from "next";
import "./globals.css";
// Vercel
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Fonts
import { Montserrat } from "next/font/google";
// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
// Data
import { SITE_URL } from "@/config/site";
import { defaultSeo } from "@/config/seo";
// Schemas
import { getLocalBusinessSchema } from "@/lib/schemas";
import { DEFAULT_OG_IMAGE } from "@/lib/og-image";
import { JsonLd } from "@/components/parts/JsonLd";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { MotionProvider } from "@/components/layout/MotionProvider";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-mont",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultSeo.defaultTitle,
    template: defaultSeo.titleTemplate,
  },
  description: defaultSeo.defaultDescription,
  openGraph: {
    siteName: defaultSeo.siteName,
    title: defaultSeo.defaultTitle,
    description: defaultSeo.defaultDescription,
    url: SITE_URL,
    locale: defaultSeo.locale,
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: defaultSeo.twitterCard,
    title: defaultSeo.defaultTitle,
    description: defaultSeo.defaultDescription,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: defaultSeo.robots,
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#253a31",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body
        className={`${montserrat.variable} antialiased flex flex-col relative`}
      >
        <JsonLd data={getLocalBusinessSchema(SITE_URL)} />
        <a href="#main-content" className="skip-link">
          Към съдържанието
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="grow bg-bg-page min-h-dvh">
            {children}
          </main>
          <Footer />
          <MobileActionBar />
        </MotionProvider>

        {/* Utils */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
