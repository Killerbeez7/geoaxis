import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import { pageSeo } from "@/config/seo";
import { HELPFUL_ARTICLES, getArticlesBySection } from "@/config/polezno/articles";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { HELPFUL_GLOSSARY_TERMS } from "@/config/polezno/glossary";
import { HELPFUL_NAV_ITEMS, type HelpfulSectionSlug } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { ArticleCard } from "@/components/polezno/ArticleCard";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PAGE_BACKDROPS } from "@/config/services/backdrops";

export const metadata = createSeo(pageSeo.polezno);

const faqCount = HELPFUL_FAQ_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

const TOPIC_COUNTS: Record<HelpfulSectionSlug, string> = {
  statii: `${getArticlesBySection("statii").length} статии`,
  rakovodstva: `${getArticlesBySection("rakovodstva").length} ръководства`,
  faq: `${faqCount} въпроса`,
  rechnik: `${HELPFUL_GLOSSARY_TERMS.length} термина`,
  resursi: "Списъци и връзки",
};

export default function HelpfulPage() {
  const latest = HELPFUL_ARTICLES.toSorted((a, b) =>
    (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt)
  ).slice(0, 3);

  return (
    <>
      <PageHero
        backdrop={PAGE_BACKDROPS.polezno}
        breadcrumbs={[{ label: "Полезно", href: "/polezno" }]}
        title="Полезни материали за имоти и геодезия"
        description="Статии, ръководства и справки за кадастър, ПУП, строителство и документи – за да знаете какво предстои, преди да започнете."
      />

      {/* The sections as a plain list (as on the previous site), introduced on the left */}
      <Section aria-labelledby="sections-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
          <SectionHeader
            id="sections-title"
            eyebrow="Разделите"
            title="Какво ще намерите тук"
            description="Материалите са подредени по тип, за да стигнете по-бързо до правилната информация – без да четете всичко подред."
          />
          <ul className="border-t border-br-light">
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
      </Section>

      <Section tone="subtle" aria-labelledby="latest-title">
        <SectionHeader
          id="latest-title"
          eyebrow="Ново"
          title="Последни материали"
          action={
            <Button href="/polezno/statii" variant="outline" arrow>
              Всички статии
            </Button>
          }
          className="mb-10"
        />
        <div className="grid gap-x-6 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
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
