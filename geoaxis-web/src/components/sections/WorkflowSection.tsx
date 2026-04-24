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
  return (
    <Section id={id} tone="muted">
      {/* <div className="mx-auto max-w-3xl text-left md:text-center"> */}
      <div className="mx-auto max-w-full text-left md:text-center">
        {kicker && (
          <p className="typo-kicker inline-block border-b border-accent/40 pb-2 md:px-2">
            {kicker}
          </p>
        )}
        <h2 className="typo-h2 mt-1 md:mt-2">{title}</h2>
        {/* <p className="typo-subtitle mt-2 md:mt-4 max-w-xl mx-0 md:mx-auto whitespace-normal md:whitespace-pre-line"> */}
        <p className="typo-subtitle mt-2 md:mt-4  mx-0 md:mx-auto whitespace-normal md:whitespace-pre-line">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mt-12">
        <StepProgress steps={steps} />
      </div>
    </Section>
  );
};
