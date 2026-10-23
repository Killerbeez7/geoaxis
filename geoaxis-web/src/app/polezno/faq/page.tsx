import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { getHelpfulNavItem } from "@/config/polezno/helpful-nav";
import { createSeo } from "@/lib/seo-builder";
import { PoleznoPlainHero } from "../_components/PoleznoPlainHero";
import { PoleznoCta } from "../_components/PoleznoCta";

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
    <div className="bg-bg-page">
      <PoleznoPlainHero
        title={pageContent.heroTitle}
        description={pageContent.heroDescription}
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="mx-auto max-w-full">
          <div className="space-y-14 lg:space-y-16">
            {HELPFUL_FAQ_GROUPS.map((group, groupIndex) => {
              const groupNumber = String(groupIndex + 1).padStart(2, "0");

              return (
                <section
                  key={group.slug}
                  id={group.slug}
                  className="scroll-mt-[calc(var(--header-h)+2rem)]"
                >
                  <div className="border-b border-br-light/60 pt-10 first:border-b first:pt-0">
                    <header className="max-w-3xl">
                      <span className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-accent-text">
                        Раздел {groupNumber}
                      </span>

                      <h2 className="mt-2 text-2xl font-semibold leading-tight text-tx-primary sm:text-[2rem]">
                        {group.title}
                      </h2>

                      {group.intro ? (
                        <p className="mt-4 max-w-3xl text-base leading-7 text-tx-secondary sm:text-[1.02rem] sm:leading-8">
                          {group.intro}
                        </p>
                      ) : null}
                    </header>

                    <div className="mt-8">
                      {group.items.map((item) => {
                        return (
                          <article
                            key={item.question}
                            className="grid gap-4  py-6 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-10"
                          >
                            <h3 className="text-base font-semibold leading-snug text-tx-primary">
                              {item.question}
                            </h3>

                            <p className="text-[15px] leading-8 text-tx-secondary">
                              {item.answer}
                            </p>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* <div className="mt-14 pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold leading-tight text-tx-primary">
                  Не намирате точния отговор?
                </h2>
                <p className="mt-2 text-[15px] leading-7 text-tx-secondary">
                  Изпратете кратко описание на случая и ще Ви насочим към подходящата
                  услуга, документ или следваща стъпка.
                </p>
              </div>

              <Link
                href="/contacts"
                className="inline-flex items-center justify-center rounded-xl border border-br-light bg-bg-page px-5 py-3 text-sm font-medium text-tx-primary transition hover:bg-bg-muted"
              >
                Изпратете запитване
              </Link>
            </div>
          </div> */}
        </div>
      </Section>
      <PoleznoCta />
    </div>
  );
}
