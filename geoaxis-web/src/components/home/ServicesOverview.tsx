import { services } from "@/config/content/services";
import { serviceCategories } from "@/config/services/categories";
import { ServiceCategoryCard } from "@/components/services/ServiceCategoryCard";
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
          <Button href="/uslugi" variant="outline" arrow>
            Всички услуги
          </Button>
        }
      />
      <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
        {serviceCategories.map((category) => (
          <ServiceCategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </Section>
  );
}
