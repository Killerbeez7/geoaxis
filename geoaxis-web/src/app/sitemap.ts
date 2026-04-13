import { MetadataRoute } from "next";
import { serviceCategories } from "@/config/services/categories";
import { SITE_URL } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  // All static pages
  const staticPages = ["", "/uslugi", "/polezno", "/projects", "/about", "/contacts"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
    })
  );

  // Services: Categories + Service Entries
  const serviceUrls: MetadataRoute.Sitemap = serviceCategories.flatMap((category) => {
    const categoryUrl = {
      url: `${baseUrl}/uslugi/${category.slug}`,
      lastModified,
    };

    const detailUrls = category.services.map((service) => ({
      url: `${baseUrl}/uslugi/${category.slug}/${service.slug}`,
      lastModified,
    }));

    return [categoryUrl, ...detailUrls];
  });

  return [...staticPages, ...serviceUrls];
}
