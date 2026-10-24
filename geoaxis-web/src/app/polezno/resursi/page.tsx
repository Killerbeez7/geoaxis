import { notFound } from "next/navigation";
import { LuExternalLink } from "react-icons/lu";

import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { EXTERNAL_RESOURCES, RESOURCE_CHECKLISTS } from "@/config/polezno/resources";
import { createSeo } from "@/lib/seo-builder";
import { CheckList } from "@/components/ui/CheckList";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pageContent = getHelpfulNavItem("resursi");

export const metadata = pageContent
  ? createSeo({
      title: pageContent.seo.title,
      description: pageContent.seo.description,
      canonical: pageContent.href,
    })
  : {};

export default function ResourcesPage() {
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
      />

      <Section aria-labelledby="checklists-title">
        <SectionHeader
          id="checklists-title"
          eyebrow="Подготовка"
          title="Какво да подготвите"
          description="Кратки списъци, с които стартът на всяка услуга е по-бърз."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {RESOURCE_CHECKLISTS.map((group) => (
            <section key={group.title} className="rounded-2xl border border-br-light bg-bg-page p-6 shadow-card">
              <h3 className="typo-h4">{group.title}</h3>
              <p className="typo-small mt-2">{group.description}</p>
              <CheckList items={group.items} className="typo-small mt-5" />
            </section>
          ))}
        </div>
      </Section>

      <Section tone="subtle" aria-labelledby="links-title">
        <SectionHeader
          id="links-title"
          eyebrow="Официални източници"
          title="Външни справки и полезни сайтове"
          description="Официални и практични ресурси за кадастър, регулация, имотни проверки и строителни процедури."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {EXTERNAL_RESOURCES.map((resource) => (
            <li key={resource.href}>
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-6 rounded-2xl border border-br-light bg-bg-page p-6 transition-colors hover:border-br-accent"
              >
                <span>
                  <span className="typo-h4 block transition-colors group-hover:text-accent-text">
                    {resource.title}
                    <span className="sr-only"> (отваря се в нов прозорец)</span>
                  </span>
                  <span className="typo-small mt-2 block">{resource.description}</span>
                </span>
                <LuExternalLink aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent-text" />
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
