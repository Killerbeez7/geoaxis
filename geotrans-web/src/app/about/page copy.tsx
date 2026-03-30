import Image from "next/image";
import Link from "next/link";
import {
  FaCheckCircle,
  FaMapMarkedAlt,
  FaUsers,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa";
import { FiArrowUpRight, FiMapPin, FiFileText, FiLayers } from "react-icons/fi";

import { Stats } from "@/components/sections/StatsSection";
import { CtaButton } from "@/components/parts/CtaButton";
import { siteContent } from "@/config/site-content";
import { Section } from "@/components/layout/Section";

const valueIcon = {
  precision: <FaCheckCircle className="h-8 w-8 text-accent" />,
  speed: <FaMapMarkedAlt className="h-8 w-8 text-accent" />,
  partnership: <FaUsers className="h-8 w-8 text-accent" />,
} as const;

const storyCards = [
  {
    icon: <FiMapPin className="h-5 w-5" />,
    label: "Локално покритие",
    text: "София и Софийска област",
  },
  {
    icon: <FiFileText className="h-5 w-5" />,
    label: "Резултат",
    text: "Ясна и подредена документация",
  },
  {
    icon: <FiLayers className="h-5 w-5" />,
    label: "Подход",
    text: "Прецизност, яснота и добра координация",
  },
] as const;

export default function About() {
  const { id, title, hero, story, values, cta } = siteContent.about;

  return (
    <main id={id} className="relative min-h-screen bg-bg-page overflow-x-clip">
      {/* HERO */}
      <Section
        variant="hero"
        className="relative isolate overflow-hidden bg-bg-page pt-[calc(var(--header-h)+2.5rem)] pb-18 sm:pb-22 lg:pb-24"
      >
        {/* background accents */}
        <div className="pointer-events-none absolute inset-0 -z-30">
          <div className="absolute left-[-8%] top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl md:h-96 md:w-96" />
          <div className="absolute right-[-10%] top-[22%] h-72 w-72 rounded-full bg-accent/8 blur-3xl md:h-[28rem] md:w-[28rem]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-14 xl:gap-18">
          {/* copy */}
          <div className="relative z-10 max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-br-light bg-bg-surface px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="typo-kicker text-accent">{hero.kicker ?? "За нас"}</span>
            </div>

            <h1 className="typo-hero mt-6 text-balance text-tx-primary">{title}</h1>

            <p className="typo-lead mt-6 max-w-2xl text-balance text-tx-secondary md:pr-10">
              {hero.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <CtaButton href={cta.buttonHref} size="lg">
                <FaPhone className="mr-2" />
                {cta.buttonLabel}
              </CtaButton>

              <CtaButton href="/services" size="lg" variant="glassAccent">
                Нашите услуги
                <FaArrowRight className="ml-2" />
              </CtaButton>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-tx-secondary md:justify-start">
              <span>Геодезия</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              <span>Кадастър</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              <span>Градоустройство</span>
            </div>
          </div>

          {/* visual side */}
          <div className="relative">
            <div className="relative mx-auto max-w-[40rem]">
              {/* main image card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-br-light bg-bg-surface shadow-2xl">
                <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                  <Image
                    src={hero.imageBg}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1280px) 520px, (min-width: 1024px) 44vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>

              {/* floating card 1 */}
              <div className="absolute -bottom-6 -left-3 w-[15rem] rounded-[1.5rem] border border-br-light bg-bg-surface/95 p-4 shadow-xl backdrop-blur-md sm:left-[-1rem] sm:w-[17rem]">
                <p className="text-[11px] uppercase tracking-[0.18em] text-tx-secondary">
                  Покритие
                </p>
                <p className="mt-2 text-base font-semibold text-tx-primary">
                  София и Софийска област
                </p>
                <p className="mt-2 text-sm leading-relaxed text-tx-secondary">
                  Практичен подход, съобразен с реалните нужди на обекта.
                </p>
              </div>

              {/* floating card 2 */}
              <div className="absolute -right-3 top-6 w-[13rem] rounded-[1.5rem] border border-white/10 bg-bg-nav/92 p-4 text-tx-inverse shadow-xl backdrop-blur-md sm:right-[-1rem] sm:w-[15rem]">
                <p className="text-[11px] uppercase tracking-[0.18em] text-tx-inverse/55">
                  Подход
                </p>
                <p className="mt-2 text-base font-semibold">Точност и яснота</p>
                <p className="mt-2 text-sm leading-relaxed text-tx-inverse/78">
                  Надеждна комуникация и добре структурирани резултати.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* STORY / EDITORIAL SPLIT */}
      <Section className="relative py-18 sm:py-22 lg:py-26">
        <div className="grid gap-10 lg:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-20">
          {/* image stack */}
          <div className="relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-[40rem]">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-[2rem] border border-accent/15 bg-accent/5" />
              <div className="relative overflow-hidden rounded-[2rem] border border-br-light bg-bg-surface shadow-xl">
                <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                  <Image
                    src={story.image.src}
                    alt={story.image.alt}
                    fill
                    sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute bottom-5 right-5 rounded-[1.25rem] border border-white/10 bg-bg-nav/90 px-5 py-4 text-tx-inverse shadow-xl backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.18em] text-tx-inverse/55">
                  Фокус
                </p>
                <p className="mt-2 text-sm font-medium">
                  Прецизни измервания и надеждна основа за следващите стъпки
                </p>
              </div>
            </div>
          </div>

          {/* copy */}
          <div className="order-1 lg:order-2">
            <div className="max-w-2xl">
              <p className="typo-kicker text-accent">Кои сме ние</p>
              <h2 className="typo-h2 mt-3 text-balance">{story.title}</h2>
            </div>

            <div className="mt-7 space-y-5">
              {story.paragraphs.map((p, i) => (
                <p key={i} className="typo-body max-w-2xl">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {storyCards.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-br-light bg-bg-surface p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    {item.icon}
                  </div>

                  <p className="mt-4 text-sm font-semibold text-tx-primary">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-tx-secondary">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/contacts"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent transition hover:gap-3"
              >
                Свържете се за консултация
                <FiArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section className="relative bg-bg-muted py-18 sm:py-22 lg:py-26">
        <div className="mx-auto max-w-3xl text-center">
          <p className="typo-kicker text-accent">Нашият подход</p>
          <h2 className="typo-h2 mt-3 text-balance">{values.title}</h2>
          <p className="typo-lead mt-4 text-tx-secondary">{values.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {values.items.map((item, index) => (
            <div
              key={item.key}
              className={[
                "group relative overflow-hidden rounded-[2rem] border border-br-light bg-bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-7",
                index === 1 ? "xl:translate-y-6" : "",
              ].join(" ")}
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-accent/6 blur-2xl" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  {valueIcon[item.key]}
                </div>

                <h3 className="typo-h3 mt-5">{item.title}</h3>
                <p className="typo-body mt-4">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* STATS */}
      <Stats />

      {/* CTA */}
      <Section className="py-18 sm:py-22 lg:py-26">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-bg-nav text-tx-inverse shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-accent/10" />
          <div className="absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-white/6 blur-3xl" />

          <div className="relative grid gap-8 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1.1fr)_auto] lg:items-end lg:px-12 lg:py-14">
            <div className="max-w-2xl">
              <p className="typo-kicker text-accent">Да започнем</p>
              <h2 className="typo-h2 mt-3 text-balance">{cta.title}</h2>
              <p className="typo-body mt-5 max-w-xl text-tx-inverse/80">{cta.text}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <CtaButton href={cta.buttonHref} size="lg">
                {cta.buttonLabel}
              </CtaButton>

              <CtaButton href="/services" size="lg" variant="glass">
                Виж услугите
              </CtaButton>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
