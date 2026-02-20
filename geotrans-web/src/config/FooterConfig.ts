import { NAV_LINKS } from "./NavConfig";
import { siteContent } from "./site-content";

const nav = {
  home: NAV_LINKS.find((x) => x.id === "home")!,
  services: NAV_LINKS.find((x) => x.id === "services")!,
  projects: NAV_LINKS.find((x) => x.id === "projects")!,
  about: NAV_LINKS.find((x) => x.id === "about")!,
  contacts: NAV_LINKS.find((x) => x.id === "contacts")!,
};

const { contacts, brand, services } = siteContent;

const featured = services.items.filter((s) => s.featured);
const footerServices = (featured.length ? featured : services.items.slice(0, 3)).map(
  (s) => ({ label: s.title, href: `/services/${s.slug}` })
);

export const FOOTER = {
  brand,

  sections: [
    {
      title: "Бързи линкове",
      links: [
        { label: nav.home.label, href: nav.home.href },
        { label: nav.about.label, href: nav.about.href },
        { label: nav.projects.label, href: nav.projects.href },
        { label: nav.contacts.label, href: nav.contacts.href },
      ],
    },
    {
      title: "Услуги",
      links: [...footerServices],
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
    inquiry: { label: "Запитване", href: nav.contacts.href },
    projects: { label: "Проекти", href: nav.projects.href },
  },
} as const;
