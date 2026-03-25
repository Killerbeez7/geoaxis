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
    <Section id={id} className="bg-bg-section">
      <header className="text-center">
        <h2 className="typo-h2">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl typo-subtitle">{subtitle}</p>
      </header>

      <div
        className={clsx(
          "mt-12 grid gap-6 md:gap-8",
          "grid-cols-1 min-[840px]:grid-cols-2 min-[1280px]:grid-cols-3"
          //  "mt-12 grid gap-6 sm:gap-7 lg:gap-8 xl:gap-10",
          // "grid-cols-1 gap-0 min-[840px]:grid-cols-2  min-[1280px]:grid-cols-3"
        )}
      >
        {displayItems.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </Section>
  );
};
