import Image from "next/image";
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

      <Section tone="page" variant="hero">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/polezno/rakovodstva"
            className="text-sm font-medium text-accent-strong transition hover:text-accent"
          >
            ← Назад към ръководства
          </Link>

          <header className="mt-6 border-b border-br-light/60 pb-8">
            <h1 className="typo-h2 font-semibold">{article.title}</h1>

            <p className="typo-subtitle mt-4 lg:text-lg">{article.excerpt}</p>

            <p className="typo-meta mt-4">
              Публикувано: {article.publishedAt}
              {article.updatedAt ? ` • Обновено: ${article.updatedAt}` : ""}
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

              if (block.type === "list") {
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
              }

              return null;
            })}
          </div>

          {relatedArticles.length ? (
            <section className="mt-12 border-t border-br-light/60 pt-8">
              <h2 className="text-lg font-semibold text-tx-primary">Още по темата</h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/polezno/${related.section}/${related.slug}`}
                    className="group block rounded-lg px-4 py-3 transition hover:bg-bg-muted"
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
            <section className="mt-8">
              <h2 className="text-sm font-semibold text-tx-secondary">Свързани услуги</h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {article.relatedServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="inline-flex items-center rounded-md border border-br-light/60 px-3 py-1.5 text-xs text-tx-primary transition hover:bg-bg-muted"
                  >
                    {service.label}
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
