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
                "relative rounded-card bg-bg-page",
                "border border-br-light shadow-sm",
                "px-5 py-4"
              )}
            >
              {/* node */}
              <div className="absolute left-2.5 top-2.5">
                <div
                  className={clsx(
                    "grid h-9 w-9 place-items-center rounded-full",
                    "border border-br-accent-soft bg-accent/10",
                    "text-[12px] font-semibold text-accent-strong"
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
                  <div className="text-base font-semibold leading-snug text-tx-primary">
                    {step.title}
                  </div>

                  <div className="mt-1.5 text-sm leading-6 text-tx-muted">
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
                    "border border-br-accent-soft bg-accent/10",
                    "shadow-sm",
                    "text-[12px] font-semibold text-accent-strong"
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
                  <div className="text-[15px] font-semibold leading-snug text-tx-primary lg:text-base">
                    {step.title}
                  </div>

                  {/* subtle divider (desktop only) */}
                  <div className="mx-auto mt-3 h-px w-10 bg-br-default/80" />

                  <div
                    className={clsx(
                      "mx-auto mt-3 max-w-[28ch]",
                      "text-sm leading-6 text-tx-muted",
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
