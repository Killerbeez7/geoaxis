interface BrandContent {
  logo: string;
  slogan: string;
  name: string;
  tagline: string;
  metaLine: string;
}

export const brand: BrandContent = {
  logo: "/images/brand/logo.svg",
  slogan: "Accurate Land Solutions",
  name: "GeoAxis",
  tagline: "Прецизни геодезически услуги, ясни срокове и надеждна документация.",
  metaLine: "София • Софийска област • По договаряне",
} as const;
