import type { MetadataRoute } from "next";
import { serviceCategories } from "@/config/services/categories";
import { HELPFUL_ARTICLES } from "@/config/polezno/articles";
import { HELPFUL_NAV_ITEMS } from "@/config/polezno/helpful-nav";
import { SITE_URL } from "@/config/site";

const BASE_URL = SITE_URL;

// ──────────────────────────────────────────────
// Update dates here when you change a page.
// Format: YYYY-MM-DD
// ──────────────────────────────────────────────
const staticPages = [
  {
    url: "/",
    lastModified: "2026-10-31",
    priority: 1.0,
    changeFrequency: "weekly" as const,
  },
  {
    url: "/uslugi",
    lastModified: "2026-10-31",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    url: "/polezno",
    lastModified: "2026-10-31",
    priority: 0.8,
    changeFrequency: "weekly" as const,
  },
  {
    url: "/projects",
    lastModified: "2026-10-31",
    priority: 0.6,
    changeFrequency: "monthly" as const,
  },
  {
    url: "/about",
    lastModified: "2026-10-31",
    priority: 0.5,
    changeFrequency: "monthly" as const,
  },
  {
    url: "/contacts",
    lastModified: "2026-10-31",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
  {
    url: "/politika-za-poveritelnost",
    lastModified: "2026-10-31",
    priority: 0.2,
    changeFrequency: "yearly" as const,
  },
  {
    url: "/usloviya-za-polzvane",
    lastModified: "2026-10-31",
    priority: 0.2,
    changeFrequency: "yearly" as const,
  },
];

const helpfulSectionMeta: Record<
  (typeof HELPFUL_NAV_ITEMS)[number]["slug"],
  {
    lastModified: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }
> = {
  statii: {
    lastModified: "2026-10-31",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  rakovodstva: {
    lastModified: "2026-10-31",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  faq: {
    lastModified: "2026-10-31",
    priority: 0.55,
    changeFrequency: "monthly",
  },
  rechnik: {
    lastModified: "2026-10-31",
    priority: 0.55,
    changeFrequency: "monthly",
  },
  resursi: {
    lastModified: "2026-10-31",
    priority: 0.55,
    changeFrequency: "monthly",
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticUrls = staticPages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: page.lastModified,
    priority: page.priority,
    changeFrequency: page.changeFrequency,
  }));

  // Category pages — uses category.updatedAt
  const categoryUrls = serviceCategories.map((category) => ({
    url: `${BASE_URL}/uslugi/${category.slug}`,
    lastModified: category.updatedAt,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  // Dedicated service pages — only services restored as real pages.
  const serviceUrls = serviceCategories.flatMap((category) =>
    category.services
      .filter((service) => service.hasDedicatedPage)
      .map((service) => ({
        url: `${BASE_URL}/uslugi/${category.slug}/${service.slug}`,
        lastModified: service.updatedAt ?? category.updatedAt,
        priority: 0.75,
        changeFrequency: "monthly" as const,
      }))
  );

  // Useful pages
  const helpfulSectionUrls = HELPFUL_NAV_ITEMS.map((item) => {
    const meta = helpfulSectionMeta[item.slug];

    return {
      url: `${BASE_URL}${item.href}`,
      lastModified: meta.lastModified,
      priority: meta.priority,
      changeFrequency: meta.changeFrequency,
    };
  });

  // Article pages
  const helpfulArticleUrls = HELPFUL_ARTICLES.map((article) => ({
    url: `${BASE_URL}/polezno/${article.section}/${article.slug}`,
    lastModified: article.updatedAt ?? article.publishedAt,
    priority: 0.65,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...staticUrls,
    ...categoryUrls,
    ...serviceUrls,
    ...helpfulSectionUrls,
    ...helpfulArticleUrls,
  ];
}
