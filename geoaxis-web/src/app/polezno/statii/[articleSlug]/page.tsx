import Link from "next/link";
import { notFound } from "next/navigation";

import { SITE_URL } from "@/config/site";
import {
  HELPFUL_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/config/polezno/articles";
import { Section } from "@/components/layout/Section";
import { createSeo } from "@/lib/seo-builder";
import { getArticleSchema } from "@/lib/schemas";

type Props = {
  params: Promise<{
    articleSlug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { articleSlug } = await params;

  const article = getArticleBySlug(articleSlug);

  if (!article || article.section !== "statii") {
    return createSeo({
      title: "Статии",
      description: "Практически теми и обяснения от GeoAxis.",
      canonical: "/polezno/statii",
      noIndex: true,
    });
  }

  return createSeo({
    title: article.title,
    description: article.description,
    canonical: `/polezno/${article.section}/${article.slug}`,
    image: article.coverImage?.src || "/og-image.jpg",
  });
}

export async function generateStaticParams() {
  return HELPFUL_ARTICLES.filter((article) => article.section === "statii").map(
    (article) => ({
      articleSlug: article.slug,
    })
  );
}

export default async function HelpfulArticlePage({ params }: Props) {
  const { articleSlug } = await params;

  const article = getArticleBySlug(articleSlug);

  if (!article || article.section !== "statii") notFound();

  const schema = getArticleSchema(SITE_URL, article);
  const relatedArticles = getRelatedArticles(article.slug, 2);

  return (
    <main className="bg-bg-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Section tone="section" variant="hero">
        <article className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              href="/polezno/statii"
              className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              ← Назад към статии
            </Link>
          </div>

          <h1 className="typo-h2">{article.title}</h1>

          <p className="typo-subtitle mt-4 max-w-2xl">{article.excerpt}</p>

          <div className="mt-3 text-sm text-tx-muted">
            Публикувано: {article.publishedAt}
            {article.updatedAt ? ` • Обновено: ${article.updatedAt}` : ""}
          </div>

          <div className="mt-8 space-y-6">
            {article.body.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="typo-body">
                    {block.content}
                  </p>
                );
              }

              if (block.type === "list") {
                return (
                  <div key={index} className="space-y-4">
                    {block.title ? <h2 className="typo-h3">{block.title}</h2> : null}

                    <ul className="space-y-3">
                      {block.items.map((item) => (
                        <li
                          key={item}
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
            <section className="mt-12 rounded-[var(--radius-card)] border border-br-light bg-white p-6 shadow-sm">
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
            <section className="mt-12 rounded-[var(--radius-card)] border border-br-light bg-white p-6 shadow-sm">
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

          <div className="mt-12 rounded-[var(--radius-card)] border border-br-light bg-white p-6 shadow-sm">
            <h2 className="typo-h3">
              {article.cta?.title ?? "Нужна Ви е конкретна насока?"}
            </h2>

            <p className="typo-body mt-3">
              {article.cta?.text ??
                "Ако случаят Ви изисква реална оценка на място, документи или избор на конкретна услуга, изпратете кратко описание и ще получите насоки."}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={article.cta?.primaryHref ?? "/contacts"}
                className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-tx-inverse transition-opacity hover:opacity-95"
              >
                {article.cta?.primaryLabel ?? "Изпратете запитване"}
              </Link>

              <Link
                href={article.cta?.secondaryHref ?? "/uslugi"}
                className="inline-flex items-center justify-center rounded-xl border border-br-light bg-bg-section px-5 py-3 text-sm font-medium text-tx-primary transition-colors hover:bg-bg-muted"
              >
                {article.cta?.secondaryLabel ?? "Разгледайте услугите"}
              </Link>
            </div>
          </div>
        </article>
      </Section>
    </main>
  );
}
