import Link from "next/link";
import clsx from "clsx";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { getArticlesBySection } from "@/config/polezno/articles";
import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { PoleznoPlainHero } from "../_components/PoleznoPlainHero";

const pageContent = getHelpfulNavItem("statii");

export const metadata = pageContent
  ? createSeo({
      title: pageContent.seo.title,
      description: pageContent.seo.description,
      canonical: pageContent.href,
    })
  : {};

export default function StatiiPage() {
  if (!pageContent) notFound();

  const articles = getArticlesBySection("statii");

  return (
    <main className="bg-bg-page">
      <PoleznoPlainHero
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/polezno/statii/${article.slug}`}
              className={clsx(
                "group block rounded-2xl px-5 py-5",
                "border border-transparent",
                "transition duration-200",
                "hover:border-br-light/70 hover:bg-bg-section/70"
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-tx-tertiary">
                Статия
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
    </main>
  );
}
