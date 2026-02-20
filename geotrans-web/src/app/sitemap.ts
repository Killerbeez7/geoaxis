import { MetadataRoute } from "next";
import { siteContent } from "@/config/site-content";

const SERVICE_LINKS = siteContent.serviceLinks;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000/";

  const serviceUrls = SERVICE_LINKS.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/contacts`, lastModified: new Date() },
    ...serviceUrls,
  ];
}
