import { FaStar } from "react-icons/fa";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Text } from "@/components/ui/Text";
import type { TestimonialsContent } from "@/config/content/testimonials";

export function TestimonialsSection({ id, kicker, title, subtitle, items }: TestimonialsContent) {
  const approved = items.filter((item) => item.consentConfirmed);
  if (!approved.length) return null;

  return (
    <Section id={id} tone="page">
      <SectionHeader eyebrow={kicker} title={title} description={subtitle} className="mb-12" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {approved.map((item) => (
          <figure
            key={`${item.name}-${item.text.slice(0, 20)}`}
            className="flex flex-col rounded-2xl border border-br-light bg-bg-page p-6 shadow-card sm:p-7"
          >
            <div className="flex gap-0.5 text-accent" aria-label={`Оценка ${item.rating} от 5`}>
              {Array.from({ length: item.rating }, (_, i) => (
                <FaStar key={i} aria-hidden="true" className="h-3.5 w-3.5" />
              ))}
            </div>

            <blockquote className="mt-4 flex-1">
              <Text>„{item.text}“</Text>
            </blockquote>

            <figcaption className="mt-6 border-t border-br-light pt-4">
              <Text weight="semibold" tone="strong">
                {item.name}
              </Text>
              <Text size="small" tone="muted">
                {item.role} ·{" "}
                {item.sourceUrl ? (
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    {item.source}
                  </a>
                ) : (
                  item.source
                )}
              </Text>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
