import { serviceCategories } from "@/config/services/categories";

export const getCategoryBySlug = (slug: string) =>
  serviceCategories.find((category) => category.slug === slug);

export const getServiceBySlugs = (categorySlug: string, serviceSlug: string) => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;

  const service = category.items.find((item) => item.slug === serviceSlug);
  if (!service) return undefined;

  return { category, service };
};

export const getServiceRouteParams = () =>
  serviceCategories.flatMap((category) =>
    category.items.map((service) => ({
      category: category.slug,
      service: service.slug,
    }))
  );
