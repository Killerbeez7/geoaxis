import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import {
  FaArrowRight,
  FaBuilding,
  FaFileAlt,
  FaMapMarkedAlt,
  FaQuestionCircle,
  FaRulerCombined,
} from "react-icons/fa";

import { Section } from "@/components/layout/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { HELPFUL_ARTICLES, type HelpfulArticle } from "@/config/polezno/articles";
import { HELPFUL_NAV_ITEMS } from "@/config/polezno/helpful-nav";
import { PoleznoPlainHero } from "./PoleznoPlainHero";

type HelpfulCategory = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

const featuredArticleSlugs = [
  "kakvo-e-geodezichesko-zasnemane",
  "kakvo-e-pup",
  "koga-vi-tryabva-geodezist",
] as const;
const featuredArticleSlugSet = new Set<string>(featuredArticleSlugs);

const featuredArticles = featuredArticleSlugs
  .map((slug) => HELPFUL_ARTICLES.find((article) => article.slug === slug))
  .filter(Boolean) as HelpfulArticle[];

const latestArticles = HELPFUL_ARTICLES.filter(
  (article) => !featuredArticleSlugSet.has(article.slug)
)
  .slice()
  .sort((a, b) =>
    (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt)
  )
  .slice(0, 3);

const categories: HelpfulCategory[] = HELPFUL_NAV_ITEMS.map((item) => ({
  title: item.label,
  description: item.description ?? "",
  href: item.href,
  icon: getCategoryIcon(item.slug),
}));

const surfaceCardCls = clsx(
  "group relative rounded-(--radius-card) border border-br-light bg-white",
  "p-6 shadow-sm transition-all duration-300",
  "hover:-translate-y-1 hover:border-br-default hover:shadow-md"
);

const sectionHeaderLinkCls = clsx(
  "hidden md:inline-flex items-center gap-2 rounded-full px-1",
  "text-sm font-medium text-accent transition-colors hover:text-accent-hover"
);

function articleHref(article: HelpfulArticle) {
  return `/polezno/${article.section}/${article.slug}`;
}

function articleTypeLabel(article: HelpfulArticle) {
  return article.section === "rakovodstva" ? "Ръководство" : "Статия";
}

function getCategoryIcon(slug: string) {
  switch (slug) {
    case "statii":
      return <FaFileAlt className="h-5 w-5" />;
    case "faq":
      return <FaQuestionCircle className="h-5 w-5" />;
    case "rechnik":
      return <FaMapMarkedAlt className="h-5 w-5" />;
    case "resursi":
      return <FaBuilding className="h-5 w-5" />;
    case "rakovodstva":
      return <FaRulerCombined className="h-5 w-5" />;
    default:
      return <FaFileAlt className="h-5 w-5" />;
  }
}

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="typo-h3">{title}</h2>
        {description ? <p className="typo-meta mt-2 max-w-2xl">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function ArticleBadge({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex rounded-full border border-br-accent-soft bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </div>
  );
}

function ArrowLabel({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={clsx(
        "mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors",
        accent
          ? "text-accent group-hover:text-accent-hover"
          : "text-tx-primary group-hover:text-accent"
      )}
    >
      {children}
      <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </div>
  );
}

function ArticleCard({
  article,
  featured = false,
}: {
  article: HelpfulArticle;
  featured?: boolean;
}) {
  return (
    <Link href={articleHref(article)} className={surfaceCardCls}>
      <ArticleBadge>{articleTypeLabel(article)}</ArticleBadge>

      <h3
        className={clsx(
          "leading-tight tracking-normal transition-colors",
          featured
            ? "text-[1.375rem] font-semibold text-tx-primary"
            : "text-xl font-semibold text-tx-primary",
          "group-hover:text-accent"
        )}
      >
        {article.title}
      </h3>

      <p className="typo-meta mt-3 leading-7">{article.excerpt}</p>

      <ArrowLabel>Прочети повече</ArrowLabel>
    </Link>
  );
}

function CategoryCard({ item }: { item: HelpfulCategory }) {
  return (
    <Link href={item.href} className={surfaceCardCls}>
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-bg-section text-accent transition-colors duration-300 group-hover:bg-accent/12">
        {item.icon}
      </div>

      <h3 className="text-lg font-semibold text-tx-primary transition-colors group-hover:text-accent">
        {item.title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-tx-secondary">{item.description}</p>

      <ArrowLabel accent>Разгледай</ArrowLabel>
    </Link>
  );
}

export function HelpfulHubSection() {
  return (
    <>
      <PoleznoPlainHero
        id="polezno"
        title="Полезни материали, въпроси и насоки"
        description="Практична информация за геодезия, кадастър, трасиране и устройствени процедури. Кратко, ясно и без излишна терминология."
      />

      <Section tone="page" className="!pt-10 sm:!pt-12 lg:!pt-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} featured />
          ))}
        </div>

        <div className="mt-16 lg:mt-20">
          <SectionHeader
            title="Категории"
            description="Изберете раздел според въпроса, който имате в момента."
          />

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((item) => (
              <CategoryCard key={item.href} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <SectionHeader
            title="Още полезни теми"
            description="Кратки ръководства и практически обяснения за реални имотни и строителни казуси."
            action={
              <Link href="/polezno/statii" className={sectionHeaderLinkCls}>
                Виж статиите
                <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            }
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
