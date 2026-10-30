// Light generated backgrounds behind every page header (decorative). One set of images, matched by topic.
export const CATEGORY_BACKDROPS: Record<string, string> = {
  zasnemane: "/images/sections/services-hero-zasnemane.webp",
  trasirane: "/images/sections/services-hero-trasirane.webp",
  kadastar: "/images/sections/services-hero-kadastar.webp",
  proektirane: "/images/sections/services-hero-proektirane.webp",
  gradoustroistvo: "/images/sections/services-hero-gradoustroistvo.webp",
  konsultacia: "/images/sections/services-hero-konsultacia.webp",
};

export function getCategoryBackdrop(slug: string) {
  return CATEGORY_BACKDROPS[slug] ?? "/images/sections/services-hero-abstract-01.webp";
}

const SECTIONS = "/images/sections";

// Pages outside the service catalogue
export const PAGE_BACKDROPS = {
  services: `${SECTIONS}/services-hero-proektirane.webp`,
  about: `${SECTIONS}/services-hero-zasnemane.webp`,
  contacts: `${SECTIONS}/services-hero-gradoustroistvo.webp`,
  projects: `${SECTIONS}/services-hero-kadastar.webp`,
  polezno: `${SECTIONS}/services-hero-konsultacia.webp`,
  legal: `${SECTIONS}/services-hero-konsultacia.webp`,
  notFound: `${SECTIONS}/services-hero-trasirane.webp`,
} as const;

// Articles take the backdrop of their topic's service category
const ARTICLE_TOPIC_CATEGORY: Record<string, string> = {
  geodezia: "zasnemane",
  kadastar: "kadastar",
  trasirane: "trasirane",
  gradoustroistvo: "gradoustroistvo",
  pup: "gradoustroistvo",
  polezno: "konsultacia",
};

export function getArticleBackdrop(category: string) {
  return getCategoryBackdrop(ARTICLE_TOPIC_CATEGORY[category] ?? "konsultacia");
}
