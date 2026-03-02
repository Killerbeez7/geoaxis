import StepProgress from "../parts/StepProgress";
import { Section } from "../layout/Section";
import type { WorkflowContent } from "@/config/site-content";

export const WorkflowSection = ({ id, title, subtitle, steps }: WorkflowContent) => {
  return (
    <Section id={id} className="">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-full w-screen -translate-x-1/2 bg-linear-to-b from-white to-gray-50" />

      <div className="mx-auto ">
        {/* Header */}
        <div className="text-center">
          <h2 className=" typo-h2">{title}</h2>

          <p className=" mt-2 typo-subtitle">{subtitle}</p>
        </div>

        <StepProgress steps={steps} />
      </div>
    </Section>
  );
};
