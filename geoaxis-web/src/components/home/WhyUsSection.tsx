import Image from "next/image";
import { whyUs } from "@/config/content/why-us";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/Text";

export function WhyUsSection() {
  return (
    <Section tone="inverse" pattern="contours" aria-labelledby="why-us-title">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        {/* Landscape frame; the photo is portrait, so it is cut to the part with the surveyor */}
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl ring-1 ring-white/10">
          <Image
            src={whyUs.image}
            alt={whyUs.imageAlt}
            fill
            sizes="(max-width: 1024px) calc(100vw - 2.5rem), 600px"
            quality={72}
            className="object-cover object-[center_68%]"
          />
        </div>

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
      </div>
    </Section>
  );
}
