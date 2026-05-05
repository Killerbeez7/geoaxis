import type { ReactNode } from "react";

import { CtaButton } from "@/components/parts/CtaButton";
import { Section } from "@/components/layout/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import type { Service, ServiceCategory } from "@/config/services/categories";
import { servicesVisuals } from "@/config/services/visuals";
import { ServiceSubnav, ServicesHero } from "./_components/ServicesUi";

const SHOW_SERVICE_MENU = false;

type Props = {
  category: ServiceCategory;
  service?: Service;
  children: ReactNode;
};

export function ServicePageLayout({ category, service, children }: Props) {
  const title = service?.title ?? category.title;
  const rawDescription = service
    ? service.description
    : (category.longDescription ?? category.description);
  const description = Array.isArray(rawDescription) ? rawDescription[0] : rawDescription;
  const eyebrow = service?.meta ?? category.meta ?? "Услуги";
  const categoryVisual =
    servicesVisuals.categoryHeroes[
      category.slug as keyof typeof servicesVisuals.categoryHeroes
    ];

  return (
    <main className="bg-bg-page">
      <ServicesHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={categoryVisual?.image ?? servicesVisuals.heroImage}
        imageAlt={categoryVisual?.alt ?? servicesVisuals.heroAlt}
        imagePosition={servicesVisuals.heroPosition}
        tone="light"
      >
        <CtaButton href="/contacts" className="min-h-12 w-full sm:w-auto">
          Изпрати запитване
        </CtaButton>
      </ServicesHero>

      {SHOW_SERVICE_MENU ? (
        <ServiceSubnav category={category} activeServiceSlug={service?.slug} />
      ) : null}

      <Section id="services" tone="page" className="pt-6! sm:pt-8! lg:pt-10!">
        {children}
      </Section>

      <FinalCta />
    </main>
  );
}
