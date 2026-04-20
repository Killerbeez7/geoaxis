export interface HeroContent {
  id: "hero";
  title: string[];
  subtitle?: string[];
  kicker?: string;
  image: string;
  imageAlt: string;
  cta?: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

export const hero: HeroContent = {
  id: "hero",
  title: ["Геодезически услуги", "София и област"],
  subtitle: ["От заснемане до кадастър.", "Прецизна работа с ясна комуникация."],
  kicker: "Геодезия • Кадастър • Градоустройство",
  image: "/images/sections/hero-home.webp",
  imageAlt:
    "Геодезически услуги в София и Софийска област — заснемане и трасиране, кадастър, проектиране, градоустройство",
  cta: {
    primary: { label: "Свържи се", href: "/contacts" },
    secondary: { label: "Виж услуги", href: "/uslugi" },
  },
} as const;
