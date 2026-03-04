import StepProgress from "../parts/StepProgress";
import { Section } from "../layout/Section";
import type { WorkflowContent } from "@/config/site-content";

export const WorkflowSection = ({ id, title, subtitle, steps }: WorkflowContent) => {
  return (
    <Section
      id={id}
      className="relative min-h-dvh bg-bg-page py-16 sm:py-20 lg:py-24 overflow-hidden"
      containerClassName="container-page"
    >
      {/* soft background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-linear-to-b from-bg-page via-bg-section/60 to-bg-page"
      />

      {/* subtle pattern overlay (same idea as services/stats) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.14]"
        style={{
          backgroundImage: "url('/patterns/vector.avif')",
          backgroundSize: "125% auto",
          backgroundPosition: "55% center",
          backgroundRepeat: "repeat",
          // fade from inside -> outside (center visible, edges fade)
          maskImage: "radial-gradient(circle at center, black 38%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 38%, transparent 78%)",
        }}
      />

      <header className="mx-auto max-w-3xl text-center">
        <h2 className="typo-h2">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl typo-subtitle">{subtitle}</p>
      </header>

      <div className="mt-10 sm:mt-12 lg:mt-14">
        <StepProgress steps={steps} />
      </div>
    </Section>
  );
};
