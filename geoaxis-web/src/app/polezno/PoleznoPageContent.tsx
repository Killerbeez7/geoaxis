import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { Section } from "@/components/layout/Section";
import { HELPFUL_ARTICLES } from "@/config/polezno/articles";
import { HELPFUL_NAV_ITEMS, type HelpfulNavItem } from "@/config/polezno/helpful-nav";
import { CompactArticleLink } from "./_components/CompactArticleLink";
import { PoleznoPlainHero } from "./_components/PoleznoPlainHero";
import { PoleznoCta } from "./_components/PoleznoCta";
import { getArticleHref } from "./_utils/helpers";

const FEATURED_ARTICLE_SLUG = "kakvo-e-geodezichesko-zasnemane";

function getPoleznoArticles() {
  const featuredArticle =
    HELPFUL_ARTICLES.find((article) => article.slug === FEATURED_ARTICLE_SLUG) ??
    HELPFUL_ARTICLES[0];

  const recommendedArticles = HELPFUL_ARTICLES.filter(
    (article) => article.slug !== featuredArticle.slug
  )
    .sort((a, b) =>
      (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt)
    )
    .slice(0, 4);

  return { featuredArticle, recommendedArticles };
}

function HelpfulTopicRow({ item }: { item: HelpfulNavItem }) {
  return (
    <Link
      href={item.href}
      className="group -mx-4 grid gap-3 rounded-2xl px-4 py-5 transition hover:bg-bg-muted sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6"
    >
      <div>
        <h3 className="text-xl font-semibold leading-tight text-tx-primary transition group-hover:text-accent-strong">
          {item.label}
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-tx-secondary">
          {item.description}
        </p>
      </div>

      <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-br-light/60 text-accent transition group-hover:translate-x-1 group-hover:border-accent group-hover:bg-bg-section sm:flex">
        <FaArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function PoleznoPageContent() {
  const { featuredArticle, recommendedArticles } = getPoleznoArticles();

  return (
    <>
      <PoleznoPlainHero
        id="polezno"
        title="Полезни материали"
        description="Статии, ръководства и справки за имоти, кадастър, ПУП и геодезически услуги."
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.64fr)_minmax(18rem,0.36fr)]">
          <section className="max-w-2xl">
            <p className="text-base leading-7 text-tx-secondary">
              Материалите са подредени по тип, за да стигнете по-бързо до правилната
              информация — без да четете всичко подред.
            </p>

            <div className="mt-7 divide-y divide-br-light/60">
              {HELPFUL_NAV_ITEMS.map((item) => (
                <HelpfulTopicRow key={item.href} item={item} />
              ))}
            </div>
          </section>

          <aside className="lg:border-l lg:border-br-light/70 lg:pl-8">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <h2 className="text-lg font-semibold text-tx-primary">
                Предложение за начало
              </h2>

              <Link
                href={getArticleHref(featuredArticle)}
                className="group mt-4 block rounded-2xl border border-br-light/70 bg-bg-section/80 p-5 transition hover:border-br-accent-soft hover:bg-bg-muted"
              >
                <h3 className="text-xl font-semibold leading-snug text-tx-primary transition group-hover:text-accent-strong">
                  {featuredArticle.title}
                </h3>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-strong">
                  Прочети
                  <FaArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>

              {/* <div className="mt-5 border-t border-br-light pt-2"> */}
              <div className="mt-5 space-y-2">
                {recommendedArticles.map((article) => (
                  <CompactArticleLink key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <PoleznoCta />
    </>
  );
}
