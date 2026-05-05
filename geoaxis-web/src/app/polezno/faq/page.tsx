import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { PoleznoPlainHero } from "../_components/PoleznoPlainHero";

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
    <main className="bg-bg-page">
      <PoleznoPlainHero
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="max-w-5xl">
          {HELPFUL_FAQ_GROUPS.map((group, groupIndex) => {
            const groupNumber = String(groupIndex + 1);

            return (
              <section
                key={group.slug}
                id={group.slug}
                className="scroll-mt-[calc(var(--header-h)+2rem)] border-t border-br-light/60 py-10 first:border-t-0 first:pt-0"
              >
                <header className="grid gap-4 md:grid-cols-[16rem_1fr] md:gap-10">
                  <div>
                    <h2 className="mt-2 text-2xl font-semibold leading-tight text-tx-primary">
                      {groupNumber}. {group.title}
                    </h2>
                  </div>

                  {group.intro ? (
                    <p className="max-w-2xl text-base leading-7 text-tx-secondary">
                      {group.intro}
                    </p>
                  ) : null}
                </header>

                <div className="mt-8 border-t border-br-light/50">
                  {group.items.map((item, itemIndex) => {
                    const itemNumber = `${groupIndex + 1}.${itemIndex + 1}`;

                    return (
                      <article
                        key={item.question}
                        className="grid gap-3 border-b border-br-light/50 py-6 md:grid-cols-[16rem_1fr] md:gap-10"
                      >
                        <h3 className="flex gap-3 text-base font-semibold leading-snug text-tx-primary">
                          <span className="min-w-8 text-xs font-semibold tracking-[0.08em] text-tx-muted">
                            {itemNumber}
                          </span>

                          <span>{item.question}</span>
                        </h3>

                        <p className="max-w-2xl text-[15px] leading-8 text-tx-secondary">
                          {item.answer}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <div className="border-t border-br-light/60 pt-8">
            <Link
              href="/contacts"
              className="inline-flex rounded-xl border border-br-light px-5 py-3 text-sm font-medium text-tx-primary transition hover:bg-bg-muted"
            >
              Не намирате отговор? Изпратете запитване
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
