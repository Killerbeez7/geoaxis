import { notFound } from "next/navigation";

import { SITE_URL } from "@/config/site";
import { serviceCategories } from "@/config/services/categories";
import { createCategorySeo, createSeo } from "@/lib/seo-builder";
import { getCategoryServicesSchema } from "@/lib/schemas";
import { getCategoryBySlug } from "@/lib/selectors";
import { ServicePageLayout } from "../ServicePageLayout";
import { CategoryServicesList, CategoryServiceDetails } from "../_components/ServicesUi";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return createSeo({
      title: "Услуги",
      description: "Разгледайте нашите геодезически услуги.",
      canonical: "/uslugi",
      noIndex: true,
    });
  }

  return createCategorySeo(categoryData);
}

export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) notFound();

  const categoryPath = `/uslugi/${category.slug}`;
  const jsonLd = getCategoryServicesSchema(SITE_URL, categoryPath, category);

  return (
    <ServicePageLayout category={category}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <article>
        <CategoryServicesList category={category} />

        <div className="mt-8 md:mt-10">
          {category.services.map((service) => (
            <CategoryServiceDetails
              key={service.slug}
              service={service}
              categorySlug={category.slug}
            />
          ))}
        </div>
      </article>
    </ServicePageLayout>
  );
}
