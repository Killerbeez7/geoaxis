import { siteContent } from "@/config/site-content";
import { defaultSeo } from "@/config/seo";
import type { Service, ServiceCategory } from "@/config/services/categories";
import type { HelpfulArticle } from "@/config/polezno/articles";
import { getServiceHref } from "@/utils/urlHelpers";

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

export function getLocalBusinessSchema(siteUrl: string) {
  const { brand, contacts } = siteContent;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    url: siteUrl,
    logo: absoluteUrl(siteUrl, brand.logo),
    image: absoluteUrl(siteUrl, defaultSeo.defaultOgImage),
    telephone: stripSpaces(contacts.phone),
    email: contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "бул. България",
      postalCode: "1618",
      addressLocality: "София",
      addressCountry: "BG",
    },
    areaServed: [
      { "@type": "City", name: "София" },
      { "@type": "AdministrativeArea", name: "Софийска област" },
    ],
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
        streetAddress: "бул. България",
        postalCode: "1618",
        addressLocality: "София",
        addressCountry: "BG",
      },
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
          areaServed: [
            { "@type": "City", name: "София" },
            { "@type": "AdministrativeArea", name: "Софийска област" },
          ],
          provider: {
            "@type": "LocalBusiness",
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

export function getCategoryFAQSchema(category: ServiceCategory) {
  const mainEntity = category.services.flatMap((service) => {
    const content = service.content;
    const entries: { question: string; answer: string }[] = [];

    if (content?.neededWhen?.length) {
      entries.push({
        question: `Кога е необходима услугата "${service.title}"?`,
        answer: content.neededWhen.join(". ") + ".",
      });
    }

    if (content?.deliverables?.length) {
      entries.push({
        question: `Какво получавам при "${service.title}"?`,
        answer: content.deliverables.join(". ") + ".",
      });
    }

    if (content?.requiredDocs?.length) {
      entries.push({
        question: `Какви документи са необходими за "${service.title}"?`,
        answer: content.requiredDocs.join(". ") + ".",
      });
    }

    return entries;
  });

  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mainEntity.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
    image: article.coverImage
      ? `${siteUrl}${article.coverImage.src}`
      : absoluteUrl(siteUrl, defaultSeo.defaultOgImage),
  };
}

export function getServiceFAQSchema(service: Service) {
  const content = service.content;
  const faqs: { question: string; answer: string }[] = [];

  if (content?.neededWhen?.length) {
    faqs.push({
      question: `Кога е необходима услугата "${service.title}"?`,
      answer: content.neededWhen.join(". ") + ".",
    });
  }

  if (content?.deliverables?.length) {
    faqs.push({
      question: `Какво получавам при "${service.title}"?`,
      answer: content.deliverables.join(". ") + ".",
    });
  }

  if (content?.requiredDocs?.length) {
    faqs.push({
      question: `Какви документи са необходими за "${service.title}"?`,
      answer: content.requiredDocs.join(". ") + ".",
    });
  }

  if (content?.processSteps?.length) {
    faqs.push({
      question: `Как протича процесът за "${service.title}"?`,
      answer: content.processSteps.map((step, i) => `${i + 1}. ${step}`).join(" "),
    });
  }

  if (faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
