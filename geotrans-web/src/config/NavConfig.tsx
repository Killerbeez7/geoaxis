export type NavLink = {
  id: "home" | "services" | "projects" | "about" | "contacts";
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export const NAV_LINKS: readonly NavLink[] = [
  { id: "home", label: "Начало", href: "/" },
  { id: "services", label: "Услуги", href: "/services", hasDropdown: true },
  { id: "projects", label: "Проекти", href: "/projects" },
  { id: "about", label: "За нас", href: "/about" },
  { id: "contacts", label: "Контакти", href: "/contacts" },
] as const;
