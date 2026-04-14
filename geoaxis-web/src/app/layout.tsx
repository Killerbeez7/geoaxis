import type { Metadata, Viewport } from "next";
import "./globals.css";
// Vercel
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
// Fonts
import { Montserrat, Sofia_Sans } from "next/font/google";
// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
// Data
import { SITE_URL } from "@/config/site";
import { brand } from "@/config/content/brand";
// SEO
import { createSeo } from "@/lib/seo-builder";
import { getLocalBusinessSchema } from "@/lib/schemas";
// Utils
import SquintTest from "@/utils/squintTest";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-mont",
  display: "swap",
});

const sofia = Sofia_Sans({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-sofia",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createSeo({
    title: "Геодезически услуги в София",
    description:
      "GeoAxis предлага професионални геодезически услуги в София и Софийска област — заснемане, трасиране, кадастър, проектиране и градоустройство.",
    canonical: "",
  }),
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#132018",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body
        className={`${montserrat.variable} ${sofia.variable} antialiased flex flex-col relative`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessSchema(SITE_URL)),
          }}
        />
        {/* Content  */}
        <Navbar />
        <main className="grow bg-bg-page min-h-dvh">{children}</main>
        <Footer />

        {/* Utils */}
        <Analytics />
        <SpeedInsights />
        <SquintTest isEnabled={false} />
      </body>
    </html>
  );
}
