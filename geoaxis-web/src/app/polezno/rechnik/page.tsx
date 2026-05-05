import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { GlossarySectionLayout } from "../_components/GlossarySectionLayout";
import { PoleznoPlainHero } from "../_components/PoleznoPlainHero";

const pageContent = getHelpfulNavItem("rechnik");

export const metadata = pageContent
  ? createSeo({
      title: pageContent.seo.title,
      description: pageContent.seo.description,
      canonical: pageContent.href,
    })
  : {};

export default function RechnikPage() {
  if (!pageContent) notFound();

  return (
    <main className="bg-bg-page">
      <PoleznoPlainHero
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <GlossarySectionLayout />
      </Section>
    </main>
  );
}
