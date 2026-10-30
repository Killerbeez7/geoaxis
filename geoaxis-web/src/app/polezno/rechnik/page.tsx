import { notFound } from "next/navigation";

import { HELPFUL_GLOSSARY_TERMS } from "@/config/polezno/glossary";
import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { PAGE_BACKDROPS } from "@/config/services/backdrops";

const pageContent = getHelpfulNavItem("rechnik");

export const metadata = pageContent
  ? createSeo({
      title: pageContent.seo.title,
      description: pageContent.seo.description,
      canonical: pageContent.href,
    })
  : {};

function slugify(term: string) {
  return `termin-${term.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-|-$/g, "")}`;
}

// Terms grouped by first letter, in Bulgarian alphabetical order.
const groups = Object.entries(
  [...HELPFUL_GLOSSARY_TERMS]
    .sort((a, b) => a.term.localeCompare(b.term, "bg"))
    .reduce<Record<string, typeof HELPFUL_GLOSSARY_TERMS[number][]>>((acc, term) => {
      const letter = term.term[0].toUpperCase();
      (acc[letter] ??= []).push(term);
      return acc;
    }, {})
);

export default function GlossaryPage() {
  if (!pageContent) notFound();

  return (
    <>
      <PageHero
        backdrop={PAGE_BACKDROPS.polezno}
        size="compact"
        breadcrumbs={[
          { label: "Полезно", href: "/polezno" },
          { label: pageContent.label, href: pageContent.href },
        ]}
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      >
        <nav aria-label="Букви" className="mt-8">
          <ul className="flex flex-wrap gap-1.5">
            {groups.map(([letter]) => (
              <li key={letter}>
                <a
                  href={`#bukva-${letter}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-br-default bg-bg-page font-semibold text-tx-primary transition-colors hover:border-accent hover:text-accent-text"
                >
                  {letter}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* A plain definition list: the term on the left, the explanation on the right */}
      <Section>
        <dl className="max-w-5xl border-t border-br-light">
          {groups.flatMap(([letter, terms]) =>
            terms.map((term, index) => (
              <div
                key={term.term}
                id={index === 0 ? `bukva-${letter}` : slugify(term.term)}
                className="grid scroll-mt-28 gap-2 border-b border-br-light py-6 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-10"
              >
                <dt className="typo-h5 text-accent-text">
                  <span id={index === 0 ? slugify(term.term) : undefined}>{term.term}</span>
                </dt>
                <dd>
                  {term.definition}
                  {term.note ? <span className="typo-small tone-muted mt-2 block">{term.note}</span> : null}
                </dd>
              </div>
            ))
          )}
        </dl>
      </Section>

      <CtaBand />
    </>
  );
}
