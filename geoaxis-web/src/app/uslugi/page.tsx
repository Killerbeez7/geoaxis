import { serviceCategories } from "@/config/services/categories";
import { pageSeo } from "@/config/seo";
import { createSeo } from "@/lib/seo-builder";
import { CategoryIndex } from "@/components/services/CategoryIndex";
import { ServiceCategoryCard } from "@/components/services/ServiceCategoryCard";
import { ServiceGuide } from "@/components/services/ServiceGuide";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrustBar } from "@/components/ui/TrustBar";

export const metadata = createSeo(pageSeo.uslugiIndex);

const serviceCount = serviceCategories.reduce((sum, category) => sum + category.services.length, 0);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Услуги", href: "/uslugi" }]}
        title="Геодезически услуги за всеки етап на имота"
        description={`${serviceCount} услуги в шест направления – от заснемане за проект до документи в кадастъра и общината. Изберете категория или ни опишете случая си.`}
        actions={
          <>
            <Button href="/contacts" size="lg" arrow track="quote_click">
              Поискайте оферта
            </Button>
            <Button href="#koya-usluga" size="lg" variant="outline">
              Помощ при избора
            </Button>
          </>
        }
        aside={<CategoryIndex className="hidden lg:block" />}
      />

      <Section aria-labelledby="categories-title">
        <h2 id="categories-title" className="sr-only">
          Категории услуги
        </h2>
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
          {serviceCategories.map((category) => (
            <ServiceCategoryCard key={category.slug} category={category} />
          ))}
        </div>
        <TrustBar className="mt-14" />
      </Section>

      <Section id="koya-usluga" tone="subtle" aria-labelledby="guide-title">
        <SectionHeader
          id="guide-title"
          eyebrow="Помощ при избора"
          title="Не знаете коя услуга ви трябва?"
          description="Изберете ситуацията, която най-добре описва случая ви, и ще видите подходящата услуга и какво да подготвите."
          className="mb-10"
        />
        <ServiceGuide />
      </Section>

      <CtaBand />
    </>
  );
}
