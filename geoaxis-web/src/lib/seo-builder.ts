import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
import { defaultSeo } from "@/config/seo";
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
  const normalizedTitle = title?.trim();

  if (!normalizedTitle || normalizedTitle === defaultSeo.defaultTitle) {
    return defaultSeo.defaultTitle;
  }

  const brandSuffix = ` - ${defaultSeo.siteName}`;
  if (normalizedTitle.endsWith(brandSuffix)) {
    return normalizedTitle;
  }

  return defaultSeo.titleTemplate.replace("%s", normalizedTitle);
}

function buildAbsoluteUrl(path: string = "") {
  if (path.startsWith("http")) return path;

  return `${SITE_URL}${path}`;
}

function buildImageUrl(image?: string) {
  const selected = image || defaultSeo.defaultOgImage;
  return selected.startsWith("http") ? selected : `${SITE_URL}${selected}`;
}

function addAreaContext(description: string) {
  if (description.includes("София")) return description;

  return `${description} София и Софийска област.`;
}

function normalizeDescription(description: string | string[]) {
  return Array.isArray(description) ? description.join(" ") : description;
}

export function createSeo({
  title,
  description = defaultSeo.defaultDescription,
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
    title: {
      absolute: fullTitle,
    },
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
      siteName: defaultSeo.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: defaultSeo.locale,
      type: "website",
    },
    twitter: {
      card: defaultSeo.twitterCard,
      title: fullTitle,
      description,
      images: [fullImage],
    },
  };
}

export function createCategorySeo(category: ServiceCategory): Metadata {
  const categoryDescription = normalizeDescription(
    category.longDescription ?? category.description
  );

  return createSeo({
    title: category.seo?.title ?? `${category.title} в София и Софийска област`,
    description: category.seo?.description ?? addAreaContext(categoryDescription),
    canonical: `/uslugi/${category.slug}`,
    image: category.heroImage || category.thumbnail || defaultSeo.defaultOgImage,
  });
}

export function createServiceSeo(category: ServiceCategory, service: Service): Metadata {
  return createSeo({
    title: `${service.title} в София и Софийска област`,
    description: addAreaContext(
      normalizeDescription(service.longDescription ?? service.description)
    ),
    canonical: `/uslugi/${category.slug}`,
    image:
      service.heroImage || service.thumbnail || category.heroImage || category.thumbnail,
    noIndex: true,
  });
}
