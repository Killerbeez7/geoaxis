import { LuPlus } from "react-icons/lu";
import type { HelpfulFaqItem } from "@/config/polezno/faq";

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

export function FaqAccordion({ items }: { items: readonly HelpfulFaqItem[] }) {
  return (
    <div className="divide-y divide-br-light rounded-2xl border border-br-light bg-bg-page">
      {items.map((item) => (
        <details key={item.question} className="group px-5 sm:px-6">
          <summary className="typo-h5 flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-subtle text-accent-text transition-transform duration-200 group-open:rotate-45"
            >
              <LuPlus className="h-4 w-4" />
            </span>
          </summary>
          <p className="-mt-1 max-w-2xl pb-6 pr-10">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
