import Image from "next/image";
import { LuMapPin } from "react-icons/lu";

import { about } from "@/config/content/about";
import { pageSeo } from "@/config/seo";
import { createSeo } from "@/lib/seo-builder";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatGrid } from "@/components/ui/StatGrid";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";
import { TrustBar } from "@/components/ui/TrustBar";

export const metadata = createSeo(pageSeo.about);

export default function AboutPage() {
  const { hero, story, values, area } = about;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "За нас", href: "/about" }]}
        title={hero.title}
        description={hero.intro}
        actions={
          <>
            <Button href="/contacts" size="lg" arrow track="quote_click">
              Поискайте оферта
            </Button>
            <Button href="/projects" size="lg" variant="outline">
              Вижте проектите
            </Button>
          </>
        }
        aside={<HeroMedia src={hero.image} alt={hero.imageAlt} />}
      />

      <Section aria-labelledby="story-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
          <div>
            <SectionHeader id="story-title" eyebrow={story.eyebrow} title={story.title} />
            <div className="prose-geo mt-5">
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <StatGrid className="mt-10" />
          </div>

          <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={story.image}
              alt={story.imageAlt}
              fill
              sizes="(max-width: 1024px) calc(100vw - 2.5rem), 480px"
              quality={75}
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section tone="subtle" aria-labelledby="values-title">
        <SectionHeader id="values-title" eyebrow={values.eyebrow} title={values.title} align="center" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {values.items.map((item) => (
            <li key={item.title} className="rounded-2xl border border-br-light bg-bg-page p-6 shadow-card sm:p-7">
              <IconBadge icon={item.icon} size="lg" />
              <Heading as="h3" size="h4" className="mt-5">
                {item.title}
              </Heading>
              <Text className="mt-2">{item.description}</Text>
            </li>
          ))}
        </ul>
        <TrustBar className="mt-12" />
      </Section>

      <Section aria-labelledby="area-title">
        <div className="grid gap-10 rounded-3xl bg-bg-inverse p-8 on-dark pattern-globe sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <Eyebrow>{area.eyebrow}</Eyebrow>
            <Heading id="area-title" className="mt-3">
              {area.title}
            </Heading>
            <Text size="lead" className="mt-4">
              {area.text}
            </Text>
          </div>
          <div>
            <Text size="small" weight="semibold" tone="strong">
              Например:
            </Text>
            <ul className="mt-3 flex flex-wrap gap-2">
              {area.places.map((place) => (
                <li
                  key={place}
                  className="typo-small inline-flex h-9 items-center gap-1.5 rounded-full bg-white/8 px-3.5 font-medium text-tx-inverse ring-1 ring-white/12"
                >
                  <LuMapPin aria-hidden="true" className="h-3.5 w-3.5 text-accent-on-dark" />
                  {place}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
