import { notFound } from "next/navigation";

import { SITE_URL } from "@/config/site";
import { getCategoryBackdrop } from "@/config/services/backdrops";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { serviceCategories } from "@/config/services/categories";
import { createCategorySeo, createSeo } from "@/lib/seo-builder";
import { withoutRepeatedPhotos } from "@/lib/photos";
import { getCategoryServicesSchema } from "@/lib/schemas";
import { getCategoryBySlug } from "@/lib/selectors";
import { normalizeParagraphs } from "@/utils/normalizeText";
import { getArticlesForServiceCategory } from "@/lib/articles";
import { TopicArticles } from "@/components/polezno/TopicArticles";
import { CategoryServiceItem } from "@/components/services/CategoryServiceItem";
import { PriceFactors } from "@/components/services/PriceFactors";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion, faqSchema } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Text";

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
  return serviceCategories.map((category) => ({ category: category.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) notFound();

  const faqItems = HELPFUL_FAQ_GROUPS.find((group) => group.slug === category.slug)?.items ?? [];
  const [lead] = normalizeParagraphs(category.longDescription ?? category.description);
  const serviceImages = withoutRepeatedPhotos(category.services.map((service) => service.thumbnail));

  return (
    <>
      <JsonLd data={getCategoryServicesSchema(SITE_URL, `/uslugi/${category.slug}`, category)} />
      {faqItems.length ? <JsonLd data={faqSchema(faqItems)} /> : null}

      <PageHero
        breadcrumbs={[
          { label: "Услуги", href: "/uslugi" },
          { label: category.shortTitle ?? category.title, href: `/uslugi/${category.slug}` },
        ]}
        title={category.title}
        description={lead}
        backdrop={getCategoryBackdrop(category.slug)}
        actions={
          <Button href={`/contacts?service=${category.slug}`} size="lg" arrow track="quote_click">
            Поискайте оферта
          </Button>
        }
      />

      <Section aria-labelledby="category-services-title">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Heading id="category-services-title">Услугите в тази категория</Heading>
            <Text size="small" tone="muted">
              {category.services.length} услуги
            </Text>
          </div>

          {/* Jump links on phones and tablets */}
          <nav aria-label="Услуги в категорията" className="mt-6 lg:hidden">
            <ul className="flex flex-wrap gap-2">
              {category.services.map((service) => (
                <li key={service.slug}>
                  <Chip href={`#${service.slug}`} size="sm">
                    {service.shortTitle ?? service.title}
                  </Chip>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 grid gap-6">
            {category.services.map((service, index) => (
              <CategoryServiceItem
                key={service.slug}
                service={service}
                categorySlug={category.slug}
                image={serviceImages[index]}
              />
            ))}
          </div>

          <PriceFactors
            serviceSlug={category.slug}
            hasPrices={category.services.some((service) => service.priceFrom)}
            className="mt-16 border-t border-br-light pt-12"
          />

          {faqItems.length ? (
            <section aria-labelledby="category-faq-title" className="mt-16 border-t border-br-light pt-12">
              <Heading id="category-faq-title" size="h3">
                Често задавани въпроси
              </Heading>
              <div className="mt-6">
                <FaqAccordion items={faqItems} />
              </div>
            </section>
          ) : null}

          {/* Phones and tablets; on desktop the links stay in the page for search engines */}
          <TopicArticles articles={getArticlesForServiceCategory(category.slug)} className="mt-16 lg:hidden" />
        </div>
      </Section>

      <CtaBand service={category.slug} />
    </>
  );
}
