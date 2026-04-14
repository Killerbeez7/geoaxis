import Link from "next/link";
import { notFound } from "next/navigation";

import { HELPFUL_NAV_ITEMS } from "@/config/polezno/helpful-nav";
import { getArticlesBySection } from "@/config/polezno/articles";
import { Section } from "@/components/layout/Section";
import { createSeo } from "@/lib/seo-builder";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const currentItem = HELPFUL_NAV_ITEMS.find((item) => item.slug === slug);

  if (!currentItem) {
    return createSeo({
      title: "Полезни материали",
      description: "Полезни статии, въпроси и отговори, ръководства и ресурси.",
      canonical: "/polezno",
      noIndex: true,
    });
  }

  return createSeo({
    title: currentItem.label,
    description:
      currentItem.description ?? `Полезни материали от GeoAxis: ${currentItem.label}.`,
    canonical: `/polezno/${currentItem.slug}`,
  });
}

export async function generateStaticParams() {
  return HELPFUL_NAV_ITEMS.map((item) => ({
    slug: item.slug,
  }));
}

export default async function HelpfulSectionPage({ params }: Props) {
  const { slug } = await params;

  const currentItem = HELPFUL_NAV_ITEMS.find((item) => item.slug === slug);
  if (!currentItem) notFound();

  const articles =
    slug === "statii" || slug === "rakovodstva" ? getArticlesBySection(slug) : [];

  return (
    <main className="bg-bg-page">
      <Section tone="section" variant="hero">
        <div className="max-w-3xl">
          <p className="typo-kicker text-accent">Полезно</p>
          <h1 className="typo-h2 mt-3">{currentItem.label}</h1>
          <p className="typo-subtitle mt-4 max-w-2xl">
            {currentItem.description ?? "Подготвяме съдържанието за тази секция."}
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/polezno/${article.section}/${article.slug}`}
                className="group rounded-[var(--radius-card)] border border-br-light bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-full border border-br-accent-soft bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {article.section === "statii" ? "Статия" : "Ръководство"}
                </div>

                <h2 className="text-xl font-semibold leading-tight text-tx-primary transition-colors group-hover:text-accent">
                  {article.title}
                </h2>

                <p className="typo-meta mt-3 leading-7">{article.excerpt}</p>

                <div className="mt-5 text-sm font-medium text-accent">
                  Прочети повече →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-[var(--radius-card)] border border-br-light bg-white p-8 shadow-sm">
            <h2 className="typo-h3">Съдържанието се подготвя</h2>
            <p className="typo-body mt-4 max-w-2xl">
              Тази секция е планирана и ще бъде запълнена с полезни материали.
              Междувременно можете да разгледате другите раздели или да изпратите
              конкретно запитване.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/polezno"
                className="inline-flex items-center justify-center rounded-xl border border-br-light bg-bg-section px-5 py-3 text-sm font-medium text-tx-primary transition-colors hover:bg-bg-muted"
              >
                Назад към полезно
              </Link>

              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-tx-inverse transition-opacity hover:opacity-95"
              >
                Свържете се с нас
              </Link>
            </div>
          </div>
        )}
      </Section>
    </main>
  );
}
