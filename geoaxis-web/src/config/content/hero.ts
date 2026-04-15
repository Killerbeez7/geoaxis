export interface HeroContent {
  id: "hero";
  title: string;
  subtitle?: string;
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
  title: " Точни измервания. || Сигурен резултат.",
  // title: "Геодезически услуги София, || Заснемане, Трасиране, Кадастър.",
  // title: "Геодезически услуги в София, || от заснемане до кадастър.",
  subtitle:
    "Геодезически услуги в София и област – от заснемане на парцел до нанасяне в кадастър.",
  // "Геодезически услуги в София и област – от заснемане до кадастър.",
  kicker: "Геодезия • Кадастър • Градоустройство",
  image: "/images/sections/home-hero.webp",
  imageAlt:
    "Геодезически услуги в София и Софийска област – заснемане и трасиране, кадастър, проектиране, градоустройство",
  cta: {
    primary: { label: "Свържи се", href: "/contacts" },
    secondary: { label: "Виж услуги", href: "/uslugi" },
  },
} as const;
