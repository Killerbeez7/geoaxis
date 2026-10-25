// Light generated backgrounds behind the category and service page headers (decorative).
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
