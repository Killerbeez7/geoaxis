import Image from "next/image";
import clsx from "clsx";
import { FaCheckCircle, FaMapMarkedAlt, FaUsers } from "react-icons/fa";
// Components
import { Section } from "@/components/layout/Section";
import { Stats } from "@/components/sections/StatsSection";
// Data
import { siteContent } from "@/config/site-content";
import { pageSeo } from "@/config/seo";
// SEO
import { createSeo } from "@/lib/seo-builder";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata = createSeo(pageSeo.about);

const valueIcon = {
  precision: <FaCheckCircle className="h-10 w-10 text-accent" />,
  speed: <FaMapMarkedAlt className="h-10 w-10 text-accent" />,
  partnership: <FaUsers className="h-10 w-10 text-accent" />,
} as const;

export default function About() {
  const { id, title, hero, story, values } = siteContent.about;

  return (
    <main id={id} className="relative">
      {/* HERO */}
      <Section
        className="relative isolate overflow-hidden min-h-[min(58dvh,26rem)] md:min-h-[min(54dvh,32rem)] lg:min-h-[min(60dvh,34rem)]"
        variant="hero"
      >
        <div className="absolute inset-0 -z-20 bg-[#7e9fb5]">
          <Image
            src={hero.imageBg}
            alt=""
            fill
            priority
            sizes="100vw"
            // className="object-cover object-center scale-80 "
            className={clsx(
              "w-full h-full object-cover",
              "object-cover",
              "object-[78%_65%]",
              "sm:object-[35%_72%]",
              "md:object-[40%_68%]",
              "lg:object-[80%_35%]"
            )}
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute top-1/2 left-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/3 blur-3xl" />

        <div className="h-full container-page flex flex-col items-center justify-center text-center">
          <h1 className="typo-hero text-tx-inverse">{title}</h1>
          <p className="typo-lead mt-4 text-balance text-tx-inverse/87">{hero.intro}</p>
        </div>
      </Section>
      {/* <Section className="relative isolate h-150 overflow-hidden" variant="hero">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${hero.imageBg}')` }}
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute top-1/2 left-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/3 blur-3xl" />

        <div className="h-full container-page flex flex-col items-center justify-center text-center">
          <h1 className="typo-hero text-tx-inverse">{title}</h1>
          <p className="typo-lead mt-4 text-tx-inverse/90 text-balance">{hero.intro}</p>
        </div>
      </Section> */}

      {/* STORY */}
      <Section className="py-20 md:py-28 bg-bg-page">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="typo-h2">{story.title}</h2>

              <div className="mt-4 space-y-6">
                {story.paragraphs.map((p, i) => (
                  <p key={i} className="typo-body">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden">
              <div className="relative aspect-4/3">
                <Image
                  src={story.image.src}
                  alt={story.image.alt}
                  fill
                  sizes="(max-width: 1024px) calc(100vw - 2rem), 560px"
                  quality={74}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section tone="page" className="py-20 md:py-28">
        <div className="container-page">
          <div className="text-center">
            <h2 className="typo-h2">{values.title}</h2>
            {/* <p className="mt-4 typo-lead mx-auto max-w-3xl text-tx-secondary"> */}
            <p className="mt-4 typo-body mx-auto max-w-3xl">{values.intro}</p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {values.items.map((item) => (
              <div
                key={item.key}
                className="group bg-bg-surface p-8 rounded-3xl backdrop-blur-sm shadow-xl border border-br-light text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div className="mx-auto transition-transform duration-300 group-hover:scale-110">
                  {valueIcon[item.key]}
                </div>

                <h3 className="mt-4 typo-h3">{item.title}</h3>
                <p className="mt-4 typo-body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Stats />

      {/* CTA */}
      <FinalCta />
    </main>
  );
}
