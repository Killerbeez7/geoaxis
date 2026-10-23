import { FaArrowRight } from "react-icons/fa";
import { CtaButton } from "@/components/parts/CtaButton";

import { Section } from "@/components/layout/Section";

export function PoleznoCta() {
  return (
    <Section tone="section" className="border-t border-br-light/70">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="max-w-2xl">
          <p className="typo-kicker">Следваща стъпка</p>
          <h2 className="mt-3 text-2xl font-semibold leading-tight text-tx-primary sm:text-3xl">
            Не сте сигурни коя услуга е подходяща?
          </h2>
          <p className="mt-4 text-base leading-7 text-tx-secondary">
            Опишете накратко случая. Ще ви насочим какво да подготвите и дали е нужно
            заснемане, трасиране, кадастрална услуга или консултация.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <CtaButton href="/contacts">
            Изпратете запитване
            <FaArrowRight aria-hidden="true" className="h-4 w-4" />
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
