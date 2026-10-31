export type QuickStartOption = { label: string; service: string };

export const hero = {
  eyebrow: "Геодезия · Кадастър · Градоустройство",
  title: "Геодезически услуги",
  titleAccent: "в София и областта",
  lead: "Заснемане, трасиране, кадастър и ПУП – с точна оферта и ясен срок.",
  image: "/images/sections/hero-home.webp",
  imageAlt: "Геодезист с тотална станция на терен над София",
  quickStartLabel: "С какво можем да помогнем?",
  quickStart: [
    { label: "Заснемане", service: "zasnemane" },
    { label: "Трасиране", service: "trasirane" },
    { label: "Кадастър", service: "kadastar" },
    { label: "ПУП и регулация", service: "gradoustroistvo" },
  ] satisfies QuickStartOption[],
} as const;
