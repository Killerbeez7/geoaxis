import Link from "next/link";

import { Section } from "@/components/layout/Section";
import { HELPFUL_FAQ_GROUPS } from "@/config/polezno/faq";
import { createSeo } from "@/lib/seo-builder";
import { PoleznoPlainHero } from "../_components/PoleznoPlainHero";

export const metadata = createSeo({
  title: "Въпроси и отговори за геодезически услуги",
  description:
    "Често задавани въпроси за геодезическо заснемане, трасиране, кадастър, ПУП, документи и подготовка преди услуга.",
  canonical: "/polezno/faq",
});

export default function FaqPage() {
  return (
    <main className="bg-bg-page">
      <PoleznoPlainHero
        title="Често задавани въпроси"
        description="Отговори на въпросите, които най-често възникват преди заснемане, трасиране, кадастрална услуга или подготовка на документи."
      />

      <Section tone="page" className="pt-10! sm:pt-12! lg:pt-16!">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <p className="text-sm font-semibold text-tx-primary">Теми</p>

              <nav aria-label="FAQ категории" className="mt-4 space-y-1">
                {HELPFUL_FAQ_GROUPS.map((group) => (
                  <a
                    key={group.slug}
                    href={`#${group.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-tx-secondary transition hover:bg-bg-muted hover:text-accent-strong"
                  >
                    {group.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="max-w-4xl space-y-14">
            {HELPFUL_FAQ_GROUPS.map((group) => (
              <section
                key={group.slug}
                id={group.slug}
                className="scroll-mt-[calc(var(--header-h)+2rem)]"
              >
                <header className="max-w-3xl">
                  <h2 className="text-2xl font-semibold leading-tight text-tx-primary">
                    {group.title}
                  </h2>

                  {group.intro ? (
                    <p className="mt-3 text-base leading-7 text-tx-secondary">
                      {group.intro}
                    </p>
                  ) : null}
                </header>

                <div className="mt-6 border-t border-br-light/60">
                  {group.items.map((item) => (
                    <article
                      key={item.question}
                      className="grid gap-3 border-b border-br-light/50 py-6 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] md:gap-8"
                    >
                      <h3 className="text-base font-semibold leading-snug text-tx-primary">
                        {item.question}
                      </h3>

                      <p className="text-[15px] leading-8 text-tx-secondary">
                        {item.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}

            <div className="border-t border-br-light/60 pt-8">
              <Link
                href="/contacts"
                className="inline-flex rounded-xl border border-br-light px-5 py-3 text-sm font-medium text-tx-primary transition hover:bg-bg-muted"
              >
                Не намирате отговор? Изпратете запитване
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
