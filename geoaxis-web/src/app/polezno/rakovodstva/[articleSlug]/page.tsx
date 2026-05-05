import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { SITE_URL } from "@/config/site";
import {
  HELPFUL_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/config/polezno/articles";
import { createSeo } from "@/lib/seo-builder";
import { getArticleSchema } from "@/lib/schemas";
import { PoleznoCta } from "../../_components/PoleznoCta";
import { PoleznoPlainHero } from "../../_components/PoleznoPlainHero";

type Props = {
  params: Promise<{
    articleSlug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { articleSlug } = await params;

  const article = getArticleBySlug(articleSlug);

  if (!article || article.section !== "rakovodstva") {
    return createSeo({
      title: "Ръководства",
      description: "Практически ръководства и подредени стъпки от GeoAxis.",
      canonical: "/polezno/rakovodstva",
      noIndex: true,
    });
  }

  return createSeo({
    title: article.title,
    description: article.description,
    canonical: `/polezno/${article.section}/${article.slug}`,
    image: article.coverImage?.src || "/images/og-image.webp",
  });
}

export async function generateStaticParams() {
  return HELPFUL_ARTICLES.filter((article) => article.section === "rakovodstva").map(
    (article) => ({
      articleSlug: article.slug,
    })
  );
}

export default async function HelpfulArticlePage({ params }: Props) {
  const { articleSlug } = await params;

  const article = getArticleBySlug(articleSlug);

  if (!article || article.section !== "rakovodstva") notFound();

  const schema = getArticleSchema(SITE_URL, article);
  const relatedArticles = getRelatedArticles(article.slug, 2);

  return (
    <main className="bg-bg-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PoleznoPlainHero
        eyebrow="Ръководство"
        before={
          <Link
            href="/polezno/rakovodstva"
            className="mb-6 inline-flex text-sm font-medium text-accent-strong transition hover:text-accent"
          >
            ← Назад към ръководства
          </Link>
        }
        title={article.title}
        description={article.excerpt}
        after={
          <p className="mt-4 text-sm text-tx-muted">
            Публикувано: {article.publishedAt}
            {article.updatedAt ? ` • Обновено: ${article.updatedAt}` : ""}
          </p>
        }
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <article className="mx-auto max-w-3xl">
          <div className="space-y-7">
            {article.body.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p
                    key={`${article.slug}-paragraph-${index}`}
                    className="text-base leading-8 text-tx-secondary"
                  >
                    {block.content}
                  </p>
                );
              }

              if (block.type === "list") {
                return (
                  <section key={`${article.slug}-list-${index}`} className="space-y-4">
                    {block.title ? (
                      <h2 className="text-2xl font-semibold leading-tight text-tx-primary">
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
              }

              return null;
            })}
          </div>

          {relatedArticles.length ? (
            <section className="mt-12 border-t border-br-light/60 pt-8">
              <h2 className="text-lg font-semibold text-tx-primary">
                Още по темата
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/polezno/${related.section}/${related.slug}`}
                    className="group block rounded-xl px-3 py-3 transition hover:bg-bg-muted"
                  >
                    <h3 className="text-sm font-semibold text-tx-primary transition group-hover:text-accent-strong">
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

          {article.relatedServices?.length ? (
            <section className="mt-10 border-t border-br-light/60 pt-8">
              <h2 className="text-lg font-semibold text-tx-primary">
                Свързани услуги
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {article.relatedServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="inline-flex items-center rounded-lg border border-br-light/70 px-3 py-2 text-sm text-tx-primary transition hover:bg-bg-muted"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </Section>

      <PoleznoCta />
    </main>
  );
}
