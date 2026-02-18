export interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
}
export const NAV_LINKS: NavItem[] = [
  { id: "home", label: "Начало", href: "/" },
  { id: "services", label: "Услуги", href: "/services", hasDropdown: true },
  { id: "projects", label: "Проекти", href: "/projects" },
  { id: "about", label: "За нас", href: "/about" },
  { id: "contacts", label: "Контакти", href: "/contacts" },
];
