import { siteContent } from "@/config/site-content";
import type { Service } from "@/config/services/categories";

const stripSpaces = (s: string) => s.replace(/\s+/g, "");

export function getLocalBusinessSchema(siteUrl: string) {
  const { brand, contacts } = siteContent;

  const [streetRaw = "", cityRaw = ""] = contacts.address
    .split("||")
    .map((s) => s.trim());

  const telephone = stripSpaces(contacts.phone);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    url: siteUrl,
    telephone,
    email: contacts.email,
    areaServed: [
      { "@type": "City", name: "София" },
      { "@type": "AdministrativeArea", name: "Софийска област" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: streetRaw || undefined,
      addressLocality: cityRaw || "София",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "42.6977",
      longitude: "23.3219",
    },
    sameAs: ["https://www.facebook.com/GeoTrans"],
  };
}

export function getServiceSchema(siteUrl: string, service: Service) {
  const { brand, contacts } = siteContent;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} в София`,
    description: service.description,
    serviceType: service.title,
    url: `${siteUrl}/services/${service.slug}`,
    areaServed: [
      { "@type": "City", name: "София" },
      { "@type": "AdministrativeArea", name: "Софийска област" },
    ],
    provider: {
      "@type": "LocalBusiness",
      name: brand.name,
      url: siteUrl,
      telephone: stripSpaces(contacts.phone),
      email: contacts.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "София",
        addressCountry: "BG",
      },
    },
  };
}
