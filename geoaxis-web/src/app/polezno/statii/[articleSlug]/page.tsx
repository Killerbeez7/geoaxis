import Link from "next/link";
import { notFound } from "next/navigation";

import { HELPFUL_ARTICLES, getArticleBySlug } from "@/config/polezno/articles";
import { Section } from "@/components/layout/Section";
import { createSeo } from "@/lib/seo-builder";

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
    canonical: `/polezno/statii/${article.slug}`,
    image: article.coverImage,
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

  return (
    <main className="bg-bg-page">
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

          <div className="mb-5 inline-flex rounded-full border border-br-accent-soft bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Статия
          </div>

          <h1 className="typo-h2">{article.title}</h1>

          <p className="typo-subtitle mt-4 max-w-2xl">{article.excerpt}</p>

          <div className="mt-8 space-y-6">
            {article.body.map((paragraph) => (
              <p key={paragraph} className="typo-body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-[var(--radius-card)] border border-br-light bg-white p-6 shadow-sm">
            <h2 className="typo-h3">Нужна Ви е конкретна насока?</h2>
            <p className="typo-body mt-3">
              Ако случаят Ви изисква реална оценка на място, документи или избор на
              конкретна услуга, изпратете кратко описание и ще получите насоки.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-tx-inverse transition-opacity hover:opacity-95"
              >
                Изпратете запитване
              </Link>

              <Link
                href="/uslugi"
                className="inline-flex items-center justify-center rounded-xl border border-br-light bg-bg-section px-5 py-3 text-sm font-medium text-tx-primary transition-colors hover:bg-bg-muted"
              >
                Разгледайте услугите
              </Link>
            </div>
          </div>
        </article>
      </Section>
    </main>
  );
}
