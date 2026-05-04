import { serviceCategories } from "@/config/services/categories";

export const getCategoryBySlug = (slug: string) =>
  serviceCategories.find((category) => category.slug === slug);

export const getServiceBySlugs = (categorySlug: string, serviceSlug: string) => {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;

  const service = category.services.find((item) => item.slug === serviceSlug);
  if (!service) return undefined;

  return { category, service };
};

export const getServiceRouteParams = () =>
  serviceCategories.flatMap((cat) =>
    cat.services.map((srv) => ({
      category: cat.slug,
      service: srv.slug,
    }))
  );

export const getDedicatedServiceRouteParams = () =>
  serviceCategories.flatMap((cat) =>
    cat.services
      .filter((srv) => srv.hasDedicatedPage)
      .map((srv) => ({
        category: cat.slug,
        service: srv.slug,
      }))
  );
