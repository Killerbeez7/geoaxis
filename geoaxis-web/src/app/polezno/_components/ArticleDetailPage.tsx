import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowRight } from "react-icons/lu";

import { SITE_URL } from "@/config/site";
import {
  HELPFUL_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
  type HelpfulArticleSection,
} from "@/config/polezno/articles";
import { SECTION_LABELS, formatDate, getArticleHref, readingMinutes } from "@/lib/articles";
import { createSeo } from "@/lib/seo-builder";
import { getArticleSchema } from "@/lib/schemas";
import { ArticleCard } from "@/components/polezno/ArticleCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { InquiryCard } from "@/components/ui/InquiryCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

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
        eyebrow={`${labels.single} · ${readingMinutes(article)} мин четене`}
        title={article.title}
        description={article.excerpt}
      >
        <p className="typo-small mt-6 text-tx-muted">
          Публикувано на {formatDate(article.publishedAt)}
          {updated ? ` · Обновено на ${formatDate(updated)}` : ""}
        </p>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <article className="min-w-0 max-w-3xl">
            {article.coverImage ? (
              <figure className="relative mb-10 aspect-16/9 overflow-hidden rounded-3xl bg-bg-subtle">
                <Image
                  src={article.coverImage.src}
                  alt={article.coverImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 768px, calc(100vw - 2.5rem)"
                  className="object-cover"
                />
              </figure>
            ) : null}

            <div className="prose-geo">
              {article.body.map((block, index) =>
                block.type === "paragraph" ? (
                  <p key={`${article.slug}-p-${index}`}>{block.content}</p>
                ) : (
                  <div key={`${article.slug}-l-${index}`}>
                    {block.title ? <h2>{block.title}</h2> : null}
                    <ul className="mt-4">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>

            {article.relatedServices?.length ? (
              <section aria-labelledby="related-services-title" className="mt-12 rounded-2xl border border-br-light bg-bg-subtle p-6">
                <h2 id="related-services-title" className="typo-h4">
                  Свързани услуги
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {article.relatedServices.map((service) => (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        className="typo-small inline-flex h-10 items-center gap-1.5 rounded-xl border border-br-default bg-bg-page px-4 font-semibold text-tx-primary transition-colors hover:border-br-accent hover:text-accent-text"
                      >
                        {service.label}
                        <LuArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <p className="typo-caption mt-10 border-t border-br-light pt-6 text-tx-muted">
              Материалът е с информационна цел и не замества консултация за конкретен имот.
            </p>
          </article>

          <aside>
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
          <h2 id="related-articles-title" className="typo-h2">
            Още по темата
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
