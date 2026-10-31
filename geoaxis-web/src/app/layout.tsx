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
import { JsonLd } from "@/components/ui/JsonLd";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { AnalyticsClicks } from "@/components/layout/AnalyticsClicks";
import { serviceCategories } from "@/config/services/categories";
import { HELPFUL_NAV_ITEMS } from "@/config/polezno/helpful-nav";

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
  themeColor: "#14211b",
};

// Only what the menus need, so the full service texts stay out of the client bundle.
const navServices = serviceCategories.map((category) => ({
  slug: category.slug,
  title: category.title,
  // The short tag line keeps the mega menu to one calm line per category
  description: category.meta ?? category.description,
}));

const navHelpful = HELPFUL_NAV_ITEMS.map((item) => ({
  href: item.href,
  label: item.label,
  description: item.description,
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body className={`${montserrat.variable} flex min-h-dvh flex-col`}>
        <JsonLd data={getLocalBusinessSchema(SITE_URL)} />
        <a href="#main-content" className="skip-link">
          Към съдържанието
        </a>
        <Navbar services={navServices} helpful={navHelpful} />
        <main id="main-content" tabIndex={-1} className="grow bg-bg-page outline-none">
          {children}
        </main>
        <Footer />
        <MobileActionBar />

        <AnalyticsClicks />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
