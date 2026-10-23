import { workflow } from "@/config/content/workflow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ProcessSection() {
  return (
    <Section tone="subtle" aria-labelledby="process-title">
      <SectionHeader
        id="process-title"
        eyebrow={workflow.eyebrow}
        title={workflow.title}
        description={workflow.description}
        align="center"
      />

      <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <span
          aria-hidden="true"
          className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-br-default lg:block"
        />
        {workflow.steps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col items-start lg:items-center lg:text-center">
            <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent bg-bg-page font-semibold text-accent-text shadow-card tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="mt-5 w-full rounded-2xl border border-br-light bg-bg-page p-5 shadow-card lg:min-h-48">
              {step.meta ? (
                <span className="typo-caption inline-flex rounded-full bg-accent-soft px-2.5 py-0.5 font-semibold text-accent-text">
                  {step.meta}
                </span>
              ) : null}
              <h3 className="typo-h4 mt-3">{step.title}</h3>
              <p className="typo-small mt-2 text-tx-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <Button href="/contacts" size="lg" arrow track="quote_click">
          Започнете с консултация
        </Button>
        <p className="typo-small text-tx-muted">Уточняваме какво е нужно и ви изпращаме оферта преди започване на работа.</p>
      </div>
    </Section>
  );
}
