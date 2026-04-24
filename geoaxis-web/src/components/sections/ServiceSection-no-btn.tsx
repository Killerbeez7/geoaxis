import clsx from "clsx";
import { Section } from "@/components/layout/Section";
import { CategoryCard } from "@/components/parts/CategoryCard";

import type { ServiceCategory } from "@/config/services/categories";
import { CtaButton } from "../parts/CtaButton";

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
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          {kicker && (
            <p className="typo-kicker inline-block border-b border-accent/40 pb-2 md:px-2">
              {kicker}
            </p>
          )}

          <h2 className="typo-h2 mt-1 md:mt-2">{title}</h2>

          {/* <p className="typo-subtitle max-w-lg lg:max-w-2xl mt-2 md:mt-4">{subtitle}</p> */}
          <p className="typo-subtitle max-w-2xl lg:max-w-4xl mt-2 md:mt-4">{subtitle}</p>
        </div>

        {/* <CtaButton
          variant="primary"
          href="/uslugi"
          className="self-start w-full md:w-auto md:self-auto"
        >
          <span>Всички услуги</span>
        </CtaButton> */}
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
