import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/parts/Breadcrumbs";
import { JsonLd } from "@/components/parts/JsonLd";
import { SITE_URL } from "@/config/site";
import {
  HELPFUL_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
  type HelpfulArticleSection,
} from "@/config/polezno/articles";
import { createSeo } from "@/lib/seo-builder";
import { getArticleSchema } from "@/lib/schemas";
import { PoleznoCta } from "./PoleznoCta";
import { SECTION_LABELS, formatDate, getArticleHref } from "../_utils/helpers";

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

export function ArticleDetailPage({
  section,
  slug,
}: {
  section: HelpfulArticleSection;
  slug: string;
}) {
  const article = findArticle(section, slug);
  if (!article) notFound();

  const labels = SECTION_LABELS[section];
  const relatedArticles = getRelatedArticles(article, 2);

  return (
    <div className="bg-bg-page">
      <JsonLd data={getArticleSchema(SITE_URL, article)} />

      <Section tone="page" variant="hero">
        <article className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Полезно", href: "/polezno" },
              { label: labels.plural, href: `/polezno/${section}` },
              { label: article.title, href: getArticleHref(article) },
            ]}
          />

          <header className="mt-6 border-b border-br-light/60 pb-8">
            <h1 className="typo-h2 font-semibold leading-tight">{article.title}</h1>

            <p className="typo-subtitle mt-4 lg:text-lg">{article.excerpt}</p>

            <p className="typo-meta mt-4">
              Публикувано: {formatDate(article.publishedAt)}
              {article.updatedAt ? ` · Обновено: ${formatDate(article.updatedAt)}` : ""}
            </p>
          </header>

          {article.coverImage ? (
            <figure className="mt-8 overflow-hidden rounded-2xl border border-br-light/60 bg-bg-section">
              <Image
                src={article.coverImage.src}
                alt={article.coverImage.alt}
                width={1200}
                height={720}
                sizes="(min-width: 1024px) 768px, 100vw"
                className="h-auto w-full object-cover"
                priority
              />
            </figure>
          ) : null}

          <div className="mt-10 space-y-7">
            {article.body.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={`${article.slug}-paragraph-${index}`} className="typo-body">
                    {block.content}
                  </p>
                );
              }

              return (
                <section key={`${article.slug}-list-${index}`} className="space-y-4">
                  {block.title ? (
                    <h2 className="text-xl font-semibold leading-snug text-tx-primary sm:text-2xl">
                      {block.title}
                    </h2>
                  ) : null}

                  <ul className="space-y-3">
                    {block.items.map((item, itemIndex) => (
                      <li
                        key={`${article.slug}-list-${index}-item-${itemIndex}`}
                        className="flex gap-3 text-base leading-7 text-tx-secondary"
                      >
                        <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          {article.relatedServices?.length ? (
            <section className="mt-12 rounded-2xl border border-br-light bg-bg-section p-6">
              <h2 className="text-lg font-semibold text-tx-primary">Свързани услуги</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {article.relatedServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="inline-flex items-center rounded-lg border border-br-default bg-bg-page px-3 py-2 text-sm font-medium text-tx-primary transition hover:border-br-accent hover:text-accent-text"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedArticles.length ? (
            <section className="mt-12 border-t border-br-light/60 pt-8">
              <h2 className="text-xl font-semibold leading-snug text-tx-primary sm:text-2xl">
                Още по темата
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={getArticleHref(related)}
                    className="group block rounded-lg px-4 py-3 transition hover:bg-bg-muted"
                  >
                    <h3 className="text-sm font-semibold text-tx-primary transition group-hover:text-accent-text">
                      {related.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-tx-secondary">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </Section>

      <PoleznoCta />
    </div>
  );
}
