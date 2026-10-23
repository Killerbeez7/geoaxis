import { notFound } from "next/navigation";

import { SITE_URL } from "@/config/site";
import { serviceCategories } from "@/config/services/categories";
import { createCategorySeo, createSeo } from "@/lib/seo-builder";
import { getCategoryServicesSchema } from "@/lib/schemas";
import { getCategoryBySlug } from "@/lib/selectors";
import { ServicePageLayout } from "../ServicePageLayout";
import { CategoryServicesList, CategoryServiceDetails } from "../_components/ServicesUi";
import { JsonLd } from "@/components/parts/JsonLd";
import { FaqList, faqSchema } from "@/components/sections/FaqSection";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { PriceFactors } from "@/components/parts/PriceFactors";

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
  const faqItems = HELPFUL_FAQ_GROUPS.find((group) => group.slug === category.slug)?.items ?? [];

  return (
    <ServicePageLayout category={category}>
      <JsonLd data={jsonLd} />
      {faqItems.length ? <JsonLd data={faqSchema(faqItems)} /> : null}

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

        <PriceFactors
          serviceSlug={category.slug}
          hasPrices={category.services.some((service) => service.priceFrom)}
          className="mt-14 border-t border-br-light pt-10 md:mt-16"
        />

        {faqItems.length ? (
          <section className="mt-14 border-t border-br-light pt-10 md:mt-16">
            <p className="typo-kicker">Въпроси</p>
            <h2 className="typo-h2 mt-2">Често задавани въпроси</h2>
            <div className="mt-6 max-w-3xl">
              <FaqList items={faqItems} />
            </div>
          </section>
        ) : null}
      </article>
    </ServicePageLayout>
  );
}
