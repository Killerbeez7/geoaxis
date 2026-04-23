import clsx from "clsx";

export interface Step {
  title: string;
  description: string;
  meta?: string;
}

interface StepProgressProps {
  steps: Step[];
  className?: string;
}

export default function StepProgress({ steps, className }: StepProgressProps) {
  return (
    <div className={clsx("mx-auto w-full max-w-6xl", className)}>
      <div className="relative grid gap-5 md:hidden">
        {/* left connector */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[30px] top-3 bottom-3 w-px bg-br-default"
        />

        {steps.map((step, index) => {
          const n = index + 1;

          return (
            <div
              key={index}
              className={clsx(
                "relative rounded-[--radius-card] bg-white",
                "border border-black/10 rounded-3xl",
                "shadow-[0_14px_44px_-42px_rgba(0,0,0,0.22)]",
                "px-5 py-4"
              )}
            >
              {/* node */}
              <div className="absolute left-2.5 top-2.5">
                <div
                  className={clsx(
                    "grid h-9 w-9 place-items-center rounded-full",
                    "bg-white border border-br-default",
                    "text-[12px] font-semibold text-tx-muted"
                  )}
                >
                  {n}
                </div>
              </div>

              <div className="pl-10">
                {/* meta pill */}
                {/* {!!step.meta && (
                  <div
                    className={clsx(
                      "inline-flex items-center rounded-full px-2.5 py-1",
                      "border border-black/10 bg-bg-muted/60",
                      "text-[11px] font-semibold uppercase tracking-[0.18em]",
                      "text-tx-muted/80"
                    )}
                  >
                    {step.meta}
                  </div>
                )} */}

                {!!step.meta && (
                  <div
                    className={clsx(
                      "inline items-center pt-2 pb-1",
                      "text-[10px] font-semibold uppercase tracking-[0.18em]",
                      "text-tx-muted/70 border-b border-br-default"
                    )}
                  >
                    {step.meta}
                  </div>
                )}
                <div className={clsx("mt-2", !step.meta && "mt-1")}>
                  <div className="text-[15px] font-semibold text-tx-primary leading-snug">
                    {step.title}
                  </div>

                  <div className="mt-1.5 text-[13px] leading-relaxed text-tx-secondary/80">
                    {step.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============ DESKTOP (timeline) ============ */}
      <div className="relative hidden md:block">
        {/* timeline line */}
        <div
          aria-hidden
          className="absolute left-[7%] right-[7%] top-[22px] h-px bg-br-default"
        />

        <div className="grid grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step, index) => {
            const n = index + 1;

            return (
              <div key={index} className="relative text-center">
                {/* node */}
                <div className="mx-auto">
                  <div
                    className={clsx(
                      "relative z-10 mx-auto grid h-11 w-11 place-items-center rounded-full",
                      "bg-white border border-br-default",
                      "shadow-[0_12px_32px_-26px_rgba(0,0,0,0.35)]",
                      "text-[12px] font-semibold text-tx-muted"
                    )}
                  >
                    {n}
                  </div>
                </div>

                {/* meta */}
                {!!step.meta && (
                  <div className="mt-3">
                    <span
                      className={clsx(
                        "inline-flex items-center rounded-full px-2.5 py-1",
                        "border border-black/10 bg-bg-muted/60",
                        "text-[11px] font-semibold uppercase tracking-[0.18em]",
                        "text-tx-muted"
                      )}
                    >
                      {step.meta}
                    </span>
                  </div>
                )}

                {/* content */}
                <div className={clsx("mt-3", !step.meta && "mt-4")}>
                  <div className="text-[15px] lg:text-[16px] font-semibold text-tx-primary leading-snug">
                    {step.title}
                  </div>

                  {/* subtle divider (desktop only) */}
                  <div className="mx-auto mt-3 h-px w-10 bg-br-default/80" />

                  <div
                    className={clsx(
                      "mx-auto mt-3 max-w-[28ch]",
                      "text-[13px] lg:text-[14px] leading-relaxed text-tx-secondary/80",
                      "line-clamp-4 lg:line-clamp-5"
                    )}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
