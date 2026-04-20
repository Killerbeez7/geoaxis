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
      <header className="mx-auto max-w-3xl text-center">
        {kicker && <p className="typo-kicker">{kicker}</p>}
        <h2 className="typo-h2 mt-2">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl typo-subtitle">{subtitle}</p>
      </header>

      <div
        className={clsx(
          "mt-10 md:mt-12",
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
