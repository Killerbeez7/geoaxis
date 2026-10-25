import Link from "next/link";
import type { ReactNode } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { LuArrowRight, LuInfo, LuPhone } from "react-icons/lu";

import { SITE_URL } from "@/config/site";
import { contactLinks } from "@/config/content/contacts";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import type { Service, ServiceCategory } from "@/config/services/categories";
import { createSeo, createServiceSeo } from "@/lib/seo-builder";
import { getServiceSchema } from "@/lib/schemas";
import { getDedicatedServiceRouteParams, getServiceBySlugs } from "@/lib/selectors";
import { normalizeParagraphs } from "@/utils/normalizeText";
import { getServiceHref } from "@/utils/urlHelpers";
import { PriceFactors } from "@/components/services/PriceFactors";
import { ServiceFacts } from "@/components/services/ServiceFacts";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion, faqSchema } from "@/components/ui/FaqAccordion";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { InquiryCard } from "@/components/ui/InquiryCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";

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
          { label: service.shortTitle ?? service.title, href: servicePath },
        ]}
        title={service.title}
        description={service.description}
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
        aside={<HeroMedia src={service.heroImage ?? service.thumbnail} alt={service.imageAlt ?? service.title} />}
      >
        <ServiceFacts service={service} className="mt-8 flex flex-wrap gap-x-8 gap-y-3" />
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,42rem)_21rem] lg:justify-between lg:gap-12">
          <ServiceArticle category={category} service={service} />

          <aside className="lg:block">
            <div className="grid gap-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <InquiryCard service={category.slug} />
              <RelatedServices category={category} current={service.slug} />
            </div>
          </aside>
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

function RelatedServices({ category, current }: { category: ServiceCategory; current: string }) {
  const related = category.services.filter((service) => service.slug !== current).slice(0, 5);
  if (!related.length) return null;

  return (
    <nav aria-label="Свързани услуги" className="rounded-2xl border border-br-light bg-bg-page p-5">
      <Eyebrow rule={false} tone="muted">
        Свързани услуги
      </Eyebrow>
      <ul className="mt-3 grid gap-0.5">
        {related.map((service) => (
          <li key={service.slug}>
            <Link
              href={getServiceHref(category.slug, service)}
              className="typo-small group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-tx-secondary transition-colors hover:bg-bg-subtle hover:text-accent-text"
            >
              {service.shortTitle ?? service.title}
              <LuArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={`/uslugi/${category.slug}`}
        className="typo-small mt-2 flex items-center gap-1.5 border-t border-br-light px-2 pt-3 font-semibold text-accent-text"
      >
        Всички в „{category.shortTitle ?? category.title}“
      </Link>
    </nav>
  );
}
