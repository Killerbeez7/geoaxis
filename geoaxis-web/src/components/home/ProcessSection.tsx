import { workflow } from "@/config/content/workflow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge, Heading, Text } from "@/components/ui/Text";

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

      <ol className="mt-14 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {workflow.steps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col">
            {index < workflow.steps.length - 1 ? (
              <span aria-hidden="true" className="absolute left-17 -right-4 top-7 hidden h-px bg-br-default lg:block" />
            ) : null}
            <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-bg-page font-semibold text-accent-text shadow-card tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="mt-5 flex-1 rounded-2xl border border-br-light bg-bg-page p-6 shadow-card">
              {step.meta ? <Badge>{step.meta}</Badge> : null}
              <Heading as="h3" size="h4" className="mt-4">
                {step.title}
              </Heading>
              <Text size="small" className="mt-2">
                {step.description}
              </Text>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <Button href="/contacts" size="lg" arrow track="quote_click">
          Започнете с консултация
        </Button>
        <Text size="small" tone="muted">
          Уточняваме какво е нужно и ви изпращаме оферта преди започване на работа.
        </Text>
      </div>
    </Section>
  );
}
