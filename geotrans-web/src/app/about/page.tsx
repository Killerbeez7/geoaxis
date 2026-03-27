import Image from "next/image";
import { FaCheckCircle, FaMapMarkedAlt, FaUsers } from "react-icons/fa";
import { Stats } from "@/components/sections/StatsSection";
import { CtaButton } from "@/components/parts/CtaButton";
import { siteContent } from "@/config/site-content";
import { Section } from "@/components/layout/Section";

const valueIcon = {
  precision: <FaCheckCircle className="h-10 w-10 text-accent" />,
  speed: <FaMapMarkedAlt className="h-10 w-10 text-accent" />,
  partnership: <FaUsers className="h-10 w-10 text-accent" />,
} as const;

export default function About() {
  const { id, title, hero, story, values, cta } = siteContent.about;

  return (
    <main id={id} className="relative min-h-screen">
      {/* HERO */}
      <Section
        className="relative isolate min-h-[72dvh] sm:min-h-[80dvh] md:min-h-[92dvh] lg:min-h-dvh overflow-hidden"
        variant="hero"
      >
        <div className="absolute inset-0 -z-20">
          <Image
            src={hero.imageBg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/75 via-black/60 to-black/85 md:bg-linear-to-r md:from-black/70 md:via-black/50 md:to-transparent" />

        <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center">
          <div className="h-72 w-72 rounded-full bg-accent/6 blur-3xl sm:h-96 sm:w-96 md:h-128 md:w-lg" />
        </div>

        <div className="container-page relative flex min-h-[inherit] items-center justify-center py-20 text-center md:justify-start md:py-28 md:text-left">
          <div className="mx-auto w-full max-w-3xl md:mx-0 md:max-w-2xl lg:max-w-3xl">
            <h1 className="typo-hero text-tx-inverse text-balance">{title}</h1>

            <p className="typo-lead mt-4 max-w-2xl text-tx-inverse/90 text-balance mx-auto md:mx-0 md:mt-6">
              {hero.intro}
            </p>
          </div>
        </div>
      </Section>

      {/* STORY */}
      <Section className="bg-bg-page py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container-page">
          <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="order-2 lg:order-1">
              <h2 className="typo-h2 text-balance">{story.title}</h2>

              <div className="mt-4 space-y-5 sm:space-y-6">
                {story.paragraphs.map((p, i) => (
                  <p key={i} className="typo-body">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
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
        </div>
      </Section>

      {/* VALUES */}
      <Section className="bg-bg-muted py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="typo-h2 text-balance">{values.title}</h2>
            <p className="typo-lead mt-4 text-tx-secondary">{values.intro}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:mt-14 sm:gap-7 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {values.items.map((item) => (
              <div
                key={item.key}
                className="group rounded-2xl border border-br-light bg-bg-surface p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-3xl sm:p-8"
              >
                <div className="mx-auto flex justify-center transition-transform duration-300 group-hover:scale-110">
                  {valueIcon[item.key]}
                </div>

                <h3 className="typo-h3 mt-4">{item.title}</h3>
                <p className="typo-body mt-4">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Stats />

      {/* CTA */}
      <Section className="bg-bg-nav py-20 text-tx-inverse sm:py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="typo-h2 text-balance">{cta.title}</h2>
          <p className="typo-body mt-5 sm:mt-6">{cta.text}</p>

          <div className="mt-8 sm:mt-10">
            <CtaButton href={cta.buttonHref} size="lg">
              {cta.buttonLabel}
            </CtaButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
