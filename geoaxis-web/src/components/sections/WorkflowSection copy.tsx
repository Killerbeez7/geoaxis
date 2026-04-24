import StepProgress from "@/components/parts/StepProgress";
import { Section } from "@/components/layout/Section";
import type { WorkflowContent } from "@/config/content/workflow";

export const WorkflowSection = ({
  id,
  kicker,
  title,
  subtitle,
  steps,
}: WorkflowContent) => {
  const milestones = [
    "Консултация и уточняване на нужните документи",
    "Измерване на място със съвременна апаратура",
    "Обработка, проверка и подготовка на резултатите",
    "Предаване на материалите и съдействие при следващи стъпки",
  ];

  return (
    <Section id={id} tone="muted">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        {/* LEFT */}
        <div>
          {kicker && (
            <p className="typo-kicker inline-block border-b border-accent/40 pb-2">
              {kicker}
            </p>
          )}

          <h2 className="typo-h2 mt-2 max-w-xl">{title}</h2>

          <p className="typo-subtitle mt-4 max-w-2xl whitespace-normal md:whitespace-pre-line">
            {subtitle}
          </p>

          <p className="typo-body mt-6 max-w-2xl">
            Следваме ясен процес от първоначалния разговор до предаването на готовите
            материали. Така знаете какво предстои, какви документи са нужни и кога може да
            очаквате резултат.
          </p>
        </div>

        {/* RIGHT */}
        <div className="rounded-card border border-br-light bg-white/70 p-6 shadow-sm lg:mt-2">
          <p className="typo-kicker mb-5 text-xs">Ключови етапи</p>

          <ul className="space-y-4">
            {milestones.map((item, index) => (
              <li key={item} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-semibold text-accent-strong">
                  {index + 1}
                </span>

                <p className="text-sm leading-relaxed text-tx-secondary">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};
