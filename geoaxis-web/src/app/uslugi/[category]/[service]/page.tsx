import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { LuArrowRight, LuInfo } from "react-icons/lu";

import { SITE_URL } from "@/config/site";
import { getCategoryBackdrop } from "@/config/services/backdrops";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import type { Service, ServiceCategory } from "@/config/services/categories";
import { createSeo, createServiceSeo } from "@/lib/seo-builder";
import { getServiceSchema } from "@/lib/schemas";
import { getDedicatedServiceRouteParams, getServiceBySlugs } from "@/lib/selectors";
import { normalizeParagraphs } from "@/utils/normalizeText";
import { getServiceHref } from "@/utils/urlHelpers";
import { PriceFactors } from "@/components/services/PriceFactors";
import { ServiceFacts } from "@/components/services/ServiceFacts";
import { CheckList } from "@/components/ui/CheckList";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion, faqSchema } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Heading, Text } from "@/components/ui/Text";

type Props = {
  params: Promise<{ category: string; service: string }>;
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

  if (!service.hasDedicatedPage) {
    return createSeo({
      title: service.title,
      description: toSeoDescription(service.longDescription, service.description),
      canonical: `/uslugi/${category.slug}`,
      noIndex: true,
    });
  }

  return createServiceSeo(category, service);
}

export async function generateStaticParams() {
  return getDedicatedServiceRouteParams();
}

export default async function ServicePage({ params }: Props) {
  const { category: categorySlug, service: serviceSlug } = await params;
  const result = getServiceBySlugs(categorySlug, serviceSlug);

  if (!result) notFound();

  // Services without their own page live as a section on the category page.
  if (!result.service.hasDedicatedPage) {
    permanentRedirect(`/uslugi/${result.category.slug}#${result.service.slug}`);
  }

  const { category, service } = result;
  const servicePath = `/uslugi/${category.slug}/${service.slug}`;
  const faqItems = HELPFUL_FAQ_GROUPS.find((group) => group.slug === category.slug)?.items ?? [];

  return (
    <>
      <JsonLd data={getServiceSchema(SITE_URL, servicePath, service)} />

      <PageHero
        breadcrumbs={[
          { label: "Услуги", href: "/uslugi" },
          { label: category.shortTitle ?? category.title, href: `/uslugi/${category.slug}` },
          { label: service.crumbTitle ?? service.shortTitle ?? service.title, href: servicePath },
        ]}
        title={service.title}
        description={service.description}
        backdrop={getCategoryBackdrop(category.slug)}
      >
        <ServiceFacts service={service} className="mt-8 flex flex-wrap gap-x-8 gap-y-3" />
      </PageHero>

      <Section>
        {/* One reading column, 42rem like the articles */}
        <div className="max-w-2xl">
          <ServiceArticle category={category} service={service} />
          {/* Phones and tablets; on desktop the links stay in the page for search engines */}
          <RelatedServices category={category} current={service.slug} className="mt-16 lg:hidden" />
        </div>
      </Section>

      {faqItems.length ? (
        <Section tone="subtle" aria-labelledby="service-faq-title">
          <JsonLd data={faqSchema(faqItems)} />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <SectionHeader
              id="service-faq-title"
              eyebrow="Въпроси"
              title="Често задавани въпроси"
              description={`Отговори на въпросите, които чуваме най-често за „${category.shortTitle ?? category.title}“.`}
            />
            <FaqAccordion items={faqItems} />
          </div>
        </Section>
      ) : null}

      <CtaBand service={category.slug} />
    </>
  );
}

function ServiceArticle({ category, service }: { category: ServiceCategory; service: Service }) {
  const paragraphs = normalizeParagraphs(service.longDescription ?? service.description);
  const content = service.content;

  return (
    <article className="min-w-0">
      <div className="prose-geo">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      {content?.neededWhen?.length ? (
        <ArticleSection title="Кога е подходяща" intro={content.whenIntro}>
          <CheckList items={content.neededWhen} className="mt-6" />
        </ArticleSection>
      ) : null}

      {content?.importantToKnow?.length ? (
        <ArticleSection title="Какво е важно да знаете">
          <div className="mt-6 grid gap-4 rounded-2xl border border-br-accent/50 bg-accent-soft p-6 sm:p-7">
            {content.importantToKnow.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="flex gap-3">
                <LuInfo aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent-text" />
                <span>{paragraph}</span>
              </p>
            ))}
          </div>
        </ArticleSection>
      ) : null}

      {content?.requiredDocs?.length ? (
        <ArticleSection title="Какво е добре да подготвите" intro={content.docsIntro}>
          <CheckList items={content.requiredDocs} className="mt-6" />
        </ArticleSection>
      ) : null}

      {content?.processSteps?.length ? (
        <ArticleSection title="Как протича работата" intro={content.processIntro}>
          <ol className="mt-8 grid gap-0">
            {content.processSteps.map((step, index) => (
              <li key={step} className="relative flex gap-5 pb-7 last:pb-0">
                {index < content.processSteps!.length - 1 ? (
                  <span aria-hidden="true" className="absolute left-5 top-11 bottom-1 w-px bg-br-default" />
                ) : null}
                <span className="typo-small relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-bg-page font-semibold text-accent-text tabular-nums">
                  {index + 1}
                </span>
                <p className="pt-2">{step}</p>
              </li>
            ))}
          </ol>
        </ArticleSection>
      ) : null}

      {content?.deliverables?.length ? (
        <ArticleSection title="Какво получавате" intro={content.deliverablesIntro}>
          <div className="mt-6 rounded-2xl bg-bg-inverse p-6 on-dark sm:p-8">
            <CheckList items={content.deliverables} dark className="tone-strong" />
          </div>
        </ArticleSection>
      ) : null}

      <PriceFactors
        serviceSlug={category.slug}
        hasPrices={Boolean(service.priceFrom)}
        className="mt-14 border-t border-br-light pt-12"
      />
    </article>
  );
}

function ArticleSection({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-14 border-t border-br-light pt-12">
      <Heading size="h3">{title}</Heading>
      {intro ? <Text className="mt-3">{intro}</Text> : null}
      {children}
    </section>
  );
}

function RelatedServices({
  category,
  current,
  className,
}: {
  category: ServiceCategory;
  current: string;
  className?: string;
}) {
  const related = category.services.filter((service) => service.slug !== current).slice(0, 5);
  if (!related.length) return null;

  return (
    <section aria-labelledby="related-services-title" className={clsx("border-t border-br-light pt-12", className)}>
      <Heading id="related-services-title" size="h3">
        Свързани услуги
      </Heading>
      <ul className="mt-6 border-t border-br-light">
        {related.map((service) => (
          <li key={service.slug} className="border-b border-br-light">
            <Link href={getServiceHref(category.slug, service)} className="group flex items-center justify-between gap-6 py-4">
              <span className="typo-h5 transition-colors group-hover:text-accent-text">
                {service.shortTitle ?? service.title}
              </span>
              <LuArrowRight
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-accent-text transition-transform group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={`/uslugi/${category.slug}`}
        className="typo-small mt-5 inline-block font-semibold text-accent-text hover:underline"
      >
        Всички в „{category.shortTitle ?? category.title}“
      </Link>
    </section>
  );
}
