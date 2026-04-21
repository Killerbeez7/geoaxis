import { Section } from "../layout/Section";
import { trust } from "@/config/content/trust";

export function TrustSection() {
  return (
    <Section tone="muted">
      {/* Title */}
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="typo-kicker">{trust.kicker}</p>

        <h2 className="typo-h2 mt-2">{trust.title}</h2>

        <p className="typo-body mt-4">{trust.subtitle}</p>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {trust.trustCards.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="flex items-start gap-4 rounded-2xl border border-br-light bg-bg-page p-5"
          >
            <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <Icon className="h-4 w-4 text-accent" />
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-tx-primary">{title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-tx-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
