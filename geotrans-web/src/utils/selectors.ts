import { siteContent } from "@/config/site-content";

export const getServices = () => siteContent.services.items;

export const getServiceHref = (slug: string) => `/services/${slug}`;

export const getServiceBySlug = (slug: string) =>
  siteContent.services.items.find((s) => s.slug === slug);

export const getServiceSlugs = () => siteContent.services.items.map((s) => s.slug);

export const getFeaturedServices = () =>
  siteContent.services.items.filter((s) => s.featured);
