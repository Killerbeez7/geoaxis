import { notFound } from "next/navigation";
import { LuPhone } from "react-icons/lu";

import { SITE_URL } from "@/config/site";
import { contactLinks } from "@/config/content/contacts";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { serviceCategories } from "@/config/services/categories";
import { createCategorySeo, createSeo } from "@/lib/seo-builder";
import { withoutRepeatedPhotos } from "@/lib/photos";
import { getCategoryServicesSchema } from "@/lib/schemas";
import { getCategoryBySlug } from "@/lib/selectors";
import { normalizeParagraphs } from "@/utils/normalizeText";
import { CategoryServiceItem } from "@/components/services/CategoryServiceItem";
import { PriceFactors } from "@/components/services/PriceFactors";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion, faqSchema } from "@/components/ui/FaqAccordion";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { InquiryCard } from "@/components/ui/InquiryCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

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
  const serviceImages = withoutRepeatedPhotos(
    category.services.map((service) => service.thumbnail),
    category.heroImage ? [category.heroImage] : []
  );

  return (
    <>
      <JsonLd data={getCategoryServicesSchema(SITE_URL, `/uslugi/${category.slug}`, category)} />
      {faqItems.length ? <JsonLd data={faqSchema(faqItems)} /> : null}

      <PageHero
        breadcrumbs={[
          { label: "Услуги", href: "/uslugi" },
          { label: category.shortTitle ?? category.title, href: `/uslugi/${category.slug}` },
        ]}
        eyebrow={category.meta}
        title={category.title}
        description={lead}
        actions={
          <>
            <Button href={`/contacts?service=${category.slug}`} size="lg" arrow track="quote_click">
              Поискайте оферта
            </Button>
            <Button
              href={contactLinks.tel}
              size="lg"
              variant="outline"
              icon={<LuPhone className="h-4 w-4" />}
              track="call_click"
            >
              Обадете се
            </Button>
          </>
        }
        aside={category.heroImage ? <HeroMedia src={category.heroImage} alt={category.title} /> : null}
      />

      <Section aria-labelledby="category-services-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
          <div className="min-w-0">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="category-services-title" className="typo-h2">
                Услугите в тази категория
              </h2>
              <p className="typo-small text-tx-muted">{category.services.length} услуги</p>
            </div>

            {/* Jump links on phones and tablets; the sidebar has them on desktop */}
            <nav aria-label="Услуги в категорията" className="mt-6 lg:hidden">
              <ul className="flex flex-wrap gap-2">
                {category.services.map((service) => (
                  <li key={service.slug}>
                    <a
                      href={`#${service.slug}`}
                      className="typo-small inline-flex h-9 items-center rounded-full border border-br-default px-3.5 font-medium text-tx-secondary hover:border-br-accent hover:text-accent-text"
                    >
                      {service.shortTitle ?? service.title}
                    </a>
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
                <h2 id="category-faq-title" className="typo-h3">
                  Често задавани въпроси
                </h2>
                <div className="mt-6">
                  <FaqAccordion items={faqItems} />
                </div>
              </section>
            ) : null}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+1.5rem)] grid gap-6">
              <nav aria-label="Услуги в категорията" className="rounded-2xl border border-br-light bg-bg-page p-5">
                <p className="typo-label text-tx-muted">В тази категория</p>
                <ol className="mt-3 grid gap-0.5">
                  {category.services.map((service, index) => (
                    <li key={service.slug}>
                      <a
                        href={`#${service.slug}`}
                        className="typo-small flex gap-3 rounded-lg px-2 py-2 text-tx-secondary transition-colors hover:bg-bg-subtle hover:text-accent-text"
                      >
                        <span className="w-5 shrink-0 font-semibold text-accent-text tabular-nums">{index + 1}.</span>
                        {service.shortTitle ?? service.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <InquiryCard service={category.slug} />
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand service={category.slug} />
    </>
  );
}
