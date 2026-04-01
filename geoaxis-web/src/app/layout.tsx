import "./globals.css";
import type { Metadata } from "next";
// vercel
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Montserrat, Sofia_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getLocalBusinessSchema } from "@/utils/structured-data";
import { SITE_URL } from "@/config/site";
import { siteContent } from "@/config/site-content";
import SquintTest from "@/utils/squintTest";

const { name, tagline } = siteContent.brand;

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-mont",
  display: "swap",
});

const sofia = Sofia_Sans({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-sofia",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${name} | ${tagline}`,
    template: `%s | ${name}`,
  },

  description:
    "Геодезически услуги в София и Софийска област - геодезическо заснемане, трасиране, кадастър и вертикална планировка с гарантирана точност.",

  keywords: [
    "геодезист София",
    "геодезически услуги София",
    "геодезическо заснемане София",
    "трасиране София",
    "кадастър София",
    "вертикална планировка София",
    "GeoTrans",
    "София",
    "Софийска област",
  ],

  openGraph: {
    title: `${name} | ${tagline}`,
    description:
      "Професионални геодезически услуги в София и Софийска област - геодезическо заснемане, трасиране, кадастър и вертикална планировка с гарантирана точност.",
    url: SITE_URL,
    siteName: name,
    locale: "bg_BG",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
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

        <Navbar />

        <main className="grow bg-bg-page">{children}</main>

        <Footer />

        {/* Utility / Helper */}
        <SquintTest isEnabled={false} />
        {/* Vercel */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
