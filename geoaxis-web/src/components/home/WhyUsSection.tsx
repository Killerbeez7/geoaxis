import Image from "next/image";
import { whyUs } from "@/config/content/why-us";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { StatGrid } from "@/components/ui/StatGrid";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";

export function WhyUsSection() {
  return (
    <Section tone="inverse" pattern aria-labelledby="why-us-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        {/* The photo runs the full height of the text column so both sides end together */}
        <div className="relative h-72 overflow-hidden rounded-3xl ring-1 ring-white/10 sm:h-96 lg:h-auto">
          <Image
            src={whyUs.image}
            alt={whyUs.imageAlt}
            fill
            sizes="(max-width: 1024px) calc(100vw - 2.5rem), 520px"
            quality={72}
            className="object-cover object-[72%_center]"
          />
        </div>

        <div className="lg:py-4">
          <Eyebrow>{whyUs.eyebrow}</Eyebrow>
          <Heading id="why-us-title" className="mt-3">
            {whyUs.title}
          </Heading>
          <Text size="lead" className="mt-4">
            {whyUs.lead}
          </Text>
          <CheckList items={whyUs.points} dark className="tone-strong mt-8" />

          <StatGrid dark className="mt-12" />
        </div>
      </div>
    </Section>
  );
}
