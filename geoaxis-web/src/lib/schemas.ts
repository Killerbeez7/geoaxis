import { siteContent } from "@/config/site-content";
import type { Service } from "@/config/services/categories";
import type { HelpfulArticle } from "@/config/polezno/articles";

const stripSpaces = (s: string) => s.replace(/\s+/g, "");

export function getLocalBusinessSchema(siteUrl: string) {
  const { brand, contacts } = siteContent;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brand.name,
    url: siteUrl,
    logo: `${siteUrl}${brand.logo}`,
    image: `${siteUrl}/og-image.jpg`,
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
      : `${siteUrl}/og-image.jpg`,
  };
}

export function getServiceFAQSchema(service: Service) {
  const faqs: { question: string; answer: string }[] = [];

  if (service.neededWhen?.length) {
    faqs.push({
      question: `Кога е необходима услугата "${service.title}"?`,
      answer: service.neededWhen.join(". ") + ".",
    });
  }

  if (service.deliverables?.length) {
    faqs.push({
      question: `Какво получавам при "${service.title}"?`,
      answer: service.deliverables.join(". ") + ".",
    });
  }

  if (service.requiredDocs?.length) {
    faqs.push({
      question: `Какви документи са необходими за "${service.title}"?`,
      answer: service.requiredDocs.join(". ") + ".",
    });
  }

  if (service.processSteps?.length) {
    faqs.push({
      question: `Как протича процесът за "${service.title}"?`,
      answer: service.processSteps.map((step, i) => `${i + 1}. ${step}`).join(" "),
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
