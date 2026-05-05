import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { SITE_URL } from "@/config/site";
import { HELPFUL_ARTICLES } from "@/config/polezno/articles";
import { getArticleBySlug, getRelatedArticles } from "@/utils/polezno/helpers";
import { createSeo } from "@/lib/seo-builder";
import { getArticleSchema } from "@/lib/schemas";
import { PoleznoPlainHero } from "../../PoleznoPlainHero";

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
      title: "Статии",
      description: "Практически теми и обяснения от GeoAxis.",
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
          <div className="mb-6">
            <Link
              href="/polezno/rakovodstva"
              className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              ← Назад към ръководства
            </Link>
          </div>
        }
        title={article.title}
        description={article.excerpt}
        after={
          <div className="mt-3 text-sm text-tx-muted">
            Публикувано: {article.publishedAt}
            {article.updatedAt ? ` • Обновено: ${article.updatedAt}` : ""}
          </div>
        }
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <article className="mx-auto max-w-3xl">
          <div className="space-y-6">
            {article.body.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={`${article.slug}-paragraph-${index}`} className="typo-body">
                    {block.content}
                  </p>
                );
              }

              if (block.type === "list") {
                return (
                  <div key={`${article.slug}-list-${index}`} className="space-y-4">
                    {block.title ? <h2 className="typo-h3">{block.title}</h2> : null}

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
                  </div>
                );
              }

              return null;
            })}
          </div>

          {article.relatedServices?.length ? (
            <section className="mt-12 rounded-(--radius-card) border border-br-light bg-white p-6 shadow-sm">
              <h2 className="typo-h3">Свързани услуги</h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {article.relatedServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="inline-flex items-center justify-center rounded-xl border border-br-light bg-bg-section px-4 py-3 text-sm font-medium text-tx-primary transition-colors hover:bg-bg-muted"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relatedArticles.length ? (
            <section className="mt-12 rounded-(--radius-card) border border-br-light bg-white p-6 shadow-sm">
              <h2 className="typo-h3">Още по темата</h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/polezno/${related.section}/${related.slug}`}
                    className="rounded-2xl border border-br-light bg-bg-section p-4 transition-colors hover:bg-bg-muted"
                  >
                    <h3 className="text-base font-semibold text-tx-primary">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-tx-secondary">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </Section>
    </main>
  );
}
