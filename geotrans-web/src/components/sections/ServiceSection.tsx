import clsx from "clsx";
import { Section } from "@/components/layout/Section";
import { ServiceCard, MoreCard } from "@/components/parts/ServiceCards";
import type { ServicesContent } from "@/config/site-content";

export const ServiceSection = ({ id, title, subtitle, items }: ServicesContent) => {
  const main = items.slice(0, 7);
  const extra = Math.max(0, items.length - main.length);

  return (
    <Section
      id={id}
      className="relative bg-bg-page py-16 sm:py-20"
      containerClassName="container-page"
    >
      {/* Background Pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage: "url('/patterns/vector.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 38%, transparent 80%)",
          maskImage: "radial-gradient(circle at center, black 38%, transparent 80%)",
        }}
      />

      <header className="text-center">
        <h2 className="typo-h2">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl typo-subtitle">{subtitle}</p>
      </header>

      <div
        className={clsx(
          "mt-12 grid gap-6 lg:gap-7",
          "grid-cols-1",
          "min-[780px]:grid-cols-2",
          "min-[1240px]:grid-cols-3"
        )}
      >
        {main.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
        <MoreCard extraCount={extra} />
      </div>
    </Section>
  );
};
