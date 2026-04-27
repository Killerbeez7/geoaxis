export interface BrandContent {
  name: string;
  logo: string;
  slogan: string;
  tagline: string;
  location: string;
  description: string;
  metaLine: string;
}

export const BRAND_WORDMARK_PRIMARY = "Geo";
export const BRAND_WORDMARK_SECONDARY = "Axis";

export const brand: BrandContent = {
  name: "GeoAxis",
  logo: "/logo.svg",
  slogan: "Прецизност във всеки детайл",
  tagline: "Геодезия • Кадастър • Градоустройство",
  location: "София и Софийска област",
  description:
    "Предлагаме професионални геодезически услуги в София и Софийска област — заснемане, трасиране, кадастър, проектиране и градоустройство. Гарантирана точност и бързо изпълнение.",
  metaLine: "София • Софийска област • По договаряне",
} as const;
