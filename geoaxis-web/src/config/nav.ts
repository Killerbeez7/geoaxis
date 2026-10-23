export type NavItem = {
  id: "services" | "projects" | "helpful" | "about" | "contacts";
  label: string;
  href: string;
  /** Items with a menu open a panel instead of navigating straight away */
  menu?: "services" | "helpful";
};

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "services", label: "Услуги", href: "/uslugi", menu: "services" },
  { id: "projects", label: "Проекти", href: "/projects" },
  { id: "helpful", label: "Полезно", href: "/polezno", menu: "helpful" },
  { id: "about", label: "За нас", href: "/about" },
  { id: "contacts", label: "Контакти", href: "/contacts" },
];

export const LEGAL_LINKS = [
  { label: "Политика за поверителност", href: "/politika-za-poveritelnost" },
  { label: "Условия за ползване", href: "/usloviya-za-polzvane" },
] as const;
