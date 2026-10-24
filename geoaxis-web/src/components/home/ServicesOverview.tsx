import { services } from "@/config/content/services";
import { serviceCategories } from "@/config/services/categories";
import { ServiceTile } from "@/components/home/ServiceTile";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ServicesOverview() {
  return (
    <Section id="uslugi" aria-labelledby="services-title">
      <SectionHeader
        id="services-title"
        eyebrow={services.eyebrow}
        title={services.title}
        description={services.description}
        action={
          <div className="hidden md:block">
            <Button href="/uslugi" variant="outline" arrow>
              Всички услуги
            </Button>
          </div>
        }
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 md:gap-6 xl:grid-cols-3">
        {serviceCategories.map((category) => (
          <ServiceTile key={category.slug} category={category} />
        ))}
      </div>
      {/* On phones the link to all services comes after the cards */}
      <Button href="/uslugi" variant="outline" arrow className="mt-8 w-full md:hidden">
        Всички услуги
      </Button>
    </Section>
  );
}
