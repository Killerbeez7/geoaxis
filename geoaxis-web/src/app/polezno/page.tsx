import Link from "next/link";
import clsx from "clsx";
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
import { Badge, Heading, Text } from "@/components/ui/Text";

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
        title="Полезни материали за имоти и геодезия"
        description="Статии, ръководства и справки за кадастър, ПУП, строителство и документи – за да знаете какво предстои, преди да започнете."
        aside={<ArticleCard article={featured} kicker="Започнете оттук" aligned={false} titleAs="p" />}
      />

      <Section aria-labelledby="topics-title">
        <h2 id="topics-title" className="sr-only">
          Теми
        </h2>
        {/* Five topics: three across, then two wider cards, so no row is left half-empty */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {HELPFUL_NAV_ITEMS.map((item, index) => (
            <li
              key={item.slug}
              className={clsx(
                index < 3 ? "lg:col-span-2" : "lg:col-span-3",
                index === HELPFUL_NAV_ITEMS.length - 1 && index % 2 === 0 && "sm:col-span-2 lg:col-span-3"
              )}
            >
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-br-light bg-bg-page p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <IconBadge icon={TOPIC_ICONS[item.slug]} size="lg" />
                  <Badge tone="neutral">{TOPIC_COUNTS[item.slug]}</Badge>
                </div>
                <Heading as="h3" size="h4" className="mt-5">
                  {item.label}
                </Heading>
                <Text className="mt-2 max-w-md">{item.description}</Text>
                <span className="typo-small mt-auto inline-flex items-center gap-1.5 pt-6 font-semibold text-accent-text">
                  Отворете
                  <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="subtle" aria-labelledby="latest-title">
        <SectionHeader
          id="latest-title"
          eyebrow="Статии и ръководства"
          title="Последно обновени"
        />
        <div className="mt-12 grid gap-x-6 gap-y-8 md:grid-cols-3">
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
