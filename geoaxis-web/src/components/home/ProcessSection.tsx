import { workflow } from "@/config/content/workflow";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Heading, Text } from "@/components/ui/Text";

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

      {/* A timeline: down the page on phones and tablets, across it on desktop. No cards. */}
      <ol className="mx-auto mt-12 grid max-w-xl lg:mt-14 lg:max-w-none lg:grid-cols-4 lg:gap-8">
        {workflow.steps.map((step, index) => {
          const last = index === workflow.steps.length - 1;
          return (
            <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:gap-0 lg:pb-0">
              {!last ? (
                <>
                  <span aria-hidden="true" className="absolute bottom-0 left-6 top-14 w-px bg-br-default lg:hidden" />
                  <span aria-hidden="true" className="absolute -right-6 left-16 top-6 hidden h-px bg-br-default lg:block" />
                </>
              ) : null}
              <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-bg-page font-semibold text-accent-text tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 pt-2.5 lg:pt-6">
                <Heading as="h3" size="h4">
                  {step.title}
                </Heading>
                <Text size="small" className="mt-2.5 max-w-sm">
                  {step.description}
                </Text>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 flex justify-center">
        <Button href="/contacts" size="lg" arrow track="quote_click">
          Започнете с консултация
        </Button>
      </div>
    </Section>
  );
}
