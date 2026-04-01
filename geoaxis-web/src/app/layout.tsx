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
import { createSeo } from "@/lib/seo";
import { getLocalBusinessSchema } from "@/lib/structured-data";
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
});

export const metadata = createSeo({
  title: brand.tagline,
  description: brand.description,
  path: "/",
});

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
