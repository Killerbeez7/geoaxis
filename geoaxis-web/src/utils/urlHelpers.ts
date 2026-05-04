export function getServiceHref(
  categorySlug: string,
  service: {
    slug: string;
    hasDedicatedPage?: boolean;
  }
) {
  if (service.hasDedicatedPage) {
    return `/uslugi/${categorySlug}/${service.slug}`;
  }

  return `/uslugi/${categorySlug}#${service.slug}`;
}
