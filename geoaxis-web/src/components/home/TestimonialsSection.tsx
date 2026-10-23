import { FaStar } from "react-icons/fa";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TestimonialsContent } from "@/config/content/testimonials";

export function TestimonialsSection({ id, kicker, title, subtitle, items }: TestimonialsContent) {
  const approved = items.filter((item) => item.consentConfirmed);
  if (!approved.length) return null;

  return (
    <Section id={id} tone="page">
      <SectionHeader eyebrow={kicker} title={title} description={subtitle} className="mb-12" />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {approved.map((item) => (
          <figure
            key={`${item.name}-${item.text.slice(0, 20)}`}
            className="rounded-2xl border border-br-light bg-bg-page p-6 shadow-card sm:p-7"
          >
            <div className="mb-4 flex gap-0.5 text-accent" aria-label={`Оценка ${item.rating} от 5`}>
              {Array.from({ length: item.rating }, (_, i) => (
                <FaStar key={i} aria-hidden="true" className="h-3.5 w-3.5" />
              ))}
            </div>

            <blockquote className="mb-6 text-tx-secondary">
              &ldquo;{item.text}&rdquo;
            </blockquote>

            <figcaption>
              <p className="text-base font-semibold text-tx-primary">{item.name}</p>
              <p className="text-sm text-tx-muted">
                {item.role} ·{" "}
                {item.sourceUrl ? (
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                    {item.source}
                  </a>
                ) : (
                  item.source
                )}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
