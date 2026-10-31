import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

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
          <div className="hidden md:block">
            <Button href="/uslugi" variant="outline" arrow>
              Всички услуги
            </Button>
          </div>
        }
      />
      {/* Phones: one compact row per area (photo, name, tag line), so all six fit in about a screen */}
      <ul className="mt-8 divide-y divide-br-light overflow-hidden rounded-2xl border border-br-light bg-bg-page shadow-card sm:hidden">
        {serviceCategories.map((category) => (
          <li key={category.slug}>
            <Link href={`/uslugi/${category.slug}`} className="group flex items-center gap-4 p-3 pr-4 active:bg-bg-subtle">
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-bg-subtle">
                <Image src={category.thumbnail} alt="" fill sizes="64px" quality={60} className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="typo-h5 block">{category.shortTitle ?? category.title}</span>
                {category.meta ? <span className="typo-small tone-muted mt-0.5 block">{category.meta}</span> : null}
              </span>
              <LuArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-accent-text" />
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 hidden gap-x-6 gap-y-8 sm:grid sm:grid-cols-2 md:mt-12 xl:grid-cols-3">
        {serviceCategories.map((category) => (
          <ServiceCategoryCard key={category.slug} category={category} showServices={false} />
        ))}
      </div>
      {/* On phones the link to all services comes after the cards */}
      <Button href="/uslugi" variant="outline" arrow className="mt-8 w-full md:hidden">
        Всички услуги
      </Button>
    </Section>
  );
}
