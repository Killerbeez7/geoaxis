import Image from "next/image";
import { whyUs } from "@/config/content/why-us";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { StatGrid } from "@/components/ui/StatGrid";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";

export function WhyUsSection() {
  return (
    <Section
      tone="inverse"
      pattern="contours"
      spacing="none"
      className="pt-16 pb-16 sm:pt-0 md:pb-24"
      aria-labelledby="why-us-title"
    >
      {/* The numbers sit on the edge between the white services and this dark section (one row from
          sm up); on phones they open the section */}
      <StatGrid className="on-light relative z-10 shadow-lift sm:-translate-y-1/2" />

      <div className="mt-12 grid items-center gap-12 sm:mt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Eyebrow>{whyUs.eyebrow}</Eyebrow>
          <Heading id="why-us-title" className="mt-3">
            {whyUs.title}
          </Heading>
          <Text size="lead" className="mt-4">
            {whyUs.lead}
          </Text>
          <CheckList items={whyUs.points} dark className="tone-strong mt-8" />
        </div>

        {/* The photo in its own 4:3 frame, so it is never cropped tall */}
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl ring-1 ring-white/10">
          <Image
            src={whyUs.image}
            alt={whyUs.imageAlt}
            fill
            sizes="(max-width: 1024px) calc(100vw - 2.5rem), 600px"
            quality={72}
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
