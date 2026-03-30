import clsx from "clsx";
import { Section } from "@/components/layout/Section";
import { CategoryCard } from "@/components/parts/CategoryCard";

import type { ServiceCategory } from "@/config/services/categories";

type Props = {
  id: string;
  title: string;
  subtitle: string;
  items: ServiceCategory[];
};

export const ServiceSection = ({ id, title, subtitle, items }: Props) => {
  const displayItems = items.slice(0, 6);

  return (
    <Section id={id} tone="section">
      <header className="mx-auto max-w-3xl text-center">
        <p className="typo-kicker">Услуги</p>

        <h2 className="mt-3 typo-h2">{title}</h2>

        <p className="mx-auto mt-4 max-w-2xl typo-subtitle">{subtitle}</p>
      </header>

      <div
        className={clsx(
          "mt-12 md:mt-14",
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
