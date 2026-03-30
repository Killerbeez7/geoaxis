export interface ServicesContent {
  id: "services";
  kicker: string;
  title: string;
  subtitle: string;
}

export const services: ServicesContent = {
  id: "services",
  kicker: "Какво предлагаме",
  title: "Точност във всяка услуга",
  subtitle:
    "Предлагаме пълен набор от геодезически решения за проектиране, строителство и регулация.",
  // id: "services",
  // kicker: "Какво предлагаме",
  // title: "Точност във всяка услуга",
  // subtitle:
  //   "Предлагаме пълен набор от геодезически решения за проектиране, строителство и регулация.",
} as const;
