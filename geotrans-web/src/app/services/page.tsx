import Link from "next/link";
import clsx from "clsx";

import { serviceCategories } from "@/config/services/categories";
import { CategoryCard } from "@/components/parts/CategoryCard";
import { Section } from "@/components/layout/Section";

export default function ServicesPage() {
  return (
    <main className="bg-bg-page">
      {/* Hero / intro */}
      <Section
        tone="section"
        className={clsx("relative overflow-hidden border-b border-br-light")}
      >
        <div
          className={clsx(
            "pointer-events-none absolute inset-0",
            "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_38%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_32%)]"
          )}
        />

        <div className="container-page relative pt-12 md:pt-16 lg:pt-20">
          <div className="max-w-4xl">
            <h1 className="mt-3 typo-h2 text-tx-primary">
              Геодезически и кадастрални услуги
            </h1>

            <p className="mt-4 max-w-3xl typo-body text-tx-secondary">
              Изберете категория според конкретната нужда - заснемане, трасиране,
              кадастър, проектиране или градоустройство. Всяка услуга е представена с
              кратко описание, за да откриете по-лесно най-подходящата следваща стъпка.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contacts"
                className={clsx(
                  "inline-flex items-center justify-center rounded-xl",
                  "bg-accent px-6 py-3 text-sm font-semibold text-tx-inverse",
                  "transition-all duration-300 hover:translate-y-px hover:opacity-95"
                )}
              >
                Изпратете запитване
              </Link>

              <Link
                href="#categories"
                className={clsx(
                  "inline-flex items-center justify-center rounded-xl border border-br-light",
                  "bg-bg-page/70 px-6 py-3 text-sm font-semibold text-tx-primary",
                  "transition-colors duration-300 hover:border-br-strong hover:bg-bg-surface"
                )}
              >
                Разгледайте категориите
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Categories grid */}
      <section id="categories" className="py-10 md:py-14 lg:py-16">
        <div className="container-page">
          <div className="mb-6 md:mb-8">
            <p className="typo-kicker text-accent">Категории</p>
            <h2 className="mt-2 typo-h3 text-tx-primary">
              Изберете услуга според конкретния случай
            </h2>
            <p className="mt-3 max-w-2xl typo-body text-tx-secondary">
              От начално заснемане и трасиране до кадастрални процедури, проектиране и
              съдействие с документи.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
            {serviceCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Guidance / CTA */}
      <Section className="bg-bg-page pb-16 md:pb-20">
        <div className="container-page">
          <div
            className={clsx(
              "relative overflow-hidden rounded-3xl border border-br-light",
              "bg-bg-section"
            )}
          >
            <div
              className={clsx(
                "pointer-events-none absolute inset-0",
                "bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_28%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)]"
              )}
            />

            <div className="relative p-6 md:p-8 lg:p-10">
              <div className="max-w-3xl">
                <p className="typo-kicker text-accent">Насоки</p>

                <h2 className="mt-3 typo-h3 text-tx-primary">
                  Не сте сигурни коя услуга е подходяща?
                </h2>

                <p className="mt-4 typo-body text-tx-secondary">
                  Изпратете кратко описание на случая и ще получите насоки какви документи
                  са нужни, каква е логичната последователност на работа и коя услуга е
                  най-подходяща за вашата ситуация.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div
                  className={clsx(
                    "rounded-2xl border border-br-light",
                    "bg-bg-page/70 p-5 backdrop-blur-sm"
                  )}
                >
                  <h3 className="text-base font-semibold text-tx-primary md:text-lg">
                    Консултация и оценка
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-tx-secondary">
                    Ще получите яснота какво е необходимо, какви документи липсват и кой е
                    най-логичният ред за действие.
                  </p>
                </div>

                <div
                  className={clsx(
                    "rounded-2xl border border-br-light",
                    "bg-bg-page/70 p-5 backdrop-blur-sm"
                  )}
                >
                  <h3 className="text-base font-semibold text-tx-primary md:text-lg">
                    Документи и процедури
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-tx-secondary">
                    Съдействие при подготовка, подреждане и уточняване на материали за
                    институции, административни процедури и проектантска работа.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contacts"
                  className={clsx(
                    "inline-flex items-center justify-center rounded-xl",
                    "bg-accent px-6 py-3 text-sm font-semibold text-tx-inverse",
                    "transition-all duration-300 hover:translate-y-[-1px] hover:opacity-95"
                  )}
                >
                  Изпратете запитване
                </Link>

                <Link
                  href="/services/konsultacia"
                  className={clsx(
                    "inline-flex items-center justify-center rounded-xl border border-br-light",
                    "bg-transparent px-6 py-3 text-sm font-semibold text-tx-primary",
                    "transition-colors duration-300 hover:border-br-strong hover:bg-bg-surface"
                  )}
                >
                  Вижте консултациите
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
