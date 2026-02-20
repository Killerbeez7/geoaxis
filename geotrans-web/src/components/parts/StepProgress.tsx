import clsx from "clsx";

export interface Step {
  title: string;
  description: string;
}

interface StepProgressProps {
  steps: Step[];
}

export default function StepProgress({ steps }: StepProgressProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-10 sm:py-16">
      <div className="relative hidden md:block">
        {/* Background line */}
        <div className="absolute top-6 left-[11%] right-[11%] h-px bg-br-default" />
      </div>

      <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-0">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          return (
            <div
              key={index}
              className="relative flex flex-1 flex-row md:flex-col items-start md:items-center gap-4"
            >
              {/* Circle */}
              <div
                className={clsx(
                  "z-10 flex h-11 w-11 items-center justify-center rounded-full border transition-all",
                  "bg-white border-gray-300 text-tx-muted"
                )}
              >
                <span className="text-sm font-semibold">{stepNumber}</span>
              </div>

              {/* Label */}
              <div
                className={clsx(
                  "md:mt-3 max-w-56 text-left md:text-center",
                  "text-tx-secondary"
                )}
              >
                <div className="text-sm font-semibold leading-snug">{step.title}</div>

                <div className="mt-1 text-xs leading-relaxed opacity-80">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
