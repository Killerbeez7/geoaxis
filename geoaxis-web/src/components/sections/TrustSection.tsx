import clsx from "clsx";
import { Section } from "../layout/Section";
import type { TrustContent } from "@/config/content/trust";

export function TrustSection({ id, kicker, title, subtitle, trustCards }: TrustContent) {
  return (
    <Section id={id} tone="muted">
      {/* Title */}
      {/* <div className="mx-auto mb-12 lg:mb-16 max-w-3xl text-left md:text-center"> */}
      <div className="mx-auto max-w-3xl text-left md:text-center px-4 md:px-0">
        {/* <p className="typo-kicker inline-block border-b border-accent/40 pb-2"> */}
        <p className="typo-kicker inline-block border-b border-accent/40 pb-2 md:px-2">
          {kicker}
        </p>

        {/* <h2 className="typo-h2 mt-3">{title}</h2> */}
        <h2 className="typo-h2 mt-1 md:mt-2">{title}</h2>

        <p className="typo-subtitle mt-2 md:mt-4 max-w-2xl mx-0 md:mx-auto whitespace-normal md:whitespace-pre-line">
          {subtitle}
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 text-balance mt-8 md:mt-12">
        {trustCards.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className={clsx(
              "group flex items-start gap-4 rounded-2xl border border-br-light bg-bg-page p-5",
              "transition-all duration-300 hover:-translate-y-1 hover:border-br-accent hover:shadow-lg no-drag"
            )}
          >
            <div
              className={clsx(
                "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                "bg-accent/10 transition-colors group-hover:bg-accent/20"
              )}
            >
              <Icon className="h-5 w-5 text-accent" />
            </div>

            <div>
              <h3 className="text-[15px] font-semibold tracking-tight text-tx-/90">
                {title}
              </h3>

              <p className="mt-2 text-[13px] leading-relaxed text-tx-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
