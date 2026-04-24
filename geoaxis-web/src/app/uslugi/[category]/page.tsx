import { notFound } from "next/navigation";

import { serviceCategories } from "@/config/services/categories";
import { createCategorySeo, createSeo } from "@/lib/seo-builder";
import { getCategoryBySlug } from "@/lib/selectors";
import { ServicePageLayout } from "../ServicePageLayout";
import {
  HelpPanel,
  SectionIntro,
  ServiceSummaryCard,
} from "../_components/ServicesUi";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const categoryData = getCategoryBySlug(category);

  if (!categoryData) {
    return createSeo({
      title: "Услуги",
      description: "Разгледайте геодезическите услуги на GeoAxis.",
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

  return (
    <ServicePageLayout category={category}>
      <article>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow="Услуги в категорията"
            title="Изберете конкретна услуга"
            description="Изберете конкретната услуга, която отговаря на вашата ситуация. Всяка страница показва кога е нужна, какви документи са полезни и как протича работата."
          />
        </div>

        <div className="mt-8 grid gap-5 md:mt-12">
          {category.services.map((service) => (
            <ServiceSummaryCard
              key={service.slug}
              category={category}
              service={service}
            />
          ))}
        </div>

        <div className="mt-10 md:mt-12">
          <HelpPanel
            title="Не сте сигурни коя от тези услуги ви трябва?"
            description="Изпратете кратко описание на имота или процедурата. Ще ви насочим към правилната услуга и ще кажем кои документи да подготвите."
            secondaryHref="/uslugi"
            secondaryLabel="Всички категории"
          />
        </div>
      </article>
    </ServicePageLayout>
  );
}
