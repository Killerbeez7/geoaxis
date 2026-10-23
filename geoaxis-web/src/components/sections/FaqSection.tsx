import Link from "next/link";
import { MdArrowRightAlt } from "react-icons/md";
import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/parts/JsonLd";
import type { HelpfulFaqItem } from "@/config/polezno/faq";

type Props = {
  id?: string;
  kicker?: string;
  title: string;
  items: readonly HelpfulFaqItem[];
  tone?: "page" | "muted";
  withSchema?: boolean;
};

export function faqSchema(items: readonly HelpfulFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function FaqList({ items }: { items: readonly HelpfulFaqItem[] }) {
  return (
    <div className="divide-y divide-br-light border-y border-br-light">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-semibold text-tx-primary [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-br-default text-accent-text transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-5 pr-10 text-[15px] leading-7 text-tx-secondary">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ id, kicker = "Въпроси", title, items, tone = "page", withSchema }: Props) {
  if (!items.length) return null;

  return (
    <Section id={id} tone={tone}>
      {withSchema ? <JsonLd data={faqSchema(items)} /> : null}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-14">
        <div>
          <p className="typo-kicker inline-block border-b border-accent/40 pb-2">{kicker}</p>
          <h2 className="typo-h2 mt-2">{title}</h2>
          <Link
            href="/polezno/faq"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-text"
          >
            Всички въпроси и отговори
            <MdArrowRightAlt aria-hidden="true" className="text-lg" />
          </Link>
        </div>
        <FaqList items={items} />
      </div>
    </Section>
  );
}
