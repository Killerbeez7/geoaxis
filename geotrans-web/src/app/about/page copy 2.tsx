import Image from "next/image";
import { FaCheckCircle, FaMapMarkedAlt, FaUsers, FaPhone } from "react-icons/fa";
import { Stats } from "@/components/sections/StatsSection";
import { CtaButton } from "@/components/parts/CtaButton";
import { siteContent } from "@/config/site-content";
import { Section } from "@/components/layout/Section";

const valueIcon = {
  precision: <FaCheckCircle className="h-9 w-9 text-accent" />,
  speed: <FaMapMarkedAlt className="h-9 w-9 text-accent" />,
  partnership: <FaUsers className="h-9 w-9 text-accent" />,
} as const;

const processItems = [
  {
    key: "consultation",
    title: "Консултация",
    text: "Изясняваме обхвата, нуждите и следващите стъпки.",
  },
  {
    key: "survey",
    title: "Измерване",
    text: "Работим прецизно на терен според конкретния обект.",
  },
  {
    key: "delivery",
    title: "Предаване",
    text: "Получавате ясни резултати и подредена документация.",
  },
] as const;

export default function About() {
  const { id, title, hero, story, values, cta } = siteContent.about;

  return (
    <main id={id} className="relative min-h-screen bg-bg-page">
      {/* HERO */}
      <Section
        variant="hero"
        className="relative isolate overflow-hidden min-h-[84dvh] md:min-h-[96dvh] lg:min-h-[100dvh]"
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

        <div className="absolute inset-0 -z-20 bg-black/35" />

        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/72 via-black/58 to-black/82 md:bg-linear-to-r md:from-black/74 md:via-black/52 md:to-transparent" />

        <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center">
          <div className="h-72 w-72 rounded-full bg-accent/8 blur-3xl sm:h-96 sm:w-96 md:h-[28rem] md:w-[28rem]" />
        </div>

        <div className="relative flex min-h-[inherit] items-center">
          <div className="max-w-3xl text-center md:text-left">
            <p className="typo-kicker text-accent">{hero.kicker ?? "За нас"}</p>

            <h1 className="typo-hero mt-4 text-balance text-tx-inverse">{title}</h1>

            <p className="typo-lead mt-6 max-w-2xl text-balance text-tx-inverse/88">
              {hero.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <CtaButton href={cta.buttonHref} size="lg">
                <FaPhone className="mr-2" />
                {cta.buttonLabel}
              </CtaButton>

              <CtaButton href="/services" variant="glassAccent" size="lg">
                Нашите услуги
              </CtaButton>
            </div>

            <p className="mt-8 text-sm tracking-wide text-tx-inverse/68">
              Геодезия • Кадастър • Градоустройство • София и Софийска област
            </p>
          </div>
        </div>
      </Section>

      {/* STORY */}
      <Section className="bg-bg-page py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-18">
          <div>
            <p className="typo-kicker text-accent">Кои сме ние</p>
            <h2 className="typo-h2 mt-3 text-balance">{story.title}</h2>

            <div className="mt-6 space-y-5">
              {story.paragraphs.map((p, i) => (
                <p key={i} className="typo-body max-w-2xl">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {processItems.map((item) => (
                <div
                  key={item.key}
                  className="rounded-2xl border border-br-light bg-bg-surface px-4 py-4 shadow-sm"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-tx-secondary">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="relative overflow-hidden rounded-2xl border border-br-light bg-bg-surface shadow-lg sm:rounded-3xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3]">
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section className="bg-bg-muted py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="typo-kicker text-accent">Нашият подход</p>
          <h2 className="typo-h2 mt-3 text-balance">{values.title}</h2>
          <p className="typo-lead mt-4 text-tx-secondary">{values.intro}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {values.items.map((item) => (
            <div
              key={item.key}
              className="group rounded-2xl border border-br-light bg-bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl sm:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                {valueIcon[item.key]}
              </div>

              <h3 className="typo-h3 mt-5">{item.title}</h3>
              <p className="typo-body mt-4">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Stats />

      {/* CTA */}
      <Section className="bg-bg-nav py-18 text-tx-inverse sm:py-22 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="typo-kicker text-accent">Свържете се с нас</p>
          <h2 className="typo-h2 mt-3 text-balance">{cta.title}</h2>
          <p className="typo-body mt-5 mx-auto max-w-2xl text-tx-inverse/82">
            {cta.text}
          </p>

          <div className="mt-8">
            <CtaButton href={cta.buttonHref} size="lg">
              {cta.buttonLabel}
            </CtaButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
