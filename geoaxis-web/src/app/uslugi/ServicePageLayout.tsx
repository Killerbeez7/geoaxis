import type { ReactNode } from "react";

import { CtaButton } from "@/components/parts/CtaButton";
import { Section } from "@/components/layout/Section";
// import { FinalCta } from "@/components/sections/FinalCta";
import type { Service, ServiceCategory } from "@/config/services/categories";
import { ServiceSubnav, ServicesHero } from "./_components/ServicesUi";

type Props = {
  category: ServiceCategory;
  service?: Service;
  children: ReactNode;
};

export function ServicePageLayout({ category, service, children }: Props) {
  const isServicePage = Boolean(service);
  const title = service?.title ?? category.title;
  const description = service
    ? service.description
    : (category.longDescription ?? category.description);
  const image =
    service?.heroImage ?? service?.thumbnail ?? category.heroImage ?? category.thumbnail;
  const eyebrow = service?.meta ?? category.meta ?? "Услуги";

  const breadcrumbs = [
    { label: "Начало", href: "/" },
    { label: "Услуги", href: "/uslugi" },
    ...(service
      ? [
          {
            label: category.shortTitle ?? category.title,
            href: `/uslugi/${category.slug}`,
          },
        ]
      : []),
    { label: title },
  ];

  return (
    <main className="bg-bg-page">
      <ServicesHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={image}
        imageAlt={title}
        breadcrumbs={breadcrumbs}
      >
        <CtaButton href="/contacts" className="min-h-12 w-full sm:w-auto">
          Изпрати запитване
        </CtaButton>
        <CtaButton
          href={isServicePage ? `/uslugi/${category.slug}` : "#services"}
          variant="glass"
          className="min-h-12 w-full sm:w-auto"
        >
          {isServicePage ? "Към категорията" : "Виж услугите"}
        </CtaButton>
      </ServicesHero>

      <ServiceSubnav category={category} activeServiceSlug={service?.slug} />

      <Section id="services" tone="page">
        {children}
      </Section>

      {/* <FinalCta /> */}
    </main>
  );
}
