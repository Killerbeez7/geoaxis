import { notFound } from "next/navigation";

import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqAccordion, faqSchema } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";

const pageContent = getHelpfulNavItem("faq");

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
      <JsonLd data={faqSchema(HELPFUL_FAQ_GROUPS.flatMap((group) => group.items))} />

      <PageHero
        size="compact"
        breadcrumbs={[
          { label: "Полезно", href: "/polezno" },
          { label: pageContent.label, href: pageContent.href },
        ]}
        eyebrow={pageContent.label}
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Теми" className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <Eyebrow rule={false} tone="muted">
              Теми
            </Eyebrow>
            <ul className="mt-3 flex flex-wrap gap-2 lg:grid lg:gap-0.5">
              {HELPFUL_FAQ_GROUPS.map((group) => (
                <li key={group.slug}>
                  <a
                    href={`#${group.slug}`}
                    className="typo-small inline-flex h-9 items-center rounded-full border border-br-default px-3.5 font-medium text-tx-secondary transition-colors hover:border-br-accent hover:text-accent-text lg:flex lg:h-auto lg:rounded-lg lg:border-0 lg:px-2 lg:py-2"
                  >
                    {group.title}
                    <span className="tone-muted ml-2 tabular-nums">{group.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-14">
            {HELPFUL_FAQ_GROUPS.map((group) => (
              <section key={group.slug} id={group.slug} aria-labelledby={`${group.slug}-title`}>
                <Heading id={`${group.slug}-title`} size="h3">
                  {group.title}
                </Heading>
                {group.intro ? <Text className="mt-2 max-w-2xl">{group.intro}</Text> : null}
                <div className="mt-6">
                  <FaqAccordion items={group.items} />
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Не намирате точния отговор?"
        text="Изпратете кратко описание на случая и ще ви насочим към подходящата услуга, документ или следваща стъпка."
      />
    </>
  );
}
