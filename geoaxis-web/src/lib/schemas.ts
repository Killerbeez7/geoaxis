import { siteContent } from "@/config/site-content";
import type { Service, ServiceCategory } from "@/config/services/categories";
import { company } from "@/config/content/company";
import type { HelpfulArticle } from "@/config/polezno/articles";
import { getServiceHref } from "@/utils/urlHelpers";
import { toOgImage } from "@/lib/og-image";

const stripSpaces = (s: string) => s.replace(/\s+/g, "");
const absoluteUrl = (siteUrl: string, path: string) =>
  path.startsWith("http") ? path : `${siteUrl}${path}`;

export function getWebSiteSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GeoAxis",
    alternateName: "GeoAxis Bulgaria",
    url: `${siteUrl}/`,
  };
}

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "бул. България",
  postalCode: "1618",
  addressLocality: "София",
  addressCountry: "BG",
};

const AREA_SERVED = [
  { "@type": "City", name: "София" },
  { "@type": "AdministrativeArea", name: "Софийска област" },
];

export function getLocalBusinessSchema(siteUrl: string) {
  const { brand, contacts } = siteContent;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    name: brand.name,
    ...(company.legalName ? { legalName: company.legalName } : {}),
    ...(company.vatNumber ? { vatID: company.vatNumber } : {}),
    description: brand.description,
    url: siteUrl,
    logo: absoluteUrl(siteUrl, brand.logo),
    image: absoluteUrl(siteUrl, toOgImage()),
    telephone: stripSpaces(contacts.phone),
    email: contacts.email,
    address: POSTAL_ADDRESS,
    areaServed: AREA_SERVED,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "17:30",
      },
    ],
    ...(company.googleBusinessUrl ? { sameAs: [company.googleBusinessUrl] } : {}),
  };
}

export function getServiceSchema(siteUrl: string, path: string, service: Service) {
  const { brand, contacts } = siteContent;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    url: `${siteUrl}${path}`,
    areaServed: AREA_SERVED,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: brand.name,
      url: siteUrl,
      telephone: stripSpaces(contacts.phone),
      email: contacts.email,
      address: POSTAL_ADDRESS,
    },
  };
}

export function getCategoryServicesSchema(
  siteUrl: string,
  categoryPath: string,
  category: ServiceCategory
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.title} - услуги`,
    description: category.longDescription ?? category.description,
    url: `${siteUrl}${categoryPath}`,
    itemListElement: category.services.map((service, index) => {
      const servicePath = getServiceHref(category.slug, service);

      return {
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}${servicePath}`,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.longDescription ?? service.description,
          serviceType: service.title,
          url: `${siteUrl}${servicePath}`,
          areaServed: AREA_SERVED,
          provider: {
            "@type": "ProfessionalService",
            "@id": `${siteUrl}/#business`,
            name: siteContent.brand.name,
            url: siteUrl,
            telephone: stripSpaces(siteContent.contacts.phone),
            email: siteContent.contacts.email,
          },
        },
      };
    }),
  };
}

export function getArticleSchema(siteUrl: string, article: HelpfulArticle) {
  const { brand } = siteContent;

  const articleUrl = `${siteUrl}/polezno/${article.section}/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Organization",
      name: brand.name,
    },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${brand.logo}`,
      },
    },
    image: absoluteUrl(siteUrl, toOgImage(article.coverImage?.src)),
  };
}
