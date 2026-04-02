export type NavLink = {
  id: "home" | "services" | "helpful" | "projects" | "about" | "contacts";
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: "services" | "helpful";
};

export const NAV_LINKS: readonly NavLink[] = [
  { id: "home", label: "Начало", href: "/" },
  {
    id: "services",
    label: "Услуги",
    href: "/services",
    hasDropdown: true,
    dropdownType: "services",
  },
  {
    id: "helpful",
    label: "Полезно",
    href: "/polezno",
    hasDropdown: true,
    dropdownType: "helpful",
  },
  { id: "projects", label: "Проекти", href: "/projects" },
  { id: "about", label: "За нас", href: "/about" },
  { id: "contacts", label: "Контакти", href: "/contacts" },
] as const;
