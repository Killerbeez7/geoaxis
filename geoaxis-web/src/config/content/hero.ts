export type QuickStartOption = { label: string; service?: string; href?: string };

export const hero = {
  eyebrow: "Геодезия · Кадастър · Градоустройство",
  title: "Геодезически услуги",
  titleAccent: "София и област",
  lead: "От заснемане до кадастър. Прецизна работа с ясна комуникация.",
  image: "/images/sections/hero-home.webp",
  imageAlt: "Геодезист с тотална станция на терен над София",
  quickStartLabel: "С какво можем да помогнем?",
  quickStart: [
    { label: "Заснемане", service: "zasnemane" },
    { label: "Трасиране", service: "trasirane" },
    { label: "Кадастър", service: "kadastar" },
    { label: "ПУП и регулация", service: "gradoustroistvo" },
    { label: "Не съм сигурен", href: "/uslugi#koya-usluga" },
  ] satisfies QuickStartOption[],
} as const;
