import { notFound, permanentRedirect } from "next/navigation";

import { createSeo } from "@/lib/seo-builder";
import { getServiceBySlugs, getServiceRouteParams } from "@/lib/selectors";

type Props = {
  params: Promise<{
    category: string;
    service: string;
  }>;
};

function toSeoDescription(description: string | string[] | undefined, fallback: string) {
  if (Array.isArray(description)) return description.join(" ");
  return description ?? fallback;
}

export async function generateMetadata({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const result = getServiceBySlugs(categorySlug, serviceSlug);

  if (!result) {
    return createSeo({
      title: "Услуга",
      description: "Подробности за геодезическа услуга.",
      canonical: `/uslugi/${categorySlug}/${serviceSlug}`,
      noIndex: true,
    });
  }

  const { category, service } = result;

  return createSeo({
    title: `${service.title} в София и Софийска област`,
    description: toSeoDescription(service.longDescription, service.description),
    canonical: `/uslugi/${category.slug}`,
    image: service.heroImage || service.thumbnail || category.heroImage || category.thumbnail,
    noIndex: true,
  });
}

export async function generateStaticParams() {
  return getServiceRouteParams();
}

export default async function ServicePage({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const result = getServiceBySlugs(categorySlug, serviceSlug);

  if (!result) notFound();

  permanentRedirect(`/uslugi/${result.category.slug}#${result.service.slug}`);
}
