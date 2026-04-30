import { MetadataRoute } from "next";
import { serviceCategories } from "@/config/services/categories";

const BASE_URL = "https://geoaxis.bg";

// ──────────────────────────────────────────────
// Update dates here when you change a page.
// Format: YYYY-MM-DD
// ──────────────────────────────────────────────
const staticPages = [
  {
    url: "/",
    lastModified: "2026-04-20",
    priority: 1.0,
    changeFrequency: "weekly" as const,
  },
  {
    url: "/uslugi",
    lastModified: "2026-04-29",
    priority: 0.9,
    changeFrequency: "weekly" as const,
  },
  {
    url: "/polezno",
    lastModified: "2026-04-19",
    priority: 0.8,
    changeFrequency: "weekly" as const,
  },
  {
    url: "/projects",
    lastModified: "2026-04-29",
    priority: 0.6,
    changeFrequency: "monthly" as const,
  },
  {
    url: "/about",
    lastModified: "2026-04-17",
    priority: 0.5,
    changeFrequency: "monthly" as const,
  },
  {
    url: "/contacts",
    lastModified: "2026-04-27",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
];

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

  return [...staticUrls, ...categoryUrls];
}
