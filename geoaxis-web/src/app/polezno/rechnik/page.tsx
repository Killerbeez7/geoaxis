import { notFound } from "next/navigation";

import { HELPFUL_GLOSSARY_TERMS } from "@/config/polezno/glossary";
import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

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
        size="compact"
        breadcrumbs={[
          { label: "Полезно", href: "/polezno" },
          { label: pageContent.label, href: pageContent.href },
        ]}
        eyebrow={pageContent.label}
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

      <Section>
        <div className="grid gap-12">
          {groups.map(([letter, terms]) => (
            <section key={letter} id={`bukva-${letter}`} aria-labelledby={`bukva-${letter}-title`} className="grid gap-6 md:grid-cols-[5rem_minmax(0,1fr)]">
              <h2 id={`bukva-${letter}-title`} className="typo-h1 text-accent-text md:pt-1">
                {letter}
              </h2>
              <dl className="grid gap-4 md:grid-cols-2">
                {terms.map((term) => (
                  <div key={term.term} id={slugify(term.term)} className="rounded-2xl border border-br-light bg-bg-page p-6 shadow-card">
                    <dt>
                      <span className="typo-label tone-accent">{term.category}</span>
                      <span className="typo-h4 mt-2 block">{term.term}</span>
                    </dt>
                    <dd className="mt-2.5">
                      {term.definition}
                      {term.note ? <span className="typo-small tone-muted mt-2 block">{term.note}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
