import { MetadataRoute } from "next";
import { serviceCategories } from "@/config/services/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000/";

  const lastModified = new Date();

  const serviceUrls: MetadataRoute.Sitemap = serviceCategories.flatMap((category) => {
    const categoryUrl: MetadataRoute.Sitemap = [
      { url: `${baseUrl}/services/${category.slug}`, lastModified },
    ];

    const detailUrls: MetadataRoute.Sitemap = category.services.map((service) => ({
      url: `${baseUrl}/services/${category.slug}/${service.slug}`,
      lastModified,
    }));

    return [...categoryUrl, ...detailUrls];
  });

  return [
    { url: baseUrl, lastModified },
    { url: `${baseUrl}/services`, lastModified },
    { url: `${baseUrl}/contacts`, lastModified },
    ...serviceUrls,
  ];
}
