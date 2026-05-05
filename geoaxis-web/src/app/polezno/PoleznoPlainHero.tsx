import type { ReactNode } from "react";

type PoleznoPlainHeroProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
};

export function PoleznoPlainHero({
  id,
  eyebrow = "Полезно",
  title,
  description,
  before,
  after,
}: PoleznoPlainHeroProps) {
  return (
    <section id={id} className="border-b border-br-light bg-bg-section">
      <div className="container-page pt-[calc(var(--header-h)+2.25rem)] pb-10 sm:pt-[calc(var(--header-h)+2.75rem)] sm:pb-12 lg:pt-[calc(var(--header-h)+3rem)] lg:pb-14">
        <div className="max-w-3xl">
          {before}
          <p className="typo-kicker text-accent">{eyebrow}</p>
          <h1 className="typo-h2 mt-3">{title}</h1>
          {description ? (
            <p className="typo-subtitle mt-4 max-w-2xl">{description}</p>
          ) : null}
          {after}
        </div>
      </div>
    </section>
  );
}
