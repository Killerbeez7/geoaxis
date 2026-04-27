import clsx from "clsx";
import { Section } from "../layout/Section";
import type { TrustContent } from "@/config/content/trust";

export function TrustSection({ id, kicker, title, subtitle, trustCards }: TrustContent) {
  return (
    <Section id={id} tone="muted">
      {/* Title */}
      <div className="max-w-3xl">
        <p className="typo-kicker inline-block border-b border-accent/40 pb-2 md:px-2">
          {kicker}
        </p>

        <h2 className="typo-h2 mt-1 md:mt-2">{title}</h2>

        <p className="typo-subtitle mt-2 max-w-2xl whitespace-normal md:mt-4 md:whitespace-pre-line">
          {subtitle}
        </p>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-4 text-balance sm:grid-cols-2 md:mt-12 lg:gap-5 xl:grid-cols-4">
        {trustCards.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className={clsx(
              "group flex items-start gap-4 rounded-2xl border border-br-light bg-bg-page p-5",
              "transition-all duration-300 hover:-translate-y-1 hover:border-br-accent hover:shadow-lg no-drag"
              // "group flex min-h-[148px] items-start gap-4 rounded-card border border-br-light bg-bg-page p-5",
              // "no-drag transition-all duration-300 hover:border-br-accent-soft hover:shadow-md"
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
              <h3 className="text-[15px] font-semibold tracking-tight text-tx-primary">
                {title}
              </h3>
              {/* <h3 className="text-base font-semibold tracking-tight text-tx-primary">
                {title}
              </h3> */}

              <p className="mt-2 text-[13px] leading-relaxed text-tx-muted">{text}</p>
              {/* <p className="mt-2 text-sm leading-6 text-tx-muted">{text}</p> */}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
