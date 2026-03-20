import { NAV_LINKS } from "./nav";
import { siteContent } from "./site-content";
import { serviceCategories } from "@/config/services/categories";

const { contacts, brand } = siteContent;

const mainLinks = NAV_LINKS.filter((navLink) => navLink.id !== "services").map(
  (navLink) => ({
    label: navLink.label,
    href: navLink.href,
  })
);

const quickLinks = serviceCategories.map((cat) => ({
  label: cat.title,
  href: `/services/${cat.slug}`,
}));

export const FOOTER = {
  brand,

  sections: [
    {
      title: "Бързи линкове",
      links: mainLinks,
    },

    {
      title: "Услуги",
      links: quickLinks,
    },
  ],

  contact: {
    email: contacts.email,
    phone: contacts.phone,
    addressLines: contacts.address
      .split("||")
      .map((s) => s.trim())
      .filter(Boolean),
    mapsHref: contacts.mapsUrl,
  },

  ctas: {
    inquiry: { label: "Запитване", href: "/contacts" },
    projects: { label: "Проекти", href: "/projects" },
  },
} as const;
