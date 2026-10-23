import Link from "next/link";
import type { IconType } from "react-icons";
import { LuArrowRight, LuBookMarked, LuBookOpen, LuCircleHelp, LuLibrary, LuListChecks } from "react-icons/lu";

import { pageSeo } from "@/config/seo";
import { HELPFUL_ARTICLES, getArticlesBySection } from "@/config/polezno/articles";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { HELPFUL_GLOSSARY_TERMS } from "@/config/polezno/glossary";
import { HELPFUL_NAV_ITEMS, type HelpfulSectionSlug } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { ArticleCard } from "@/components/polezno/ArticleCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = createSeo(pageSeo.polezno);

const FEATURED_ARTICLE_SLUG = "kakvo-e-geodezichesko-zasnemane";

const TOPIC_ICONS: Record<HelpfulSectionSlug, IconType> = {
  statii: LuBookOpen,
  rakovodstva: LuListChecks,
  faq: LuCircleHelp,
  rechnik: LuBookMarked,
  resursi: LuLibrary,
};

const faqCount = HELPFUL_FAQ_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

const TOPIC_COUNTS: Record<HelpfulSectionSlug, string> = {
  statii: `${getArticlesBySection("statii").length} статии`,
  rakovodstva: `${getArticlesBySection("rakovodstva").length} ръководства`,
  faq: `${faqCount} въпроса`,
  rechnik: `${HELPFUL_GLOSSARY_TERMS.length} термина`,
  resursi: "Списъци и връзки",
};

export default function HelpfulPage() {
  const featured = HELPFUL_ARTICLES.find((article) => article.slug === FEATURED_ARTICLE_SLUG) ?? HELPFUL_ARTICLES[0];
  const latest = HELPFUL_ARTICLES.filter((article) => article.slug !== featured.slug)
    .toSorted((a, b) => (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt))
    .slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Полезно", href: "/polezno" }]}
        eyebrow="Полезно"
        title="Полезни материали за имоти и геодезия"
        description="Статии, ръководства и справки за кадастър, ПУП, строителство и документи – за да знаете какво предстои, преди да започнете."
      />

      <Section aria-labelledby="topics-title">
        <h2 id="topics-title" className="sr-only">
          Теми
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HELPFUL_NAV_ITEMS.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-br-light bg-bg-page p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-4">
                  <IconBadge icon={TOPIC_ICONS[item.slug]} size="lg" />
                  <span className="typo-caption rounded-full bg-bg-subtle px-2.5 py-1 font-semibold text-tx-muted">
                    {TOPIC_COUNTS[item.slug]}
                  </span>
                </div>
                <h3 className="typo-h3 mt-5">{item.label}</h3>
                <p className="typo-small mt-2 text-tx-muted">{item.description}</p>
                <span className="typo-small mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-accent-text">
                  Отворете
                  <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="subtle" aria-labelledby="featured-title">
        <SectionHeader id="featured-title" eyebrow="Препоръчано за начало" title="Започнете оттук" />
        <div className="mt-10">
          <ArticleCard article={featured} featured />
        </div>
        <h3 className="typo-h4 mt-14">Последно обновени</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Не намирате отговор на вашия случай?"
        text="Опишете накратко ситуацията – ще ви кажем каква услуга е нужна и какво да подготвите."
      />
    </>
  );
}
