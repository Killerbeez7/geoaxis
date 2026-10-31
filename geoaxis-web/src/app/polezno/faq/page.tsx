import { notFound } from "next/navigation";

import { HELPFUL_FAQ_GROUPS, HOME_FAQ_ITEMS } from "@/config/polezno/faq";
import { serviceCategories } from "@/config/services/categories";
import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { CtaBand } from "@/components/ui/CtaBand";
import { ExpandableFaq } from "@/components/ui/ExpandableFaq";
import { faqSchema } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Text";
import { PAGE_BACKDROPS } from "@/config/services/backdrops";

const pageContent = getHelpfulNavItem("faq");

// Each question is marked up on one page only: the homepage questions on the homepage and each
// service topic on its category page, so this page marks up the rest of the general questions
const categorySlugs = new Set(serviceCategories.map((category) => category.slug));
const markedUpItems = HELPFUL_FAQ_GROUPS.filter((group) => !categorySlugs.has(group.slug))
  .flatMap((group) => group.items)
  .filter((item) => !HOME_FAQ_ITEMS.includes(item));

export const metadata = pageContent
  ? createSeo({
      title: pageContent.seo.title,
      description: pageContent.seo.description,
      canonical: pageContent.href,
    })
  : {};

export default function FaqPage() {
  if (!pageContent) notFound();

  return (
    <>
      <JsonLd data={faqSchema(markedUpItems)} />

      <PageHero
        backdrop={PAGE_BACKDROPS.polezno}
        breadcrumbs={[
          { label: "Полезно", href: "/polezno" },
          { label: pageContent.label, href: pageContent.href },
        ]}
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      />

      <Section>
        {/* Topics as a row of chips; each topic laid out like the homepage FAQ (title left, questions right) */}
        <nav aria-label="Теми">
          <ul className="flex flex-wrap gap-2">
            {HELPFUL_FAQ_GROUPS.map((group) => (
              <li key={group.slug}>
                <a
                  href={`#${group.slug}`}
                  className="typo-small inline-flex h-9 items-center rounded-full border border-br-default px-3.5 font-medium text-tx-secondary transition-colors hover:border-br-accent hover:text-accent-text"
                >
                  {group.title}
                  <span className="tone-muted ml-2 tabular-nums">{group.items.length}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 grid gap-14 md:mt-16 md:gap-20">
          {HELPFUL_FAQ_GROUPS.map((group) => (
            <section
              key={group.slug}
              id={group.slug}
              aria-labelledby={`${group.slug}-title`}
              className="grid scroll-mt-[calc(var(--header-h)+1.5rem)] gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16"
            >
              <div>
                <Heading id={`${group.slug}-title`} size="h3">
                  {group.title}
                </Heading>
                {group.intro ? <Text className="mt-2 max-w-md">{group.intro}</Text> : null}
              </div>
              <ExpandableFaq items={group.items} />
            </section>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Не намирате точния отговор?"
        text="Изпратете кратко описание на случая и ще ви насочим към подходящата услуга, документ или следваща стъпка."
      />
    </>
  );
}
