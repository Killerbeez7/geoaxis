import Link from "next/link";
import clsx from "clsx";

import { Section } from "@/components/layout/Section";
import { createSeo } from "@/lib/seo-builder";
import { getArticlesBySection } from "@/config/polezno/articles";
import { PoleznoPlainHero } from "../_components/PoleznoPlainHero";

export const metadata = createSeo({
  title: "Статии за геодезия и имоти",
  description:
    "Практични статии за кадастър, ПУП, геодезическо заснемане и работа с имоти.",
  canonical: "/polezno/statii",
});

export default function StatiiPage() {
  const articles = getArticlesBySection("statii");

  return (
    <main className="bg-bg-page">
      <PoleznoPlainHero
        title="Статии за геодезия и имоти"
        description="Практични обяснения за често срещани ситуации при кадастър, строителство и работа с имоти."
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
