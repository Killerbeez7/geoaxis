import Image from "next/image";
import { whyUs } from "@/config/content/why-us";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { StatGrid } from "@/components/ui/StatGrid";

export function WhyUsSection() {
  return (
    <Section tone="inverse" pattern aria-labelledby="why-us-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        <div className="relative">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl ring-1 ring-white/10">
            <Image
              src={whyUs.image}
              alt={whyUs.imageAlt}
              fill
              sizes="(max-width: 1024px) calc(100vw - 2.5rem), 520px"
              quality={72}
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="typo-eyebrow text-accent-on-dark">{whyUs.eyebrow}</p>
          <h2 id="why-us-title" className="typo-h2 mt-4">
            {whyUs.title}
          </h2>
          <p className="typo-lead mt-5">{whyUs.lead}</p>
          <CheckList items={whyUs.points} dark className="mt-8 text-tx-inverse" />

          <StatGrid dark className="mt-12" />
        </div>
      </div>
    </Section>
  );
}
