import Image from "next/image";
import {
  FaCheckCircle,
  FaMapMarkedAlt,
  FaUsers,
  FaPhone,
  FaArrowRight,
} from "react-icons/fa";
import { FiClock, FiMapPin, FiFileText } from "react-icons/fi";

import { Stats } from "@/components/sections/StatsSection";
import { CtaButton } from "@/components/parts/CtaButton";
import { siteContent } from "@/config/site-content";
import { Section } from "@/components/layout/Section";

const valueIcon = {
  precision: <FaCheckCircle className="h-9 w-9 text-accent" />,
  speed: <FaMapMarkedAlt className="h-9 w-9 text-accent" />,
  partnership: <FaUsers className="h-9 w-9 text-accent" />,
} as const;

const storyHighlights = [
  {
    icon: <FiMapPin className="h-5 w-5" />,
    title: "Локален фокус",
    text: "Работим в София и Софийска област с познаване на местния контекст и практиката по обектите.",
  },
  {
    icon: <FiClock className="h-5 w-5" />,
    title: "Ясни срокове",
    text: "Стремим се към бърза комуникация, добра организация и предвидим процес от начало до край.",
  },
  {
    icon: <FiFileText className="h-5 w-5" />,
    title: "Подредена документация",
    text: "Получавате ясно структурирани материали и надеждна база за следващите стъпки по проекта.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Разговор и уточняване",
    text: "Изясняваме целта, обхвата на услугата и какви документи или данни са нужни.",
  },
  {
    step: "02",
    title: "Оглед и измерване",
    text: "Посещаваме обекта и извършваме необходимите геодезически дейности на място.",
  },
  {
    step: "03",
    title: "Обработка и предаване",
    text: "Подготвяме резултатите и необходимата документация в ясен и удобен за работа вид.",
  },
];

export default function About() {
  const { id, title, hero, story, values, cta } = siteContent.about;

  return (
    <main id={id} className="relative min-h-screen bg-bg-page">
      {/* HERO */}
      <Section
        variant="hero"
        className="relative isolate overflow-hidden min-h-[88dvh] md:min-h-dvh lg:min-h-[102dvh]"
      >
        <div className="absolute inset-0 -z-30">
          <Image
            src={hero.imageBg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-20 bg-black/55" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/60 to-black/88 md:bg-linear-to-r md:from-black/78 md:via-black/58 md:to-black/20" />

        <div className="absolute left-1/2 top-[44%] -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl sm:h-96 sm:w-96 md:left-[38%] md:top-1/2 md:h-[30rem] md:w-[30rem]" />

        <div className="relative flex min-h-[inherit] items-center">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12">
            <div className="max-w-3xl text-center md:text-left">
              <span className="typo-kicker inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-tx-inverse/90 backdrop-blur-md md:border-l-2 md:border-accent md:bg-transparent md:px-0 md:py-0 md:pl-4 md:rounded-none">
                За нас
              </span>

              <h1 className="typo-hero mt-5 text-balance text-tx-inverse">{title}</h1>

              <p className="typo-lead mx-auto mt-6 max-w-2xl text-balance text-tx-inverse/88 md:mx-0">
                {hero.intro}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <CtaButton href={cta.buttonHref} size="lg">
                  <FaPhone className="mr-2" />
                  {cta.buttonLabel}
                </CtaButton>

                <CtaButton href="/services" variant="glassAccent" size="lg">
                  Нашите услуги
                  <FaArrowRight className="ml-2" />
                </CtaButton>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-left backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.18em] text-tx-inverse/55">
                    Фокус
                  </p>
                  <p className="mt-2 font-medium text-tx-inverse">
                    Геодезия, кадастър и планиране
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-left backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.18em] text-tx-inverse/55">
                    Регион
                  </p>
                  <p className="mt-2 font-medium text-tx-inverse">
                    София и Софийска област
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-left backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.18em] text-tx-inverse/55">
                    Подход
                  </p>
                  <p className="mt-2 font-medium text-tx-inverse">
                    Точност, яснота и надеждна комуникация
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="ml-auto max-w-md rounded-[2rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.18em] text-tx-inverse/55">
                  Какво стои зад работата ни
                </p>

                <div className="mt-5 space-y-5">
                  {storyHighlights.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-2xl border border-white/8 bg-black/10 p-4"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="font-semibold text-tx-inverse">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-tx-inverse/72">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* STORY */}
      <Section className="bg-bg-page py-14 sm:py-18 lg:py-22">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)] lg:gap-14">
          <div>
            <div className="max-w-2xl">
              <span className="typo-kicker text-accent">Кои сме ние</span>
              <h2 className="typo-h2 mt-3 text-balance">{story.title}</h2>
            </div>

            <div className="mt-6 space-y-5">
              {story.paragraphs.map((p, i) => (
                <p key={i} className="typo-body max-w-2xl">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {storyHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-br-light bg-bg-surface p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-tx-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tx-secondary">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-br-light bg-bg-surface shadow-xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]">
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-br-light bg-bg-muted p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.18em] text-tx-secondary">
                Как работим
              </p>

              <div className="mt-5 space-y-4">
                {processSteps.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 rounded-2xl border border-br-light bg-bg-surface p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 font-semibold text-accent">
                      {item.step}
                    </div>

                    <div>
                      <h3 className="font-semibold text-tx-primary">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-tx-secondary">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section className="bg-bg-muted py-14 sm:py-18 lg:py-22">
        <div className="mx-auto max-w-3xl text-center">
          <span className="typo-kicker text-accent">Нашите принципи</span>
          <h2 className="typo-h2 mt-3 text-balance">{values.title}</h2>
          <p className="typo-lead mt-4 text-tx-secondary">{values.intro}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {values.items.map((item) => (
            <div
              key={item.key}
              className="group relative overflow-hidden rounded-[2rem] border border-br-light bg-bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:p-7"
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-accent/6 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  {valueIcon[item.key]}
                </div>

                <h3 className="typo-h3 mt-5">{item.title}</h3>
                <p className="typo-body mt-4">{item.description}</p>

                <div className="mt-6 h-px w-full bg-br-light" />

                <p className="mt-4 text-sm leading-relaxed text-tx-secondary">
                  Това не е просто обещание, а начинът, по който подхождаме към всеки
                  обект и всяка задача.
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* STATS */}
      <Stats />

      {/* CTA */}
      <Section className="bg-bg-nav py-16 text-tx-inverse sm:py-20 lg:py-24">
        <div className="grid items-center gap-8 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-md sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:p-10">
          <div>
            <span className="typo-kicker text-accent">Следваща стъпка</span>
            <h2 className="typo-h2 mt-3 text-balance">{cta.title}</h2>
            <p className="typo-body mt-5 max-w-2xl text-tx-inverse/82">{cta.text}</p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-black/15 p-5 sm:p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-tx-inverse/55">
              Свържете се с нас
            </p>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-tx-inverse/50">
                  Консултация
                </p>
                <p className="mt-1 text-sm text-tx-inverse/85">
                  За нов обект, услуга или въпрос по документация
                </p>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.16em] text-tx-inverse/50">
                  Реакция
                </p>
                <p className="mt-1 text-sm text-tx-inverse/85">
                  Получавате ясен следващ ход и насока как да продължите
                </p>
              </div>
            </div>

            <div className="mt-6">
              <CtaButton
                href={cta.buttonHref}
                size="lg"
                className="w-full justify-center"
              >
                {cta.buttonLabel}
              </CtaButton>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
