import { Section } from "@/components/layout/Section";
import type { ServicesContent } from "@/config/site-content";

import { ServiceCard, MoreCard } from "@/components/parts/ServiceCard";

export const ServiceSection = ({ id, title, subtitle, items }: ServicesContent) => {
  const main = items.slice(0, 7);
  const extra = Math.max(0, items.length - main.length);

  return (
    <Section
      id={id}
      className="relative bg-bg-page py-16 sm:py-20 overflow-hidden"
      containerClassName="container-page"
    >
      <header className="text-center">
        <h2 className="typo-h2">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl typo-subtitle">{subtitle}</p>
      </header>

      <div className="mt-12 grid gap-6 min-[678px]:grid-cols-2 min-[678px]:gap-7 lg:grid-cols-4 lg:gap-8">
        {main.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
        <MoreCard extraCount={extra} />
      </div>
    </Section>
  );
};
