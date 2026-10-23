// Config
import { serviceCategories } from "@/config/services/categories";
import { servicesVisuals } from "@/config/services/visuals";
import { pageSeo } from "@/config/seo";
// Components
import { CtaButton } from "@/components/parts/CtaButton";
import { Section } from "@/components/layout/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { createSeo } from "@/lib/seo-builder";
import { CategoryOverviewCard, ServicesHero } from "./_components/ServicesUi";
import { SectionIntro } from "@/components/layout/SectionIntro";
import { ServiceGuide } from "@/components/sections/ServiceGuide";

export const metadata = createSeo(pageSeo.uslugiIndex);


export default function ServicesPage() {
  return (
    <>
      <ServicesHero
        kicker="Геодезически услуги"
        title="Изберете услуга според вашия случай"
        description={`Структурирахме услугите по категории, за да откриете бързо правилното решение за вашия проект или имот.`}
        image={servicesVisuals.heroImage}
        imageAlt={servicesVisuals.heroAlt}
        imagePosition={servicesVisuals.heroPosition}
        breadcrumbs={[{ label: "Услуги", href: "/uslugi" }]}
      >
        <CtaButton href="#koya-usluga" className="min-h-12 w-full sm:w-auto">
          Коя услуга ми трябва?
        </CtaButton>
        <CtaButton href="/contacts" variant="soft" className="min-h-12 w-full sm:w-auto">
          Изпратете запитване
        </CtaButton>
      </ServicesHero>

      <Section id="categories" tone="page">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            eyebrow="Категории"
            title="Всички услуги на едно място"
            description="Изберете категорията, която най-добре описва вашия казус. Вътре ще намерите конкретните услуги, необходими документи и последователност на работа."
          />
        </div>

        <div className="mt-8 grid gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
          {serviceCategories.map((category) => (
            <CategoryOverviewCard key={category.slug} category={category} />
          ))}
        </div>
      </Section>

      <Section id="koya-usluga" tone="muted">
        <SectionIntro
          eyebrow="Бърза ориентация"
          title="Не знаете коя услуга ви трябва?"
          description="Изберете ситуацията, която най-добре описва вашия случай, и ще видите подходящата услуга и какво да подготвите."
        />

        <div className="mt-8 md:mt-10">
          <ServiceGuide />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
