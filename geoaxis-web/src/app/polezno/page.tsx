import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import { pageSeo } from "@/config/seo";
import { HELPFUL_ARTICLES, getArticlesBySection } from "@/config/polezno/articles";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { HELPFUL_GLOSSARY_TERMS } from "@/config/polezno/glossary";
import { HELPFUL_NAV_ITEMS, type HelpfulSectionSlug } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { SECTION_LABELS, getArticleHref } from "@/lib/articles";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";

export const metadata = createSeo(pageSeo.polezno);

const FEATURED_ARTICLE_SLUG = "kakvo-e-geodezichesko-zasnemane";

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
    .slice(0, 4);

  return (
    <>
      <PageHero
        size="compact"
        breadcrumbs={[{ label: "Полезно", href: "/polezno" }]}
        title="Полезни материали за имоти и геодезия"
        description="Статии, ръководства и справки за кадастър, ПУП, строителство и документи – за да знаете какво предстои, преди да започнете."
      />

      {/* A plain list of the topics, with a reading suggestion beside it (as on the previous site) */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            <Text className="max-w-xl">
              Материалите са подредени по тип, за да стигнете по-бързо до правилната информация – без да четете всичко
              подред.
            </Text>
            <ul className="mt-8 border-t border-br-light">
              {HELPFUL_NAV_ITEMS.map((item) => (
                <li key={item.slug} className="border-b border-br-light">
                  <Link href={item.href} className="group flex items-center justify-between gap-6 py-6">
                    <span>
                      <span className="typo-h4 block transition-colors group-hover:text-accent-text">{item.label}</span>
                      <span className="typo-small mt-1.5 block">{item.description}</span>
                      <span className="typo-small tone-muted mt-1 block">{TOPIC_COUNTS[item.slug]}</span>
                    </span>
                    <LuArrowRight
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-accent-text transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <aside aria-labelledby="start-here-title">
            <Heading as="h2" size="h5" id="start-here-title">
              Предложение за начало
            </Heading>
            <Link
              href={getArticleHref(featured)}
              className="group mt-4 block rounded-2xl border border-br-light bg-bg-subtle p-5 transition-colors hover:border-br-accent"
            >
              <span className="typo-h4 block">{featured.title}</span>
              <span className="typo-small mt-3 inline-flex items-center gap-1.5 font-semibold text-accent-text">
                Прочетете
                <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <ul className="mt-8 grid gap-6">
              {latest.map((article) => (
                <li key={article.slug}>
                  <Link href={getArticleHref(article)} className="group block">
                    <Eyebrow rule={false}>{SECTION_LABELS[article.section].single}</Eyebrow>
                    <span className="typo-h5 mt-1.5 block transition-colors group-hover:text-accent-text">
                      {article.title}
                    </span>
                    <span className="typo-small mt-1 line-clamp-2 block">{article.excerpt ?? article.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <CtaBand
        title="Не намирате отговор на вашия случай?"
        text="Опишете накратко ситуацията – ще ви кажем каква услуга е нужна и какво да подготвите."
      />
    </>
  );
}
