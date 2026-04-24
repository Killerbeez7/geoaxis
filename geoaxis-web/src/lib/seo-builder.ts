import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import { seoConfig } from "@/config/seo";
import type { ServiceCategory, Service } from "@/config/services/categories";

type SeoInput = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

function buildTitle(title?: string) {
  // EXAMPLE: "Геодезически услуги София - GeoAxis"
  if (!title || title === seoConfig.defaultTitle) {
    return seoConfig.defaultTitle;
  }

  return seoConfig.titleTemplate.replace("%s", title);
}

function buildAbsoluteUrl(path: string = "") {
  if (path.startsWith("http")) return path;

  return `${SITE_URL}${path}`;
}

function buildImageUrl(image?: string) {
  const selected = image || seoConfig.defaultOgImage;
  return selected.startsWith("http") ? selected : `${SITE_URL}${selected}`;
}

function addAreaContext(description: string) {
  if (description.includes("София")) return description;

  return `${description} София и Софийска област.`;
}

export function createSeo({
  title,
  description = seoConfig.defaultDescription,
  canonical = "",
  image,
  noIndex = false,
  noFollow = false,
}: SeoInput): Metadata {
  /*** Create Seo USAGE: 
  import { createSeo } from "@/lib/seo-builder";

  export const metadata = createSeo({
    title: "[page_title]",
    description: [page_description]
    path: "[page_href]",
  });
  
  ***/
  const fullTitle = buildTitle(title);
  const fullUrl = buildAbsoluteUrl(canonical);
  const fullImage = buildImageUrl(image);

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: fullUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: seoConfig.locale,
      type: "website",
    },
    twitter: {
      card: seoConfig.twitterCard,
      title: fullTitle,
      description,
      images: [fullImage],
    },
  };
}

export function createCategorySeo(category: ServiceCategory): Metadata {
  return createSeo({
    title: `${category.title} в София и Софийска област`,
    description: addAreaContext(category.longDescription ?? category.description),
    canonical: `/uslugi/${category.slug}`,
    image: category.heroImage || category.thumbnail || seoConfig.defaultOgImage,
  });
}

export function createServiceSeo(category: ServiceCategory, service: Service): Metadata {
  return createSeo({
    title: `${service.title} в София и Софийска област`,
    description: addAreaContext(service.longDescription ?? service.description),
    canonical: `/uslugi/${category.slug}/${service.slug}`,
    image:
      service.heroImage || service.thumbnail || category.heroImage || category.thumbnail,
  });
}
