import Link from "next/link";
import clsx from "clsx";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { HELPFUL_NAV_ITEMS } from "@/config/polezno/helpful-nav";
import { getArticlesBySection } from "@/config/polezno/articles";
import { createSeo } from "@/lib/seo-builder";
import { PoleznoPlainHero } from "../_components/PoleznoPlainHero";
// import { PoleznoCta } from "../_components/PoleznoCta";

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

  const hasPublishedContent = slug === "statii" || slug === "rakovodstva";

  return createSeo({
    title: currentItem.seo.title,
    description: currentItem.seo.description,
    canonical: `/polezno/${currentItem.slug}`,
    noIndex: !hasPublishedContent,
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
      <PoleznoPlainHero
        id={currentItem.slug}
        title={currentItem.heroTitle}
        description={currentItem.heroDescription}
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/polezno/${article.section}/${article.slug}`}
              className={clsx(
                "group block rounded-2xl px-5 py-5",
                "border border-transparent",
                "transition duration-200",
                "hover:border-br-light/70 hover:bg-bg-section/70"
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-tx-tertiary">
                {article.section === "statii" ? "Статия" : "Ръководство"}
              </p>

              <h2 className="mt-2 text-lg font-semibold leading-snug text-tx-primary transition group-hover:text-accent-strong">
                {article.title}
              </h2>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-tx-secondary">
                {article.excerpt}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-strong">
                Прочети →
              </span>
            </Link>
          ))}
        </div>
      </Section>
      {/* <PoleznoCta /> */}
    </main>
  );
}
