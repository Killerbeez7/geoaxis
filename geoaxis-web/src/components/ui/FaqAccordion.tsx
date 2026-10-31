import clsx from "clsx";
import { LuPlus } from "react-icons/lu";
import type { HelpfulFaqItem } from "@/config/polezno/faq";
import { Button } from "@/components/ui/Button";

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

type Props = {
  items: readonly HelpfulFaqItem[];
  /** "boxed" sits in a white card; "plain" is just divider lines, for tinted sections */
  variant?: "boxed" | "plain";
};

export function FaqAccordion({ items, variant = "boxed" }: Props) {
  const plain = variant === "plain";

  return (
    <div
      className={clsx(
        "divide-y divide-br-light",
        plain ? "border-y border-br-light" : "rounded-2xl border border-br-light bg-bg-page"
      )}
    >
      {items.map((item) => (
        <details key={item.question} className={clsx("group", !plain && "px-5 sm:px-6")}>
          <summary className="typo-h5 flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className={clsx(
                "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-accent-text transition-transform duration-200 group-open:rotate-45",
                plain ? "border border-br-light bg-bg-page" : "bg-bg-subtle"
              )}
            >
              <LuPlus className="h-4 w-4" />
            </span>
          </summary>
          <div className="-mt-1 max-w-2xl pb-6 pr-10">
            <p>{item.answer}</p>
            {item.link ? (
              <Button href={item.link.href} variant="link" arrow className="mt-3">
                {item.link.label}
              </Button>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
