import Link from "next/link";
import clsx from "clsx";

import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/parts/Breadcrumbs";
import { getArticlesBySection, type HelpfulArticleSection } from "@/config/polezno/articles";
import type { HelpfulNavItem } from "@/config/polezno/helpful-nav";
import { PoleznoPlainHero } from "./PoleznoPlainHero";
import { PoleznoCta } from "./PoleznoCta";
import { SECTION_LABELS, formatDate, getArticleHref } from "../_utils/helpers";

export function ArticleListPage({
  section,
  pageContent,
}: {
  section: HelpfulArticleSection;
  pageContent: HelpfulNavItem;
}) {
  const articles = getArticlesBySection(section);
  const labels = SECTION_LABELS[section];

  return (
    <div className="bg-bg-page">
      <PoleznoPlainHero
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
        before={
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: "Полезно", href: "/polezno" },
              { label: labels.plural, href: pageContent.href },
            ]}
          />
        }
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={getArticleHref(article)}
              className={clsx(
                "group block rounded-2xl px-5 py-5",
                "border border-transparent",
                "transition duration-200",
                "hover:border-br-light/70 hover:bg-bg-section/70"
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-tx-muted">
                {labels.single} · {formatDate(article.updatedAt ?? article.publishedAt)}
              </p>

              <h2 className="mt-2 text-lg font-semibold leading-snug text-tx-primary transition group-hover:text-accent-text">
                {article.title}
              </h2>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-tx-secondary">
                {article.excerpt}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-text">
                {labels.cta} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <PoleznoCta />
    </div>
  );
}
