import { notFound } from "next/navigation";
import { Fragment } from "react";

import { SITE_URL } from "@/config/site";
import {
  HELPFUL_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
  type HelpfulArticleSection,
} from "@/config/polezno/articles";
import { SECTION_LABELS, formatDate, getArticleHref } from "@/lib/articles";
import { createSeo } from "@/lib/seo-builder";
import { getArticleSchema } from "@/lib/schemas";
import { ArticleCard } from "@/components/polezno/ArticleCard";
import { Chip } from "@/components/ui/Chip";
import { CtaBand } from "@/components/ui/CtaBand";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { InquiryCard } from "@/components/ui/InquiryCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Heading, Text } from "@/components/ui/Text";

function findArticle(section: HelpfulArticleSection, slug: string) {
  const article = getArticleBySlug(slug);
  return article && article.section === section ? article : undefined;
}

export function getArticleStaticParams(section: HelpfulArticleSection) {
  return HELPFUL_ARTICLES.filter((article) => article.section === section).map((article) => ({
    articleSlug: article.slug,
  }));
}

export function getArticleMetadata(section: HelpfulArticleSection, slug: string) {
  const article = findArticle(section, slug);
  const labels = SECTION_LABELS[section];

  if (!article) {
    return createSeo({
      title: labels.plural,
      description: "Практически материали от GeoAxis.",
      canonical: `/polezno/${section}`,
      noIndex: true,
    });
  }

  return createSeo({
    title: article.title,
    description: article.description,
    canonical: getArticleHref(article),
    image: article.coverImage?.src,
  });
}

export function ArticleDetailPage({ section, slug }: { section: HelpfulArticleSection; slug: string }) {
  const article = findArticle(section, slug);
  if (!article) notFound();

  const labels = SECTION_LABELS[section];
  const relatedArticles = getRelatedArticles(article, 3);
  const updated = article.updatedAt && article.updatedAt !== article.publishedAt ? article.updatedAt : null;

  return (
    <>
      <JsonLd data={getArticleSchema(SITE_URL, article)} />

      <PageHero
        breadcrumbs={[
          { label: "Полезно", href: "/polezno" },
          { label: labels.plural, href: `/polezno/${section}` },
          { label: article.title, href: getArticleHref(article) },
        ]}
        title={article.title}
        description={article.excerpt ?? article.description}
        aside={article.coverImage ? <HeroMedia src={article.coverImage.src} alt={article.coverImage.alt} /> : undefined}
      >
        <Text size="small" tone="muted" className="mt-6">
          Публикувано на {formatDate(article.publishedAt)}
          {updated ? ` · Обновено на ${formatDate(updated)}` : ""}
        </Text>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,42rem)_21rem] lg:justify-between lg:gap-12">
          <article className="min-w-0">
            <div className="prose-geo">
              {article.body.map((block, index) =>
                block.type === "paragraph" ? (
                  <p key={`${article.slug}-p-${index}`}>{block.content}</p>
                ) : (
                  <Fragment key={`${article.slug}-l-${index}`}>
                    {block.title ? <h2>{block.title}</h2> : null}
                    <ul>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </Fragment>
                )
              )}
            </div>

            {article.relatedServices?.length ? (
              <section aria-labelledby="related-services-title" className="mt-12 rounded-2xl border border-br-light bg-bg-subtle p-6">
                <Heading id="related-services-title" size="h5">
                  Свързани услуги
                </Heading>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {article.relatedServices.map((service) => (
                    <li key={service.href}>
                      <Chip href={service.href} arrow>
                        {service.label}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <Text size="small" tone="muted" className="mt-10 border-t border-br-light pt-6">
              Материалът е с информационна цел и не замества консултация за конкретен имот.
            </Text>
          </article>

          <aside className="hidden lg:block">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <InquiryCard
                title="Въпрос за вашия имот?"
                text="Опишете накратко случая – ще ви кажем какво е нужно, срока и цената."
              />
            </div>
          </aside>
        </div>
      </Section>

      {relatedArticles.length ? (
        <Section tone="subtle" aria-labelledby="related-articles-title">
          <SectionHeader id="related-articles-title" eyebrow="Полезно" title="Още по темата" />
          <div className="mt-12 grid gap-x-6 gap-y-8 md:grid-cols-3">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
