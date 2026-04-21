export interface ServicesContent {
  id: "services";
  kicker?: string;
  title: string;
  subtitle: string;
}

export const services: ServicesContent = {
  id: "services",
  kicker: "Услуги",
  title: "Нашите услуги",
  subtitle:
    "Предлагаме пълен набор от геодезически решения за проектиране, строителство и регулация.",
  // subtitle:
  //   "Независимо дали започвате проект или имате конкретен казус — тук ще намерите нужната услуга.",
} as const;
