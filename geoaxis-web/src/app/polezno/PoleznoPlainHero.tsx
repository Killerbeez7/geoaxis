import type { ReactNode } from "react";

import { Section } from "@/components/layout/Section";

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
    <Section id={id} tone="section" variant="compactHero">
      <div className="max-w-3xl">
        {before}
        <p className="typo-kicker text-accent">{eyebrow}</p>
        <h1 className="typo-h2 mt-3">{title}</h1>
        {description ? (
          <p className="typo-subtitle mt-4 max-w-2xl">{description}</p>
        ) : null}
        {after}
      </div>
    </Section>
  );
}
