import clsx from "clsx";
import { Section } from "@/components/layout/Section";
import { CategoryCard } from "@/components/parts/CategoryCard";

import type { ServiceCategory } from "@/config/services/categories";

type Props = {
  id: string;
  kicker?: string;
  title: string;
  subtitle: string;
  items: ServiceCategory[];
};

export const ServiceSection = ({ id, kicker, title, subtitle, items }: Props) => {
  const displayItems = items.slice(0, 6);

  return (
    <Section id={id} tone="page">
      <div className="mx-auto max-w-3xl text-left md:text-center px-4 md:px-0">
        {kicker && (
          <p className="typo-kicker inline-block border-b border-accent/40 pb-2 md:px-2">
            {kicker}
          </p>
        )}
        <h2 className="typo-h2 mt-1 md:mt-2">{title}</h2>
        <p className="typo-subtitle mt-2 md:mt-4 max-w-xl mx-0 md:mx-auto whitespace-normal md:whitespace-pre-line">
          {subtitle}
        </p>
      </div>

      <div
        className={clsx(
          "mt-8 md:mt-12",
          "grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-7"
        )}
      >
        {displayItems.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </Section>
  );
};
